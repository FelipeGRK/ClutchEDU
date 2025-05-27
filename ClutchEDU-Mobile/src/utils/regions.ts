// src/utils/regions.ts
export const stateAbbrev: Record<string,string> = {
  Alabama: "AL", Alaska:"AK", Arizona:"AZ", Arkansas:"AR", California:"CA", Colorado:"CO",
  Connecticut:"CT", Delaware:"DE", "District of Columbia":"DC", Florida:"FL", Georgia:"GA",
  Hawaii:"HI", Idaho:"ID", Illinois:"IL", Indiana:"IN", Iowa:"IA", Kansas:"KS",
  Kentucky:"KY", Louisiana:"LA", Maine:"ME", Maryland:"MD", Massachusetts:"MA",
  Michigan:"MI", Minnesota:"MN", Mississippi:"MS", Missouri:"MO", Montana:"MT",
  Nebraska:"NE", Nevada:"NV", "New Hampshire":"NH", "New Jersey":"NJ",
  "New Mexico":"NM", "New York":"NY", "North Carolina":"NC", "North Dakota":"ND",
  Ohio:"OH", Oklahoma:"OK", Oregon:"OR", Pennsylvania:"PA", "Rhode Island":"RI",
  "South Carolina":"SC", "South Dakota":"SD", Tennessee:"TN", Texas:"TX", Utah:"UT",
  Vermont:"VT", Virginia:"VA", Washington:"WA", "West Virginia":"WV",
  Wisconsin:"WI", Wyoming:"WY", "Virgin Islands":"VI"
};

export const baseRegionMapping: Record<string,string[]> = {
  Northeast: [
    "Connecticut","Delaware","District of Columbia","Maine","Maryland",
    "Massachusetts","New Hampshire","New Jersey","New York","Pennsylvania",
    "Rhode Island","Vermont","Virgin Islands","Virginia","West Virginia"
  ],
  Midwest: [
    "Illinois","Indiana","Iowa","Kansas","Michigan",
    "Minnesota","Missouri","Nebraska","North Dakota","Ohio",
    "South Dakota","Wisconsin"
  ],
  South: [
    "Alabama","Arkansas","Florida","Georgia","Kentucky",
    "Louisiana","Mississippi","North Carolina","Oklahoma","South Carolina",
    "Tennessee","Texas"
  ],
  West: [
    "Arizona","Colorado","Idaho","Montana","Nevada",
    "New Mexico","Utah","Washington","Oregon","California",
    "Alaska","Hawaii"
  ]
};

// Junta regionMapping com abreviações
export const regionMapping: Record<string,string[]> = Object.fromEntries(
  Object.entries(baseRegionMapping).map(([region, states]) => {
    const arr: string[] = [];
    states.forEach(s => {
      arr.push(s);
      const ab = stateAbbrev[s];
      if (ab) arr.push(ab);
    });
    return [region, arr];
  })
);

export function locationMatchesState(collegeState: string, targetState: string) {
  if (!collegeState) return false;
  const lc = collegeState.toLowerCase();
  const lt = targetState.toLowerCase();
  if (lc === lt) return true;
  const abbr = stateAbbrev[targetState];
  return abbr?.toLowerCase() === lc;
}
