import HabitLib "../lib/habit";
import HabitTypes "../types/habit";
import CommonTypes "../types/common";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  habits : Map.Map<Principal, List.List<HabitTypes.Habit>>,
  habitCompletions : Map.Map<Principal, List.List<HabitTypes.HabitCompletion>>,
) {

  var habitNextId : Nat = 0;

  public shared ({ caller }) func createHabit(
    name : Text,
    color : Text,
    icon : Text,
  ) : async CommonTypes.Result<HabitTypes.Habit, CommonTypes.AppError> {
    let result = HabitLib.createHabit(habits, caller, name, color, icon, habitNextId, Time.now());
    switch (result) {
      case (#ok(_)) { habitNextId += 1 };
      case (#err(_)) {};
    };
    result;
  };

  public shared query ({ caller }) func getHabits() : async [HabitTypes.Habit] {
    HabitLib.getHabits(habits, caller);
  };

  public shared ({ caller }) func archiveHabit(habitId : Nat) : async CommonTypes.Result<(), CommonTypes.AppError> {
    HabitLib.archiveHabit(habits, caller, habitId);
  };

  public shared ({ caller }) func deleteHabit(habitId : Nat) : async CommonTypes.Result<(), CommonTypes.AppError> {
    HabitLib.deleteHabit(habits, caller, habitId);
  };

  public shared ({ caller }) func setHabitCompletion(
    habitId : Nat,
    date : Text,
    completed : Bool,
  ) : async CommonTypes.Result<HabitTypes.HabitCompletion, CommonTypes.AppError> {
    HabitLib.setCompletion(habitCompletions, caller, habitId, date, completed);
  };

  public shared query ({ caller }) func getHabitCompletions(
    fromDate : Text,
    toDate : Text,
  ) : async [HabitTypes.HabitCompletion] {
    HabitLib.getCompletions(habitCompletions, caller, fromDate, toDate);
  };

  public shared query ({ caller }) func getHabitStreak(habitId : Nat, today : Text) : async HabitTypes.HabitStreak {
    HabitLib.getStreak(habitCompletions, caller, habitId, today);
  };
};
