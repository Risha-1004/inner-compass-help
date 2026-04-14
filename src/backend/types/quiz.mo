module {
  public type QuizResult = {
    id : Nat;
    quizId : Text;
    date : Text; // ISO date
    score : Nat;
    answers : [Text];
    createdAt : Int;
  };
};
