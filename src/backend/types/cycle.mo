module {
  public type CycleLog = {
    id : Nat;
    startDate : Text; // ISO date
    endDate : ?Text;
    flowIntensity : Text; // "light" | "medium" | "heavy" | "spotting"
    createdAt : Int;
  };

  public type SymptomsLog = {
    id : Nat;
    date : Text; // ISO date
    symptoms : [Text];
    createdAt : Int;
  };
};
