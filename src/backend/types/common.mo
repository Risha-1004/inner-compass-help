module {
  public type UserId = Principal;
  public type Timestamp = Int; // nanoseconds from Time.now()
  public type DateText = Text; // ISO 8601 date string e.g. "2026-04-14"

  public type Result<T, E> = { #ok : T; #err : E };

  public type AppError = {
    #notFound;
    #unauthorized;
    #alreadyExists;
    #invalidInput : Text;
  };
};
