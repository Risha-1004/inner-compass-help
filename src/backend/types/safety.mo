module {
  public type SupportContact = {
    name : Text;
    phone : Text;
    relation : Text;
  };

  public type ProfessionalContact = {
    name : Text;
    phone : Text;
    role : Text; // "therapist" | "doctor" | "crisis line" | etc.
  };

  public type SafetyPlan = {
    userId : Principal;
    reasonsToLive : [Text];
    warningSigns : [Text];
    copingStrategies : [Text];
    supportContacts : [SupportContact];
    professionalContacts : [ProfessionalContact];
    safeEnvironmentNotes : Text;
    updatedAt : Int;
  };
};
