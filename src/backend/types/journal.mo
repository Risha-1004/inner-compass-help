module {
  public type JournalType = { #regular; #gratitude };

  public type JournalEntry = {
    id : Nat;
    date : Text; // ISO date
    title : Text;
    content : Text;
    entryType : JournalType;
    tags : [Text];
    createdAt : Int;
    updatedAt : Int;
  };
};
