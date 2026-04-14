import CommonTypes "../types/common";
import SleepTypes "../types/sleep";
import Map "mo:core/Map";
import List "mo:core/List";

module {
  public type SleepLog = SleepTypes.SleepLog;
  public type AppError = CommonTypes.AppError;

  public func logSleep(
    sleepLogs : Map.Map<Principal, List.List<SleepLog>>,
    userId : Principal,
    date : Text,
    bedtime : Text,
    wakeTime : Text,
    quality : Nat,
    notes : ?Text,
    nextId : Nat,
    now : Int,
  ) : CommonTypes.Result<SleepLog, AppError> {
    if (quality < 1 or quality > 5) {
      return #err(#invalidInput("quality must be between 1 and 5"));
    };
    let entry : SleepLog = {
      id = nextId;
      date;
      bedtime;
      wakeTime;
      quality;
      notes;
      createdAt = now;
    };
    let userLogs = switch (sleepLogs.get(userId)) {
      case (?logs) logs;
      case null {
        let fresh = List.empty<SleepLog>();
        sleepLogs.add(userId, fresh);
        fresh;
      };
    };
    userLogs.add(entry);
    #ok(entry);
  };

  public func getSleepLogs(
    sleepLogs : Map.Map<Principal, List.List<SleepLog>>,
    userId : Principal,
    fromDate : Text,
    toDate : Text,
  ) : [SleepLog] {
    let userLogs = switch (sleepLogs.get(userId)) {
      case (?logs) logs;
      case null return [];
    };
    // Filter by date range (empty strings = no filter)
    let filtered = if (fromDate == "" and toDate == "") {
      userLogs.toArray();
    } else {
      userLogs.filter(func(log : SleepLog) : Bool {
        let afterFrom = fromDate == "" or log.date >= fromDate;
        let beforeTo = toDate == "" or log.date <= toDate;
        afterFrom and beforeTo;
      }).toArray();
    };
    // Sort by date descending
    filtered.sort(func(a : SleepLog, b : SleepLog) : { #less; #equal; #greater } {
      if (a.date > b.date) #less
      else if (a.date < b.date) #greater
      else #equal;
    });
  };

  public func updateSleepLog(
    sleepLogs : Map.Map<Principal, List.List<SleepLog>>,
    userId : Principal,
    logId : Nat,
    bedtime : ?Text,
    wakeTime : ?Text,
    quality : ?Nat,
    notes : ?Text,
    now : Int,
  ) : CommonTypes.Result<SleepLog, AppError> {
    switch (quality) {
      case (?q) {
        if (q < 1 or q > 5) return #err(#invalidInput("quality must be between 1 and 5"));
      };
      case null {};
    };
    let userLogs = switch (sleepLogs.get(userId)) {
      case (?logs) logs;
      case null return #err(#notFound);
    };
    var updated : ?SleepLog = null;
    userLogs.mapInPlace(func(log : SleepLog) : SleepLog {
      if (log.id == logId) {
        let newLog : SleepLog = {
          log with
          bedtime = switch (bedtime) { case (?v) v; case null log.bedtime };
          wakeTime = switch (wakeTime) { case (?v) v; case null log.wakeTime };
          quality = switch (quality) { case (?v) v; case null log.quality };
          notes = switch (notes) { case (?v) ?v; case null log.notes };
        };
        updated := ?newLog;
        newLog;
      } else log;
    });
    switch (updated) {
      case (?log) #ok(log);
      case null #err(#notFound);
    };
  };

  public func deleteSleepLog(
    sleepLogs : Map.Map<Principal, List.List<SleepLog>>,
    userId : Principal,
    logId : Nat,
  ) : CommonTypes.Result<(), AppError> {
    let userLogs = switch (sleepLogs.get(userId)) {
      case (?logs) logs;
      case null return #err(#notFound);
    };
    let sizeBefore = userLogs.size();
    let kept = userLogs.filter(func(log : SleepLog) : Bool { log.id != logId });
    if (kept.size() == sizeBefore) return #err(#notFound);
    userLogs.clear();
    userLogs.append(kept);
    #ok(());
  };
};
