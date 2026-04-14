import CommonTypes "../types/common";
import WaterTypes "../types/water";
import Map "mo:core/Map";
import List "mo:core/List";

module {
  public type WaterIntakeEntry = WaterTypes.WaterIntakeEntry;
  public type DailyWaterLog = WaterTypes.DailyWaterLog;
  public type AppError = CommonTypes.AppError;

  let defaultGoalMl : Nat = 2000;

  public func addWaterIntake(
    waterLogs : Map.Map<Principal, List.List<WaterIntakeEntry>>,
    waterGoals : Map.Map<Principal, Nat>,
    userId : Principal,
    date : Text,
    amountMl : Nat,
    nextId : Nat,
    now : Int,
  ) : CommonTypes.Result<WaterIntakeEntry, AppError> {
    if (amountMl == 0) return #err(#invalidInput("amountMl must be greater than 0"));
    let entry : WaterIntakeEntry = {
      id = nextId;
      date;
      amountMl;
      loggedAt = now;
    };
    let userLogs = switch (waterLogs.get(userId)) {
      case (?logs) logs;
      case null {
        let fresh = List.empty<WaterIntakeEntry>();
        waterLogs.add(userId, fresh);
        fresh;
      };
    };
    userLogs.add(entry);
    #ok(entry);
  };

  public func getDailyWaterLog(
    waterLogs : Map.Map<Principal, List.List<WaterIntakeEntry>>,
    waterGoals : Map.Map<Principal, Nat>,
    userId : Principal,
    date : Text,
  ) : DailyWaterLog {
    let goalMl = switch (waterGoals.get(userId)) {
      case (?g) g;
      case null defaultGoalMl;
    };
    let entries = switch (waterLogs.get(userId)) {
      case (?logs) logs.filter(func(e : WaterIntakeEntry) : Bool { e.date == date }).toArray();
      case null [];
    };
    let totalMl = entries.foldLeft(0, func(acc : Nat, e : WaterIntakeEntry) : Nat { acc + e.amountMl });
    { date; totalMl; goalMl; entries };
  };

  public func setWaterGoal(
    waterGoals : Map.Map<Principal, Nat>,
    userId : Principal,
    goalMl : Nat,
  ) : () {
    waterGoals.add(userId, goalMl);
  };

  public func deleteWaterEntry(
    waterLogs : Map.Map<Principal, List.List<WaterIntakeEntry>>,
    userId : Principal,
    entryId : Nat,
  ) : CommonTypes.Result<(), AppError> {
    let userLogs = switch (waterLogs.get(userId)) {
      case (?logs) logs;
      case null return #err(#notFound);
    };
    let sizeBefore = userLogs.size();
    let kept = userLogs.filter(func(e : WaterIntakeEntry) : Bool { e.id != entryId });
    if (kept.size() == sizeBefore) return #err(#notFound);
    userLogs.clear();
    userLogs.append(kept);
    #ok(());
  };
};
