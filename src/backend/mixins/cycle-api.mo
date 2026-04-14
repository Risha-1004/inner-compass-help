import CycleLib "../lib/cycle";
import CycleTypes "../types/cycle";
import CommonTypes "../types/common";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  cycleLogs : Map.Map<Principal, List.List<CycleTypes.CycleLog>>,
  symptomsLogs : Map.Map<Principal, List.List<CycleTypes.SymptomsLog>>,
) {

  var cycleNextId : Nat = 0;

  public shared ({ caller }) func addCycleLog(
    startDate : Text,
    endDate : ?Text,
    flowIntensity : Text,
  ) : async CommonTypes.Result<CycleTypes.CycleLog, CommonTypes.AppError> {
    let result = CycleLib.addCycleLog(cycleLogs, caller, startDate, endDate, flowIntensity, cycleNextId, Time.now());
    switch (result) {
      case (#ok(_)) { cycleNextId += 1 };
      case (#err(_)) {};
    };
    result;
  };

  public shared ({ caller }) func updateCycleLog(
    logId : Nat,
    endDate : ?Text,
    flowIntensity : ?Text,
  ) : async CommonTypes.Result<CycleTypes.CycleLog, CommonTypes.AppError> {
    CycleLib.updateCycleLog(cycleLogs, caller, logId, endDate, flowIntensity);
  };

  public shared query ({ caller }) func getCycleLogs() : async [CycleTypes.CycleLog] {
    CycleLib.getCycleLogs(cycleLogs, caller);
  };

  public shared ({ caller }) func deleteCycleLog(logId : Nat) : async CommonTypes.Result<(), CommonTypes.AppError> {
    CycleLib.deleteCycleLog(cycleLogs, caller, logId);
  };

  public shared ({ caller }) func addSymptomsLog(
    date : Text,
    symptoms : [Text],
  ) : async CommonTypes.Result<CycleTypes.SymptomsLog, CommonTypes.AppError> {
    let result = CycleLib.addSymptomsLog(symptomsLogs, caller, date, symptoms, cycleNextId, Time.now());
    switch (result) {
      case (#ok(_)) { cycleNextId += 1 };
      case (#err(_)) {};
    };
    result;
  };

  public shared query ({ caller }) func getSymptomsLogs() : async [CycleTypes.SymptomsLog] {
    CycleLib.getSymptomsLogs(symptomsLogs, caller);
  };

  public shared ({ caller }) func deleteSymptomsLog(logId : Nat) : async CommonTypes.Result<(), CommonTypes.AppError> {
    CycleLib.deleteSymptomsLog(symptomsLogs, caller, logId);
  };
};
