import CommonTypes "../types/common";
import MoodTypes "../types/mood";
import Map "mo:core/Map";
import List "mo:core/List";

module {
  public type MoodEntry = MoodTypes.MoodEntry;
  public type AppError = CommonTypes.AppError;

  public func logMood(
    moodLogs : Map.Map<Principal, List.List<MoodEntry>>,
    userId : Principal,
    date : Text,
    emoji : Text,
    score : Nat,
    note : ?Text,
    nextId : Nat,
    now : Int,
  ) : CommonTypes.Result<MoodEntry, AppError> {
    if (score < 1 or score > 5) {
      return #err(#invalidInput("Score must be between 1 and 5"));
    };
    let entry : MoodEntry = {
      id = nextId;
      date;
      emoji;
      score;
      note;
      createdAt = now;
    };
    let userLog = switch (moodLogs.get(userId)) {
      case (?log) { log };
      case null { List.empty<MoodEntry>() };
    };
    userLog.add(entry);
    moodLogs.add(userId, userLog);
    #ok(entry);
  };

  public func getMoodEntries(
    moodLogs : Map.Map<Principal, List.List<MoodEntry>>,
    userId : Principal,
    fromDate : Text,
    toDate : Text,
  ) : [MoodEntry] {
    switch (moodLogs.get(userId)) {
      case null { [] };
      case (?log) {
        let filtered = log.filter(func(e : MoodEntry) : Bool {
          e.date >= fromDate and e.date <= toDate
        });
        let arr = filtered.toArray();
        arr.sort(func(a : MoodEntry, b : MoodEntry) : { #less; #equal; #greater } {
          if (a.date < b.date) #less
          else if (a.date > b.date) #greater
          else #equal
        });
      };
    };
  };

  public func deleteMoodEntry(
    moodLogs : Map.Map<Principal, List.List<MoodEntry>>,
    userId : Principal,
    entryId : Nat,
  ) : CommonTypes.Result<(), AppError> {
    switch (moodLogs.get(userId)) {
      case null { #err(#notFound) };
      case (?log) {
        let sizeBefore = log.size();
        let filtered = log.filter(func(e : MoodEntry) : Bool { e.id != entryId });
        if (filtered.size() == sizeBefore) {
          #err(#notFound);
        } else {
          moodLogs.add(userId, filtered);
          #ok(());
        };
      };
    };
  };
};
