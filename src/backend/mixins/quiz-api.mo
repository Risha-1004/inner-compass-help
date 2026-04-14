import QuizLib "../lib/quiz";
import QuizTypes "../types/quiz";
import CommonTypes "../types/common";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  quizResults : Map.Map<Principal, List.List<QuizTypes.QuizResult>>,
) {

  var quizNextId : Nat = 0;

  public shared ({ caller }) func saveQuizResult(
    quizId : Text,
    date : Text,
    score : Nat,
    answers : [Text],
  ) : async CommonTypes.Result<QuizTypes.QuizResult, CommonTypes.AppError> {
    let result = QuizLib.saveQuizResult(quizResults, caller, quizId, date, score, answers, quizNextId, Time.now());
    switch (result) {
      case (#ok(_)) { quizNextId += 1 };
      case (#err(_)) {};
    };
    result;
  };

  public shared query ({ caller }) func getQuizResults(quizId : ?Text) : async [QuizTypes.QuizResult] {
    QuizLib.getQuizResults(quizResults, caller, quizId);
  };

  public shared ({ caller }) func deleteQuizResult(resultId : Nat) : async CommonTypes.Result<(), CommonTypes.AppError> {
    QuizLib.deleteQuizResult(quizResults, caller, resultId);
  };
};
