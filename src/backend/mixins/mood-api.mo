import MoodLib "../lib/mood";
import MoodTypes "../types/mood";
import CommonTypes "../types/common";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  moodLogs : Map.Map<Principal, List.List<MoodTypes.MoodEntry>>,
) {

  var moodNextId : Nat = 0;

  public shared ({ caller }) func logMood(
    date : Text,
    emoji : Text,
    score : Nat,
    note : ?Text,
  ) : async CommonTypes.Result<MoodTypes.MoodEntry, CommonTypes.AppError> {
    let result = MoodLib.logMood(moodLogs, caller, date, emoji, score, note, moodNextId, Time.now());
    switch (result) {
      case (#ok(_)) { moodNextId += 1 };
      case (#err(_)) {};
    };
    result;
  };

  public shared query ({ caller }) func getMoodEntries(
    fromDate : Text,
    toDate : Text,
  ) : async [MoodTypes.MoodEntry] {
    MoodLib.getMoodEntries(moodLogs, caller, fromDate, toDate);
  };

  public shared ({ caller }) func deleteMoodEntry(entryId : Nat) : async CommonTypes.Result<(), CommonTypes.AppError> {
    MoodLib.deleteMoodEntry(moodLogs, caller, entryId);
  };
};
