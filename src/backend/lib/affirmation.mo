module {
  let affirmations : [Text] = [
    // Self-compassion (1-10)
    "You are worthy of love and kindness, especially from yourself.",
    "Be gentle with yourself — you are doing the best you can.",
    "Your feelings are valid. You don't have to justify them to anyone.",
    "You deserve the same compassion you give to others.",
    "It's okay to rest. Rest is not weakness — it is wisdom.",
    "You are allowed to take up space in this world.",
    "Mistakes are how humans grow. You are allowed to be imperfect.",
    "You are not behind. You are exactly where you need to be.",
    "Treat yourself with the patience you would offer a dear friend.",
    "Your needs matter. Taking care of yourself is not selfish.",
    // Hope (11-20)
    "Even the darkest night will eventually give way to morning.",
    "This moment is not permanent. Better days are coming.",
    "Hope does not require certainty — it only asks you to keep going.",
    "Small steps forward still move you closer to where you want to be.",
    "Every sunrise is a reminder that renewal is always possible.",
    "You have survived every difficult day so far. That is real strength.",
    "Seeds planted in hard soil can still bloom beautifully.",
    "There is always more story to be written.",
    "The future holds possibilities you cannot yet imagine.",
    "You are allowed to believe things can get better.",
    // Resilience (21-30)
    "You are stronger than you know, and braver than you feel.",
    "Hardship has shaped you, not broken you.",
    "Every challenge you face is building your capacity to handle more.",
    "You have come through difficult times before and found your way.",
    "Resilience is not the absence of struggle — it is continuing anyway.",
    "Your roots run deep. Storms may bend you, but cannot uproot you.",
    "You are not defined by your worst moments.",
    "Even when progress feels invisible, it is still happening.",
    "Difficult roads often lead to beautiful destinations.",
    "You have inner resources you haven't fully discovered yet.",
    // Self-worth (31-40)
    "You have intrinsic worth simply because you exist.",
    "You don't need to earn the right to be here.",
    "Your value is not measured by your productivity.",
    "You are enough exactly as you are, right now.",
    "You bring something unique to the world that no one else can.",
    "Your presence is a gift, even when it doesn't feel that way.",
    "You are worthy of good things — health, joy, connection, peace.",
    "What others think of you does not define your worth.",
    "You deserve kindness, safety, and belonging.",
    "You matter more than you realize.",
    // Healing (41-50)
    "Healing is not linear. Every step counts, including the ones back.",
    "You are allowed to heal at your own pace.",
    "Asking for help is one of the bravest things you can do.",
    "Your body and mind are always working toward healing.",
    "Every moment of self-care is an act of love toward yourself.",
    "Grief and growth can exist together.",
    "You don't have to be fully healed to deserve care and support.",
    "Each day you choose to keep going is a victory.",
    "You are allowed to feel better. You don't have to hold onto pain.",
    "Healing happens in small, quiet moments too.",
    // Peace (51-60)
    "You are allowed to let go of what no longer serves you.",
    "Peace begins with accepting this present moment.",
    "You cannot control everything, and that's okay.",
    "Breathe. This moment will pass.",
    "You deserve calm, safety, and gentleness.",
    "Stillness is not emptiness — it is where peace lives.",
    "You are allowed to say no, to rest, and to protect your energy.",
    "The present moment is always enough — you are enough right now.",
    "Let yourself be exactly where you are without judgment.",
    "You carry within you a quiet strength that is always there.",
  ];

  public func getDailyAffirmation(dayOfYear : Nat) : Text {
    let index = dayOfYear % affirmations.size();
    affirmations[index];
  };
};
