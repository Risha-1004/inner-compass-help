import CommonTypes "../types/common";
import QuizTypes "../types/quiz";
import Map "mo:core/Map";
import List "mo:core/List";

module {
  public type QuizResult = QuizTypes.QuizResult;
  public type AppError = CommonTypes.AppError;

  public func saveQuizResult(
    quizResults : Map.Map<Principal, List.List<QuizResult>>,
    userId : Principal,
    quizId : Text,
    date : Text,
    score : Nat,
    answers : [Text],
    nextId : Nat,
    now : Int,
  ) : CommonTypes.Result<QuizResult, AppError> {
    let result : QuizResult = {
      id = nextId;
      quizId;
      date;
      score;
      answers;
      createdAt = now;
    };
    let userResults = switch (quizResults.get(userId)) {
      case (?list) list;
      case null {
        let fresh = List.empty<QuizResult>();
        quizResults.add(userId, fresh);
        fresh;
      };
    };
    userResults.add(result);
    #ok(result);
  };

  public func getQuizResults(
    quizResults : Map.Map<Principal, List.List<QuizResult>>,
    userId : Principal,
    quizId : ?Text,
  ) : [QuizResult] {
    let userResults = switch (quizResults.get(userId)) {
      case (?list) list;
      case null return [];
    };
    switch (quizId) {
      case (?qid) userResults.filter(func(r : QuizResult) : Bool { r.quizId == qid }).toArray();
      case null userResults.toArray();
    };
  };

  public func deleteQuizResult(
    quizResults : Map.Map<Principal, List.List<QuizResult>>,
    userId : Principal,
    resultId : Nat,
  ) : CommonTypes.Result<(), AppError> {
    let userResults = switch (quizResults.get(userId)) {
      case (?list) list;
      case null return #err(#notFound);
    };
    let sizeBefore = userResults.size();
    let kept = userResults.filter(func(r : QuizResult) : Bool { r.id != resultId });
    if (kept.size() == sizeBefore) return #err(#notFound);
    userResults.clear();
    userResults.append(kept);
    #ok(());
  };
};
