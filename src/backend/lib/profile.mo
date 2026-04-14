import CommonTypes "../types/common";
import ProfileTypes "../types/profile";
import Map "mo:core/Map";
import Time "mo:core/Time";

module {
  public type UserProfile = ProfileTypes.UserProfile;
  public type UserPreferences = ProfileTypes.UserPreferences;
  public type OnboardingData = ProfileTypes.OnboardingData;
  public type AppError = CommonTypes.AppError;

  public func getOrCreateProfile(
    profiles : Map.Map<Principal, UserProfile>,
    userId : Principal,
  ) : UserProfile {
    switch (profiles.get(userId)) {
      case (?profile) { profile };
      case null {
        let newProfile : UserProfile = {
          userId;
          onboarding = { completed = false; hasPeriods = null };
          preferences = { theme = #cloud; fontSize = #base; highContrast = false };
          createdAt = Time.now();
        };
        profiles.add(userId, newProfile);
        newProfile;
      };
    };
  };

  public func updatePreferences(
    profiles : Map.Map<Principal, UserProfile>,
    userId : Principal,
    prefs : UserPreferences,
  ) : CommonTypes.Result<UserProfile, AppError> {
    let profile = getOrCreateProfile(profiles, userId);
    let updated : UserProfile = { profile with preferences = prefs };
    profiles.add(userId, updated);
    #ok(updated);
  };

  public func completeOnboarding(
    profiles : Map.Map<Principal, UserProfile>,
    userId : Principal,
    hasPeriods : Bool,
  ) : CommonTypes.Result<UserProfile, AppError> {
    let profile = getOrCreateProfile(profiles, userId);
    let updated : UserProfile = {
      profile with
      onboarding = { completed = true; hasPeriods = ?hasPeriods };
    };
    profiles.add(userId, updated);
    #ok(updated);
  };
};
