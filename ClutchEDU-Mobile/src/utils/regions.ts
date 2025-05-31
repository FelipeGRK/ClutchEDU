// src/utils/regions.ts

export const stateAbbrev: Record<string, string> = {
  Alabama: 'AL',
  Alaska: 'AK',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  'District of Columbia': 'DC',
  Florida: 'FL',
  Georgia: 'GA',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
  'Virgin Islands': 'VI',
};

export const baseRegionMapping: Record<string, string[]> = {
  Northeast: [
    'Connecticut',
    'Delaware',
    'District of Columbia',
    'Maine',
    'Maryland',
    'Massachusetts',
    'New Hampshire',
    'New Jersey',
    'New York',
    'Pennsylvania',
    'Rhode Island',
    'Vermont',
    'Virgin Islands',
    'Virginia',
    'West Virginia',
  ],
  Midwest: [
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Michigan',
    'Minnesota',
    'Missouri',
    'Nebraska',
    'North Dakota',
    'Ohio',
    'South Dakota',
    'Wisconsin',
  ],
  South: [
    'Alabama',
    'Arkansas',
    'Florida',
    'Georgia',
    'Kentucky',
    'Louisiana',
    'Mississippi',
    'North Carolina',
    'Oklahoma',
    'South Carolina',
    'Tennessee',
    'Texas',
  ],
  West: [
    'Arizona',
    'Colorado',
    'Idaho',
    'Montana',
    'Nevada',
    'New Mexico',
    'Utah',
    'Washington',
    'Oregon',
    'California',
    'Alaska',
    'Hawaii',
  ],
};

// Build regionMapping so that each region key maps to an array of
// [ full state names …, plus their two‐letter codes ]
export const regionMapping: Record<string, string[]> = Object.fromEntries(
  Object.entries(baseRegionMapping).map(([region, states]) => {
    const allStatesAndAbbrs: string[] = [];
    states.forEach((fullName) => {
      allStatesAndAbbrs.push(fullName);
      const ab = stateAbbrev[fullName];
      if (ab) {
        allStatesAndAbbrs.push(ab);
      }
    });
    return [region, allStatesAndAbbrs];
  })
);

/**
 * Returns true if the collegeState matches the targetState.
 *
 *   • collegeState might be either a full name ("Tennessee") or already the 2‐letter code ("TN").
 *   • targetState can be a full name ("Tennessee") or a 2‐letter code ("TN").
 */
export function locationMatchesState(
  collegeState: string,
  targetState: string
): boolean {
  if (!collegeState || !targetState) return false;

  const lcCollege = collegeState.trim().toLowerCase();
  const ltTarget = targetState.trim().toLowerCase();

  // 1) If both are full names, match directly (e.g. "tennessee" === "tennessee")
  if (lcCollege === ltTarget) {
    return true;
  }

  // 2) If collegeState is full name, check if its abbreviation equals targetState:
  //    e.g. stateAbbrev["Tennessee"] === "TN"
  const abbrOfCollege = stateAbbrev[collegeState];
  if (abbrOfCollege && abbrOfCollege.toLowerCase() === ltTarget) {
    return true;
  }

  // 3) If collegeState is already a 2-letter code, compare it to targetState:
  //    e.g. collegeState = "TN", targetState = "TN" → match
  if (lcCollege.length === 2 && lcCollege === ltTarget) {
    return true;
  }

  return false;
}
