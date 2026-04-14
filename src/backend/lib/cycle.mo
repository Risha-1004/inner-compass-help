import CommonTypes "../types/common";
import CycleTypes "../types/cycle";
import Map "mo:core/Map";
import List "mo:core/List";

module {
  public type CycleLog = CycleTypes.CycleLog;
  public type SymptomsLog = CycleTypes.SymptomsLog;
  public type AppError = CommonTypes.AppError;

  public func addCycleLog(
    cycleLogs : Map.Map<Principal, List.List<CycleLog>>,
    userId : Principal,
    startDate : Text,
    endDate : ?Text,
    flowIntensity : Text,
    nextId : Nat,
    now : Int,
  ) : CommonTypes.Result<CycleLog, AppError> {
    let validIntensities = ["light", "medium", "heavy", "spotting"];
    let isValid = validIntensities.find(func(v : Text) : Bool { v == flowIntensity }) != null;
    if (not isValid) {
      return #err(#invalidInput("flowIntensity must be one of: light, medium, heavy, spotting"));
    };
    let entry : CycleLog = {
      id = nextId;
      startDate;
      endDate;
      flowIntensity;
      createdAt = now;
    };
    let userLogs = switch (cycleLogs.get(userId)) {
      case (?logs) { logs };
      case null { List.empty<CycleLog>() };
    };
    userLogs.add(entry);
    cycleLogs.add(userId, userLogs);
    #ok(entry);
  };

  public func updateCycleLog(
    cycleLogs : Map.Map<Principal, List.List<CycleLog>>,
    userId : Principal,
    logId : Nat,
    endDate : ?Text,
    flowIntensity : ?Text,
  ) : CommonTypes.Result<CycleLog, AppError> {
    switch (cycleLogs.get(userId)) {
      case null { #err(#notFound) };
      case (?logs) {
        var found : ?CycleLog = null;
        logs.mapInPlace(func(e : CycleLog) : CycleLog {
          if (e.id == logId) {
            let updated : CycleLog = {
              e with
              endDate = switch (endDate) { case (?d) ?d; case null e.endDate };
              flowIntensity = switch (flowIntensity) { case (?f) f; case null e.flowIntensity };
            };
            found := ?updated;
            updated;
          } else { e };
        });
        switch (found) {
          case null { #err(#notFound) };
          case (?updated) { #ok(updated) };
        };
      };
    };
  };

  public func getCycleLogs(
    cycleLogs : Map.Map<Principal, List.List<CycleLog>>,
    userId : Principal,
  ) : [CycleLog] {
    switch (cycleLogs.get(userId)) {
      case null { [] };
      case (?logs) {
        let arr = logs.toArray();
        arr.sort(func(a : CycleLog, b : CycleLog) : { #less; #equal; #greater } {
          if (a.startDate > b.startDate) #less
          else if (a.startDate < b.startDate) #greater
          else #equal
        });
      };
    };
  };

  public func deleteCycleLog(
    cycleLogs : Map.Map<Principal, List.List<CycleLog>>,
    userId : Principal,
    logId : Nat,
  ) : CommonTypes.Result<(), AppError> {
    switch (cycleLogs.get(userId)) {
      case null { #err(#notFound) };
      case (?logs) {
        let sizeBefore = logs.size();
        let filtered = logs.filter(func(e : CycleLog) : Bool { e.id != logId });
        if (filtered.size() == sizeBefore) {
          #err(#notFound);
        } else {
          cycleLogs.add(userId, filtered);
          #ok(());
        };
      };
    };
  };

  public func addSymptomsLog(
    symptomsLogs : Map.Map<Principal, List.List<SymptomsLog>>,
    userId : Principal,
    date : Text,
    symptoms : [Text],
    nextId : Nat,
    now : Int,
  ) : CommonTypes.Result<SymptomsLog, AppError> {
    if (symptoms.size() == 0) {
      return #err(#invalidInput("symptoms list cannot be empty"));
    };
    let entry : SymptomsLog = {
      id = nextId;
      date;
      symptoms;
      createdAt = now;
    };
    let userLogs = switch (symptomsLogs.get(userId)) {
      case (?logs) { logs };
      case null { List.empty<SymptomsLog>() };
    };
    userLogs.add(entry);
    symptomsLogs.add(userId, userLogs);
    #ok(entry);
  };

  public func getSymptomsLogs(
    symptomsLogs : Map.Map<Principal, List.List<SymptomsLog>>,
    userId : Principal,
  ) : [SymptomsLog] {
    switch (symptomsLogs.get(userId)) {
      case null { [] };
      case (?logs) {
        let arr = logs.toArray();
        arr.sort(func(a : SymptomsLog, b : SymptomsLog) : { #less; #equal; #greater } {
          if (a.date > b.date) #less
          else if (a.date < b.date) #greater
          else #equal
        });
      };
    };
  };

  public func deleteSymptomsLog(
    symptomsLogs : Map.Map<Principal, List.List<SymptomsLog>>,
    userId : Principal,
    logId : Nat,
  ) : CommonTypes.Result<(), AppError> {
    switch (symptomsLogs.get(userId)) {
      case null { #err(#notFound) };
      case (?logs) {
        let sizeBefore = logs.size();
        let filtered = logs.filter(func(e : SymptomsLog) : Bool { e.id != logId });
        if (filtered.size() == sizeBefore) {
          #err(#notFound);
        } else {
          symptomsLogs.add(userId, filtered);
          #ok(());
        };
      };
    };
  };
};
