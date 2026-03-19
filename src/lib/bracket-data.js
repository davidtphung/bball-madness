// STATUS VALUES: "pick" = pre-game prediction, "correct" = pick was right,
// "wrong" = pick was wrong, "pending" = game not yet played

export const BRACKET = {
  east: {
    name: "East",
    site: "San Diego → Washington D.C.",
    r64: [
      { id: "e1", s1: 1, t1: "Duke", s2: 16, t2: "Siena", pick: "Duke", result: null, status: "pending" },
      { id: "e2", s1: 8, t1: "Ohio State", s2: 9, t2: "TCU", pick: "Ohio State", result: null, status: "pending" },
      { id: "e3", s1: 5, t1: "St. John's", s2: 12, t2: "Northern Iowa", pick: "St. John's", result: null, status: "pending" },
      { id: "e4", s1: 4, t1: "Kansas", s2: 13, t2: "Cal Baptist", pick: "Kansas", result: null, status: "pending" },
      { id: "e5", s1: 6, t1: "Louisville", s2: 11, t2: "South Florida", pick: "Louisville", result: null, status: "pending" },
      { id: "e6", s1: 3, t1: "Michigan State", s2: 14, t2: "North Dakota State", pick: "Michigan State", result: null, status: "pending" },
      { id: "e7", s1: 7, t1: "UCLA", s2: 10, t2: "UCF", pick: "UCLA", result: null, status: "pending" },
      { id: "e8", s1: 2, t1: "UConn", s2: 15, t2: "Furman", pick: "UConn", result: null, status: "pending" },
    ],
    r32: [
      { id: "e9", pick1: "Duke", pick2: "Ohio State", pick: "Duke", result: null, status: "pending" },
      { id: "e10", pick1: "St. John's", pick2: "Kansas", pick: "Kansas", result: null, status: "pending" },
      { id: "e11", pick1: "Louisville", pick2: "Michigan State", pick: "Louisville", result: null, status: "pending" },
      { id: "e12", pick1: "UCLA", pick2: "UConn", pick: "UConn", result: null, status: "pending" },
    ],
    s16: [
      { id: "e13", pick1: "Duke", pick2: "Kansas", pick: "Duke", result: null, status: "pending" },
      { id: "e14", pick1: "Louisville", pick2: "UConn", pick: "UConn", result: null, status: "pending" },
    ],
    e8: { id: "e15", pick1: "Duke", pick2: "UConn", pick: "Duke", result: null, status: "pending" },
  },
  west: {
    name: "West",
    site: "Denver → Wichita",
    r64: [
      { id: "w1", s1: 1, t1: "Arizona", s2: 16, t2: "LIU", pick: "Arizona", result: null, status: "pending" },
      { id: "w2", s1: 8, t1: "Villanova", s2: 9, t2: "Utah State", pick: "Utah State", result: null, status: "pending" },
      { id: "w3", s1: 5, t1: "Wisconsin", s2: 12, t2: "High Point", pick: "Wisconsin", result: null, status: "pending" },
      { id: "w4", s1: 4, t1: "Arkansas", s2: 13, t2: "Hawaii", pick: "Arkansas", result: null, status: "pending" },
      { id: "w5", s1: 6, t1: "BYU", s2: 11, t2: "Texas/NC State", pick: "BYU", result: null, status: "pending" },
      { id: "w6", s1: 3, t1: "Gonzaga", s2: 14, t2: "Kennesaw State", pick: "Gonzaga", result: null, status: "pending" },
      { id: "w7", s1: 7, t1: "Miami (FL)", s2: 10, t2: "Missouri", pick: "Missouri", result: null, status: "pending" },
      { id: "w8", s1: 2, t1: "Purdue", s2: 15, t2: "Queens", pick: "Purdue", result: null, status: "pending" },
    ],
    r32: [
      { id: "w9", pick1: "Arizona", pick2: "Utah State", pick: "Arizona", result: null, status: "pending" },
      { id: "w10", pick1: "Wisconsin", pick2: "Arkansas", pick: "Arkansas", result: null, status: "pending" },
      { id: "w11", pick1: "BYU", pick2: "Gonzaga", pick: "Gonzaga", result: null, status: "pending" },
      { id: "w12", pick1: "Missouri", pick2: "Purdue", pick: "Purdue", result: null, status: "pending" },
    ],
    s16: [
      { id: "w13", pick1: "Arizona", pick2: "Arkansas", pick: "Arizona", result: null, status: "pending" },
      { id: "w14", pick1: "Gonzaga", pick2: "Purdue", pick: "Purdue", result: null, status: "pending" },
    ],
    e8: { id: "w15", pick1: "Arizona", pick2: "Purdue", pick: "Arizona", result: null, status: "pending" },
  },
  south: {
    name: "South",
    site: "Omaha → Houston",
    r64: [
      { id: "s1", s1: 1, t1: "Florida", s2: 16, t2: "Prairie View A&M", pick: "Florida", result: null, status: "pending" },
      { id: "s2", s1: 8, t1: "Clemson", s2: 9, t2: "Iowa", pick: "Iowa", result: null, status: "pending" },
      { id: "s3", s1: 5, t1: "Vanderbilt", s2: 12, t2: "McNeese", pick: "Vanderbilt", result: null, status: "pending" },
      { id: "s4", s1: 4, t1: "Nebraska", s2: 13, t2: "Troy", pick: "Nebraska", result: null, status: "pending" },
      { id: "s5", s1: 6, t1: "North Carolina", s2: 11, t2: "VCU", pick: "VCU", result: null, status: "pending" },
      { id: "s6", s1: 3, t1: "Illinois", s2: 14, t2: "Penn", pick: "Illinois", result: null, status: "pending" },
      { id: "s7", s1: 7, t1: "Saint Mary's", s2: 10, t2: "Texas A&M", pick: "Saint Mary's", result: null, status: "pending" },
      { id: "s8", s1: 2, t1: "Houston", s2: 15, t2: "Idaho", pick: "Houston", result: null, status: "pending" },
    ],
    r32: [
      { id: "s9", pick1: "Florida", pick2: "Iowa", pick: "Florida", result: null, status: "pending" },
      { id: "s10", pick1: "Vanderbilt", pick2: "Nebraska", pick: "Vanderbilt", result: null, status: "pending" },
      { id: "s11", pick1: "VCU", pick2: "Illinois", pick: "Illinois", result: null, status: "pending" },
      { id: "s12", pick1: "Saint Mary's", pick2: "Houston", pick: "Houston", result: null, status: "pending" },
    ],
    s16: [
      { id: "s13", pick1: "Florida", pick2: "Vanderbilt", pick: "Florida", result: null, status: "pending" },
      { id: "s14", pick1: "Illinois", pick2: "Houston", pick: "Houston", result: null, status: "pending" },
    ],
    e8: { id: "s15", pick1: "Florida", pick2: "Houston", pick: "Houston", result: null, status: "pending" },
  },
  midwest: {
    name: "Midwest",
    site: "St. Louis → Indianapolis",
    r64: [
      { id: "m1", s1: 1, t1: "Michigan", s2: 16, t2: "Howard", pick: "Michigan", result: null, status: "pending" },
      { id: "m2", s1: 8, t1: "Georgia", s2: 9, t2: "Saint Louis", pick: "Saint Louis", result: null, status: "pending" },
      { id: "m3", s1: 5, t1: "Texas Tech", s2: 12, t2: "Akron", pick: "Akron", result: null, status: "pending" },
      { id: "m4", s1: 4, t1: "Alabama", s2: 13, t2: "Hofstra", pick: "Alabama", result: null, status: "pending" },
      { id: "m5", s1: 6, t1: "Tennessee", s2: 11, t2: "Miami (OH)", pick: "Tennessee", result: null, status: "pending" },
      { id: "m6", s1: 3, t1: "Virginia", s2: 14, t2: "Wright State", pick: "Virginia", result: null, status: "pending" },
      { id: "m7", s1: 7, t1: "Kentucky", s2: 10, t2: "Santa Clara", pick: "Santa Clara", result: null, status: "pending" },
      { id: "m8", s1: 2, t1: "Iowa State", s2: 15, t2: "Tennessee State", pick: "Iowa State", result: null, status: "pending" },
    ],
    r32: [
      { id: "m9", pick1: "Michigan", pick2: "Saint Louis", pick: "Michigan", result: null, status: "pending" },
      { id: "m10", pick1: "Akron", pick2: "Alabama", pick: "Alabama", result: null, status: "pending" },
      { id: "m11", pick1: "Tennessee", pick2: "Virginia", pick: "Tennessee", result: null, status: "pending" },
      { id: "m12", pick1: "Santa Clara", pick2: "Iowa State", pick: "Iowa State", result: null, status: "pending" },
    ],
    s16: [
      { id: "m13", pick1: "Michigan", pick2: "Alabama", pick: "Michigan", result: null, status: "pending" },
      { id: "m14", pick1: "Tennessee", pick2: "Iowa State", pick: "Iowa State", result: null, status: "pending" },
    ],
    e8: { id: "m15", pick1: "Michigan", pick2: "Iowa State", pick: "Michigan", result: null, status: "pending" },
  },
  finalFour: {
    semi1: { id: "ff1", team1: "Duke", team2: "Arizona", pick: "Arizona", result: null, status: "pending", predictedScore: "74-68" },
    semi2: { id: "ff2", team1: "Houston", team2: "Michigan", pick: "Houston", result: null, status: "pending", predictedScore: "66-62" },
  },
  championship: {
    id: "champ", team1: "Arizona", team2: "Houston", pick: "Arizona", result: null, status: "pending", predictedScore: "71-65"
  },
  champion: "Arizona",
};

export const RECORD = {
  correct: 0,
  wrong: 0,
  pending: 63,
  upsetsCalled: 7,
  upsetsHit: 0,
};

export const UPSET_PICKS = [
  { team: "VCU", seed: 11, over: "North Carolina", overSeed: 6, region: "South" },
  { team: "Saint Louis", seed: 9, over: "Georgia", overSeed: 8, region: "Midwest" },
  { team: "Santa Clara", seed: 10, over: "Kentucky", overSeed: 7, region: "Midwest" },
  { team: "Akron", seed: 12, over: "Texas Tech", overSeed: 5, region: "Midwest" },
  { team: "Utah State", seed: 9, over: "Villanova", overSeed: 8, region: "West" },
  { team: "Iowa", seed: 9, over: "Clemson", overSeed: 8, region: "South" },
  { team: "Missouri", seed: 10, over: "Miami (FL)", overSeed: 7, region: "West" },
];

export const ROUND_LABELS = {
  r64: "Round of 64",
  r32: "Round of 32",
  s16: "Sweet 16",
  e8: "Elite Eight",
  ff: "Final Four",
  champ: "Championship",
};
