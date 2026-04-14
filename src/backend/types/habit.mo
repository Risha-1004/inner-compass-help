module {
  public type Habit = {
    id : Nat;
    name : Text;
    color : Text;
    icon : Text;
    createdAt : Int;
    isArchived : Bool;
  };

  public type HabitCompletion = {
    habitId : Nat;
    date : Text; // ISO date
    completed : Bool;
  };

  public type HabitStreak = {
    habitId : Nat;
    currentStreak : Nat;
    longestStreak : Nat;
  };
};
