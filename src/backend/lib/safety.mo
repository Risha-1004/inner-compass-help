import CommonTypes "../types/common";
import SafetyTypes "../types/safety";
import Map "mo:core/Map";

module {
  public type SafetyPlan = SafetyTypes.SafetyPlan;
  public type SupportContact = SafetyTypes.SupportContact;
  public type ProfessionalContact = SafetyTypes.ProfessionalContact;
  public type AppError = CommonTypes.AppError;

  public func getSafetyPlan(
    safetyPlans : Map.Map<Principal, SafetyPlan>,
    userId : Principal,
  ) : ?SafetyPlan {
    safetyPlans.get(userId);
  };

  public func upsertSafetyPlan(
    safetyPlans : Map.Map<Principal, SafetyPlan>,
    userId : Principal,
    reasonsToLive : [Text],
    warningSigns : [Text],
    copingStrategies : [Text],
    supportContacts : [SupportContact],
    professionalContacts : [ProfessionalContact],
    safeEnvironmentNotes : Text,
    now : Int,
  ) : CommonTypes.Result<SafetyPlan, AppError> {
    let plan : SafetyPlan = {
      userId;
      reasonsToLive;
      warningSigns;
      copingStrategies;
      supportContacts;
      professionalContacts;
      safeEnvironmentNotes;
      updatedAt = now;
    };
    safetyPlans.add(userId, plan);
    #ok(plan);
  };

  public func deleteSafetyPlan(
    safetyPlans : Map.Map<Principal, SafetyPlan>,
    userId : Principal,
  ) : CommonTypes.Result<(), AppError> {
    if (not safetyPlans.containsKey(userId)) return #err(#notFound);
    safetyPlans.remove(userId);
    #ok(());
  };
};
