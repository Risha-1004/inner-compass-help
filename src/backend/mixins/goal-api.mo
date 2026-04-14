import GoalLib "../lib/goal";
import GoalTypes "../types/goal";
import CommonTypes "../types/common";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  goals : Map.Map<Principal, List.List<GoalTypes.Goal>>,
) {

  var goalNextId : Nat = 0;

  public shared ({ caller }) func createGoal(
    title : Text,
    description : Text,
    targetDate : ?Text,
  ) : async CommonTypes.Result<GoalTypes.Goal, CommonTypes.AppError> {
    let result = GoalLib.createGoal(goals, caller, title, description, targetDate, goalNextId, Time.now());
    switch (result) {
      case (#ok(_)) { goalNextId += 1 };
      case (#err(_)) {};
    };
    result;
  };

  public shared query ({ caller }) func getGoals(status : ?Text) : async [GoalTypes.Goal] {
    let parsedStatus : ?GoalTypes.GoalStatus = switch (status) {
      case null { null };
      case (?s) {
        if (s == "active") ?#active
        else if (s == "completed") ?#completed
        else if (s == "abandoned") ?#abandoned
        else null;
      };
    };
    GoalLib.getGoals(goals, caller, parsedStatus);
  };

  public shared ({ caller }) func updateGoal(
    goalId : Nat,
    title : ?Text,
    description : ?Text,
    targetDate : ?Text,
    status : ?Text,
    progress : ?Nat,
  ) : async CommonTypes.Result<GoalTypes.Goal, CommonTypes.AppError> {
    let parsedStatus : ?GoalTypes.GoalStatus = switch (status) {
      case null { null };
      case (?s) {
        if (s == "active") ?#active
        else if (s == "completed") ?#completed
        else if (s == "abandoned") ?#abandoned
        else null;
      };
    };
    GoalLib.updateGoal(goals, caller, goalId, title, description, targetDate, parsedStatus, progress, Time.now());
  };

  public shared ({ caller }) func deleteGoal(goalId : Nat) : async CommonTypes.Result<(), CommonTypes.AppError> {
    GoalLib.deleteGoal(goals, caller, goalId);
  };
};
