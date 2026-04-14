import JournalLib "../lib/journal";
import JournalTypes "../types/journal";
import CommonTypes "../types/common";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  journals : Map.Map<Principal, List.List<JournalTypes.JournalEntry>>,
) {

  var journalNextId : Nat = 0;

  public shared ({ caller }) func createJournalEntry(
    date : Text,
    title : Text,
    content : Text,
    entryType : Text, // "regular" | "gratitude"
    tags : [Text],
  ) : async CommonTypes.Result<JournalTypes.JournalEntry, CommonTypes.AppError> {
    let parsedType : JournalTypes.JournalType = if (entryType == "gratitude") #gratitude else #regular;
    let result = JournalLib.createEntry(journals, caller, date, title, content, parsedType, tags, journalNextId, Time.now());
    switch (result) {
      case (#ok(_)) { journalNextId += 1 };
      case (#err(_)) {};
    };
    result;
  };

  public shared query ({ caller }) func getJournalEntries(
    entryType : ?Text,
  ) : async [JournalTypes.JournalEntry] {
    let parsedType : ?JournalTypes.JournalType = switch (entryType) {
      case null { null };
      case (?t) {
        if (t == "gratitude") ?#gratitude
        else if (t == "regular") ?#regular
        else null;
      };
    };
    JournalLib.getEntries(journals, caller, parsedType);
  };

  public shared query ({ caller }) func getJournalEntry(entryId : Nat) : async ?JournalTypes.JournalEntry {
    JournalLib.getEntry(journals, caller, entryId);
  };

  public shared ({ caller }) func updateJournalEntry(
    entryId : Nat,
    title : ?Text,
    content : ?Text,
    tags : ?[Text],
  ) : async CommonTypes.Result<JournalTypes.JournalEntry, CommonTypes.AppError> {
    JournalLib.updateEntry(journals, caller, entryId, title, content, tags, Time.now());
  };

  public shared ({ caller }) func deleteJournalEntry(entryId : Nat) : async CommonTypes.Result<(), CommonTypes.AppError> {
    JournalLib.deleteEntry(journals, caller, entryId);
  };
};
