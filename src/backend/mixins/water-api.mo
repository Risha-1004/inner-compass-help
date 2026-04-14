import WaterLib "../lib/water";
import WaterTypes "../types/water";
import CommonTypes "../types/common";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  waterLogs : Map.Map<Principal, List.List<WaterTypes.WaterIntakeEntry>>,
  waterGoals : Map.Map<Principal, Nat>,
) {

  var waterNextId : Nat = 0;

  public shared ({ caller }) func addWaterIntake(
    date : Text,
    amountMl : Nat,
  ) : async CommonTypes.Result<WaterTypes.WaterIntakeEntry, CommonTypes.AppError> {
    let result = WaterLib.addWaterIntake(waterLogs, waterGoals, caller, date, amountMl, waterNextId, Time.now());
    switch (result) {
      case (#ok(_)) { waterNextId += 1 };
      case (#err(_)) {};
    };
    result;
  };

  public shared query ({ caller }) func getDailyWaterLog(date : Text) : async WaterTypes.DailyWaterLog {
    WaterLib.getDailyWaterLog(waterLogs, waterGoals, caller, date);
  };

  public shared ({ caller }) func setWaterGoal(goalMl : Nat) : async () {
    WaterLib.setWaterGoal(waterGoals, caller, goalMl);
  };

  public shared ({ caller }) func deleteWaterEntry(entryId : Nat) : async CommonTypes.Result<(), CommonTypes.AppError> {
    WaterLib.deleteWaterEntry(waterLogs, caller, entryId);
  };
};
