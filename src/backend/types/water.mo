module {
  public type WaterIntakeEntry = {
    id : Nat;
    date : Text; // ISO date
    amountMl : Nat;
    loggedAt : Int;
  };

  public type DailyWaterLog = {
    date : Text; // ISO date
    totalMl : Nat;
    goalMl : Nat;
    entries : [WaterIntakeEntry];
  };
};
