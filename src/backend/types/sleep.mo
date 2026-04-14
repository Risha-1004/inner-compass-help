module {
  public type SleepLog = {
    id : Nat;
    date : Text; // ISO date
    bedtime : Text; // HH:MM
    wakeTime : Text; // HH:MM
    quality : Nat; // 1-5
    notes : ?Text;
    createdAt : Int;
  };
};
