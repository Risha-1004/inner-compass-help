import CommonTypes "../types/common";
import JournalTypes "../types/journal";
import Map "mo:core/Map";
import List "mo:core/List";

module {
  public type JournalEntry = JournalTypes.JournalEntry;
  public type JournalType = JournalTypes.JournalType;
  public type AppError = CommonTypes.AppError;

  public func createEntry(
    journals : Map.Map<Principal, List.List<JournalEntry>>,
    userId : Principal,
    date : Text,
    title : Text,
    content : Text,
    entryType : JournalType,
    tags : [Text],
    nextId : Nat,
    now : Int,
  ) : CommonTypes.Result<JournalEntry, AppError> {
    if (title.size() == 0) {
      return #err(#invalidInput("title cannot be empty"));
    };
    let entry : JournalEntry = {
      id = nextId;
      date;
      title;
      content;
      entryType;
      tags;
      createdAt = now;
      updatedAt = now;
    };
    let userEntries = switch (journals.get(userId)) {
      case (?entries) { entries };
      case null { List.empty<JournalEntry>() };
    };
    userEntries.add(entry);
    journals.add(userId, userEntries);
    #ok(entry);
  };

  public func getEntries(
    journals : Map.Map<Principal, List.List<JournalEntry>>,
    userId : Principal,
    entryType : ?JournalType,
  ) : [JournalEntry] {
    switch (journals.get(userId)) {
      case null { [] };
      case (?entries) {
        let filtered = switch (entryType) {
          case null { entries.toArray() };
          case (?t) {
            entries.filter(func(e : JournalEntry) : Bool {
              switch (e.entryType, t) {
                case (#regular, #regular) { true };
                case (#gratitude, #gratitude) { true };
                case _ { false };
              };
            }).toArray();
          };
        };
        filtered.sort(func(a : JournalEntry, b : JournalEntry) : { #less; #equal; #greater } {
          if (a.date > b.date) #less
          else if (a.date < b.date) #greater
          else #equal
        });
      };
    };
  };

  public func getEntry(
    journals : Map.Map<Principal, List.List<JournalEntry>>,
    userId : Principal,
    entryId : Nat,
  ) : ?JournalEntry {
    switch (journals.get(userId)) {
      case null { null };
      case (?entries) {
        entries.find(func(e : JournalEntry) : Bool { e.id == entryId });
      };
    };
  };

  public func updateEntry(
    journals : Map.Map<Principal, List.List<JournalEntry>>,
    userId : Principal,
    entryId : Nat,
    title : ?Text,
    content : ?Text,
    tags : ?[Text],
    now : Int,
  ) : CommonTypes.Result<JournalEntry, AppError> {
    switch (journals.get(userId)) {
      case null { #err(#notFound) };
      case (?entries) {
        var found : ?JournalEntry = null;
        entries.mapInPlace(func(e : JournalEntry) : JournalEntry {
          if (e.id == entryId) {
            let updated : JournalEntry = {
              e with
              title = switch (title) { case (?t) t; case null e.title };
              content = switch (content) { case (?c) c; case null e.content };
              tags = switch (tags) { case (?tg) tg; case null e.tags };
              updatedAt = now;
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

  public func deleteEntry(
    journals : Map.Map<Principal, List.List<JournalEntry>>,
    userId : Principal,
    entryId : Nat,
  ) : CommonTypes.Result<(), AppError> {
    switch (journals.get(userId)) {
      case null { #err(#notFound) };
      case (?entries) {
        let sizeBefore = entries.size();
        let filtered = entries.filter(func(e : JournalEntry) : Bool { e.id != entryId });
        if (filtered.size() == sizeBefore) {
          #err(#notFound);
        } else {
          journals.add(userId, filtered);
          #ok(());
        };
      };
    };
  };
};
