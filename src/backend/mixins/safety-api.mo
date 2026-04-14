import SafetyLib "../lib/safety";
import SafetyTypes "../types/safety";
import CommonTypes "../types/common";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (safetyPlans : Map.Map<Principal, SafetyTypes.SafetyPlan>) {

  public shared query ({ caller }) func getSafetyPlan() : async ?SafetyTypes.SafetyPlan {
    SafetyLib.getSafetyPlan(safetyPlans, caller);
  };

  public shared ({ caller }) func upsertSafetyPlan(
    reasonsToLive : [Text],
    warningSigns : [Text],
    copingStrategies : [Text],
    supportContacts : [SafetyTypes.SupportContact],
    professionalContacts : [SafetyTypes.ProfessionalContact],
    safeEnvironmentNotes : Text,
  ) : async CommonTypes.Result<SafetyTypes.SafetyPlan, CommonTypes.AppError> {
    SafetyLib.upsertSafetyPlan(safetyPlans, caller, reasonsToLive, warningSigns, copingStrategies, supportContacts, professionalContacts, safeEnvironmentNotes, Time.now());
  };

  public shared ({ caller }) func deleteSafetyPlan() : async CommonTypes.Result<(), CommonTypes.AppError> {
    SafetyLib.deleteSafetyPlan(safetyPlans, caller);
  };
};
