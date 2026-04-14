module {
  public type GoalStatus = { #active; #completed; #abandoned };

  public type Goal = {
    id : Nat;
    title : Text;
    description : Text;
    targetDate : ?Text; // ISO date
    status : GoalStatus;
    progress : Nat; // 0-100
    createdAt : Int;
    updatedAt : Int;
  };
};
