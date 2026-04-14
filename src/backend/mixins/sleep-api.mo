import SleepLib "../lib/sleep";
import SleepTypes "../types/sleep";
import CommonTypes "../types/common";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  sleepLogs : Map.Map<Principal, List.List<SleepTypes.SleepLog>>,
) {

  var sleepNextId : Nat = 0;

  public shared ({ caller }) func logSleep(
    date : Text,
    bedtime : Text,
    wakeTime : Text,
    quality : Nat,
    notes : ?Text,
  ) : async CommonTypes.Result<SleepTypes.SleepLog, CommonTypes.AppError> {
    let result = SleepLib.logSleep(sleepLogs, caller, date, bedtime, wakeTime, quality, notes, sleepNextId, Time.now());
    switch (result) {
      case (#ok(_)) { sleepNextId += 1 };
      case (#err(_)) {};
    };
    result;
  };

  public shared query ({ caller }) func getSleepLogs(
    fromDate : Text,
    toDate : Text,
  ) : async [SleepTypes.SleepLog] {
    SleepLib.getSleepLogs(sleepLogs, caller, fromDate, toDate);
  };

  public shared ({ caller }) func updateSleepLog(
    logId : Nat,
    bedtime : ?Text,
    wakeTime : ?Text,
    quality : ?Nat,
    notes : ?Text,
  ) : async CommonTypes.Result<SleepTypes.SleepLog, CommonTypes.AppError> {
    SleepLib.updateSleepLog(sleepLogs, caller, logId, bedtime, wakeTime, quality, notes, Time.now());
  };

  public shared ({ caller }) func deleteSleepLog(logId : Nat) : async CommonTypes.Result<(), CommonTypes.AppError> {
    SleepLib.deleteSleepLog(sleepLogs, caller, logId);
  };
};
