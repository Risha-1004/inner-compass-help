import ProfileLib "../lib/profile";
import ProfileTypes "../types/profile";
import CommonTypes "../types/common";
import Map "mo:core/Map";

mixin (profiles : Map.Map<Principal, ProfileTypes.UserProfile>) {

  public shared ({ caller }) func getMyProfile() : async ?ProfileTypes.UserProfile {
    ?ProfileLib.getOrCreateProfile(profiles, caller);
  };

  public shared ({ caller }) func completeOnboarding(hasPeriods : Bool) : async CommonTypes.Result<ProfileTypes.UserProfile, CommonTypes.AppError> {
    ProfileLib.completeOnboarding(profiles, caller, hasPeriods);
  };

  public shared ({ caller }) func updatePreferences(
    theme : Text,
    fontSize : Text,
    highContrast : Bool,
  ) : async CommonTypes.Result<ProfileTypes.UserProfile, CommonTypes.AppError> {
    let themeVal : ProfileTypes.Theme = switch (theme) {
      case "ocean" { #ocean };
      case "sunset" { #sunset };
      case "night" { #night };
      case _ { #cloud };
    };
    let fontSizeVal : ProfileTypes.FontSize = switch (fontSize) {
      case "sm" { #sm };
      case "lg" { #lg };
      case _ { #base };
    };
    let prefs : ProfileTypes.UserPreferences = {
      theme = themeVal;
      fontSize = fontSizeVal;
      highContrast;
    };
    ProfileLib.updatePreferences(profiles, caller, prefs);
  };
};
