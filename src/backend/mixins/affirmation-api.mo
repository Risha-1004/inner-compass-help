import AffirmationLib "../lib/affirmation";

mixin () {

  public query func getDailyAffirmation(dayOfYear : Nat) : async Text {
    AffirmationLib.getDailyAffirmation(dayOfYear);
  };
};
