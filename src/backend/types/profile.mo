module {
  public type Theme = { #cloud; #ocean; #sunset; #night };
  public type FontSize = { #sm; #base; #lg };

  public type UserPreferences = {
    theme : Theme;
    fontSize : FontSize;
    highContrast : Bool;
  };

  public type OnboardingData = {
    completed : Bool;
    hasPeriods : ?Bool;
  };

  public type UserProfile = {
    userId : Principal;
    onboarding : OnboardingData;
    preferences : UserPreferences;
    createdAt : Int;
  };
};
