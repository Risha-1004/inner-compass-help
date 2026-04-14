import CommonTypes "../types/common";
import GoalTypes "../types/goal";
import Map "mo:core/Map";
import List "mo:core/List";

module {
  public type Goal = GoalTypes.Goal;
  public type GoalStatus = GoalTypes.GoalStatus;
  public type AppError = CommonTypes.AppError;

  public func createGoal(
    goals : Map.Map<Principal, List.List<Goal>>,
    userId : Principal,
    title : Text,
    description : Text,
    targetDate : ?Text,
    nextId : Nat,
    now : Int,
  ) : CommonTypes.Result<Goal, AppError> {
    if (title.size() == 0) {
      return #err(#invalidInput("title cannot be empty"));
    };
    let goal : Goal = {
      id = nextId;
      title;
      description;
      targetDate;
      status = #active;
      progress = 0;
      createdAt = now;
      updatedAt = now;
    };
    let userGoals = switch (goals.get(userId)) {
      case (?gs) { gs };
      case null { List.empty<Goal>() };
    };
    userGoals.add(goal);
    goals.add(userId, userGoals);
    #ok(goal);
  };

  public func getGoals(
    goals : Map.Map<Principal, List.List<Goal>>,
    userId : Principal,
    status : ?GoalStatus,
  ) : [Goal] {
    switch (goals.get(userId)) {
      case null { [] };
      case (?gs) {
        let filtered = switch (status) {
          case null { gs.toArray() };
          case (?s) {
            gs.filter(func(g : Goal) : Bool {
              switch (g.status, s) {
                case (#active, #active) { true };
                case (#completed, #completed) { true };
                case (#abandoned, #abandoned) { true };
                case _ { false };
              };
            }).toArray();
          };
        };
        filtered.sort(func(a : Goal, b : Goal) : { #less; #equal; #greater } {
          if (a.createdAt > b.createdAt) #less
          else if (a.createdAt < b.createdAt) #greater
          else #equal
        });
      };
    };
  };

  public func updateGoal(
    goals : Map.Map<Principal, List.List<Goal>>,
    userId : Principal,
    goalId : Nat,
    title : ?Text,
    description : ?Text,
    targetDate : ?Text,
    status : ?GoalStatus,
    progress : ?Nat,
    now : Int,
  ) : CommonTypes.Result<Goal, AppError> {
    switch (goals.get(userId)) {
      case null { #err(#notFound) };
      case (?gs) {
        var found : ?Goal = null;
        gs.mapInPlace(func(g : Goal) : Goal {
          if (g.id == goalId) {
            let newProgress = switch (progress) {
              case (?p) { if (p > 100) 100 else p };
              case null { g.progress };
            };
            let updated : Goal = {
              g with
              title = switch (title) { case (?t) t; case null g.title };
              description = switch (description) { case (?d) d; case null g.description };
              targetDate = switch (targetDate) { case (?td) ?td; case null g.targetDate };
              status = switch (status) { case (?s) s; case null g.status };
              progress = newProgress;
              updatedAt = now;
            };
            found := ?updated;
            updated;
          } else { g };
        });
        switch (found) {
          case null { #err(#notFound) };
          case (?updated) { #ok(updated) };
        };
      };
    };
  };

  public func deleteGoal(
    goals : Map.Map<Principal, List.List<Goal>>,
    userId : Principal,
    goalId : Nat,
  ) : CommonTypes.Result<(), AppError> {
    switch (goals.get(userId)) {
      case null { #err(#notFound) };
      case (?gs) {
        let sizeBefore = gs.size();
        let filtered = gs.filter(func(g : Goal) : Bool { g.id != goalId });
        if (filtered.size() == sizeBefore) {
          #err(#notFound);
        } else {
          goals.add(userId, filtered);
          #ok(());
        };
      };
    };
  };
};
