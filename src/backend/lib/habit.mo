import CommonTypes "../types/common";
import HabitTypes "../types/habit";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type Habit = HabitTypes.Habit;
  public type HabitCompletion = HabitTypes.HabitCompletion;
  public type HabitStreak = HabitTypes.HabitStreak;
  public type AppError = CommonTypes.AppError;

  public func createHabit(
    habits : Map.Map<Principal, List.List<Habit>>,
    userId : Principal,
    name : Text,
    color : Text,
    icon : Text,
    nextId : Nat,
    now : Int,
  ) : CommonTypes.Result<Habit, AppError> {
    if (name.size() == 0) {
      return #err(#invalidInput("Habit name cannot be empty"));
    };
    let habit : Habit = {
      id = nextId;
      name;
      color;
      icon;
      createdAt = now;
      isArchived = false;
    };
    let userHabits = switch (habits.get(userId)) {
      case (?h) { h };
      case null { List.empty<Habit>() };
    };
    userHabits.add(habit);
    habits.add(userId, userHabits);
    #ok(habit);
  };

  public func getHabits(
    habits : Map.Map<Principal, List.List<Habit>>,
    userId : Principal,
  ) : [Habit] {
    switch (habits.get(userId)) {
      case null { [] };
      case (?userHabits) {
        userHabits.filter(func(h : Habit) : Bool { not h.isArchived }).toArray();
      };
    };
  };

  public func archiveHabit(
    habits : Map.Map<Principal, List.List<Habit>>,
    userId : Principal,
    habitId : Nat,
  ) : CommonTypes.Result<(), AppError> {
    switch (habits.get(userId)) {
      case null { #err(#notFound) };
      case (?userHabits) {
        var found = false;
        userHabits.mapInPlace(func(h : Habit) : Habit {
          if (h.id == habitId) {
            found := true;
            { h with isArchived = true };
          } else { h };
        });
        if (found) { #ok(()) } else { #err(#notFound) };
      };
    };
  };

  public func deleteHabit(
    habits : Map.Map<Principal, List.List<Habit>>,
    userId : Principal,
    habitId : Nat,
  ) : CommonTypes.Result<(), AppError> {
    switch (habits.get(userId)) {
      case null { #err(#notFound) };
      case (?userHabits) {
        let sizeBefore = userHabits.size();
        let filtered = userHabits.filter(func(h : Habit) : Bool { h.id != habitId });
        if (filtered.size() == sizeBefore) {
          #err(#notFound);
        } else {
          habits.add(userId, filtered);
          #ok(());
        };
      };
    };
  };

  public func setCompletion(
    completions : Map.Map<Principal, List.List<HabitCompletion>>,
    userId : Principal,
    habitId : Nat,
    date : Text,
    completed : Bool,
  ) : CommonTypes.Result<HabitCompletion, AppError> {
    let userCompletions = switch (completions.get(userId)) {
      case (?c) { c };
      case null { List.empty<HabitCompletion>() };
    };
    // Update existing or add new
    var found = false;
    userCompletions.mapInPlace(func(c : HabitCompletion) : HabitCompletion {
      if (c.habitId == habitId and c.date == date) {
        found := true;
        { c with completed };
      } else { c };
    });
    if (not found) {
      let entry : HabitCompletion = { habitId; date; completed };
      userCompletions.add(entry);
    };
    completions.add(userId, userCompletions);
    #ok({ habitId; date; completed });
  };

  public func getCompletions(
    completions : Map.Map<Principal, List.List<HabitCompletion>>,
    userId : Principal,
    fromDate : Text,
    toDate : Text,
  ) : [HabitCompletion] {
    switch (completions.get(userId)) {
      case null { [] };
      case (?userCompletions) {
        userCompletions.filter(func(c : HabitCompletion) : Bool {
          c.date >= fromDate and c.date <= toDate
        }).toArray();
      };
    };
  };

  public func getStreak(
    completions : Map.Map<Principal, List.List<HabitCompletion>>,
    userId : Principal,
    habitId : Nat,
    today : Text,
  ) : HabitStreak {
    let allDates : List.List<Text> = switch (completions.get(userId)) {
      case null { List.empty<Text>() };
      case (?userCompletions) {
        userCompletions
          .filter(func(c : HabitCompletion) : Bool { c.habitId == habitId and c.completed })
          .map<HabitCompletion, Text>(func(c) { c.date });
      };
    };

    // Sort dates descending to compute streaks
    let sortedDesc = allDates.sort(func(a : Text, b : Text) : { #less; #equal; #greater } {
      if (a > b) #less else if (a < b) #greater else #equal
    });
    let datesArr = sortedDesc.toArray();

    if (datesArr.size() == 0) {
      return { habitId; currentStreak = 0; longestStreak = 0 };
    };

    // Helper: subtract one day from ISO date (simple approach using text comparison)
    // We compute streaks by checking consecutive days
    // Since dates are ISO strings "YYYY-MM-DD", lexicographic ordering == chronological ordering
    // We'll compute streaks by detecting gaps

    var currentStreak : Nat = 0;
    var longestStreak : Nat = 0;
    var runStreak : Nat = 1;

    // datesArr is sorted descending (most recent first)
    // Current streak: consecutive days back from today
    let firstDate = datesArr[0];
    // If the most recent completion isn't today or yesterday, currentStreak = 0
    // We just count consecutive dates from the front
    var i : Nat = 0;
    var prevDate : Text = "";

    // Compute current streak (from top of sorted list, consecutive days)
    // Since we can't do real date arithmetic easily, we use the sorted array and check adjacency
    // Two dates are consecutive if they differ by exactly 1 day
    // We detect a gap by sorting and checking that adjacent entries in descending order differ by 1 day
    // Simple approach: use text-based day subtraction is complex; instead count run from today backwards
    // We detect consecutive by seeing that the gap in the sorted array == 1 between each pair

    // Count longest streak via runs
    runStreak := 1;
    longestStreak := 1;
    i := 1;
    while (i < datesArr.size()) {
      if (isConsecutiveDays(datesArr[i], datesArr[i - 1])) {
        // datesArr[i] is one day before datesArr[i-1]
        runStreak += 1;
        if (runStreak > longestStreak) { longestStreak := runStreak };
      } else {
        runStreak := 1;
      };
      i += 1;
    };

    // Current streak: run starting from today or yesterday
    currentStreak := 0;
    if (datesArr.size() > 0) {
      // The first date must be today or yesterday to count
      if (datesArr[0] == today or isConsecutiveDays(datesArr[0], today)) {
        currentStreak := 1;
        i := 1;
        while (i < datesArr.size()) {
          if (isConsecutiveDays(datesArr[i], datesArr[i - 1])) {
            currentStreak += 1;
            i += 1;
          } else {
            i := datesArr.size(); // break
          };
        };
      };
    };

    { habitId; currentStreak; longestStreak };
  };

  // Returns true if dateA is exactly one day before dateB
  // Both are "YYYY-MM-DD" ISO strings
  private func isConsecutiveDays(dateA : Text, dateB : Text) : Bool {
    // Add 1 day to dateA and check if it equals dateB
    addOneDay(dateA) == dateB;
  };

  private func addOneDay(date : Text) : Text {
    // Parse "YYYY-MM-DD"
    let parts = date.split(#char '-');
    let arr = parts.toArray();
    if (arr.size() != 3) { return date };
    let yearOpt = arr[0].toNat();
    let monthOpt = arr[1].toNat();
    let dayOpt = arr[2].toNat();
    switch (yearOpt, monthOpt, dayOpt) {
      case (?year, ?month, ?day) {
        let daysInMonth = daysInMonthFn(year, month);
        if (day < daysInMonth) {
          year.toText() # "-" # padTwo(month) # "-" # padTwo(day + 1);
        } else if (month < 12) {
          year.toText() # "-" # padTwo(month + 1) # "-01";
        } else {
          (year + 1).toText() # "-01-01";
        };
      };
      case _ { date };
    };
  };

  private func padTwo(n : Nat) : Text {
    if (n < 10) { "0" # n.toText() } else { n.toText() };
  };

  private func daysInMonthFn(year : Nat, month : Nat) : Nat {
    switch (month) {
      case 1 { 31 };
      case 2 {
        if (isLeapYear(year)) { 29 } else { 28 };
      };
      case 3 { 31 };
      case 4 { 30 };
      case 5 { 31 };
      case 6 { 30 };
      case 7 { 31 };
      case 8 { 31 };
      case 9 { 30 };
      case 10 { 31 };
      case 11 { 30 };
      case 12 { 31 };
      case _ { 30 };
    };
  };

  private func isLeapYear(year : Nat) : Bool {
    (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0);
  };
};
