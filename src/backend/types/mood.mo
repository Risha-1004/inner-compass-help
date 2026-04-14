module {
  public type MoodEntry = {
    id : Nat;
    date : Text; // ISO date
    emoji : Text;
    score : Nat; // 1-5
    note : ?Text;
    createdAt : Int;
  };
};
