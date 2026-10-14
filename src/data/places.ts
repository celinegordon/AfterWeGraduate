// Every state (plus DC) and its major cities.
// Add or remove cities here; they show up in the search suggestions automatically.

export type State = {
  name: string
  abbr: string
  cities: string[]
}

export const states: State[] = [
  {
    name: "Alabama",
    abbr: "AL",
    cities: ["Birmingham", "Montgomery", "Huntsville", "Mobile"],
  },
  { name: "Alaska", abbr: "AK", cities: ["Anchorage"] },
  { name: "Arizona", abbr: "AZ", cities: ["Phoenix", "Tucson", "Mesa"] },
  { name: "Arkansas", abbr: "AR", cities: ["Little Rock"] },
  {
    name: "California",
    abbr: "CA",
    cities: [
      "Los Angeles",
      "San Diego",
      "San Francisco",
      "Oakland",
      "San Jose",
      "Sacramento",
    ],
  },
  {
    name: "Colorado",
    abbr: "CO",
    cities: ["Denver", "Colorado Springs", "Aurora"],
  },
  {
    name: "Connecticut",
    abbr: "CT",
    cities: ["Hartford", "New Haven", "Bridgeport"],
  },
  { name: "Delaware", abbr: "DE", cities: ["Wilmington", "Dover"] },
  { name: "District of Columbia", abbr: "DC", cities: ["Washington"] },
  {
    name: "Florida",
    abbr: "FL",
    cities: [
      "Miami",
      "Orlando",
      "Tampa",
      "Jacksonville",
      "Tallahassee",
      "Fort Lauderdale",
    ],
  },
  {
    name: "Georgia",
    abbr: "GA",
    cities: ["Atlanta", "Savannah", "Augusta", "Columbus"],
  },
  { name: "Hawaii", abbr: "HI", cities: ["Honolulu"] },
  { name: "Idaho", abbr: "ID", cities: ["Boise"] },
  { name: "Illinois", abbr: "IL", cities: ["Chicago", "Springfield"] },
  {
    name: "Indiana",
    abbr: "IN",
    cities: ["Indianapolis", "Fort Wayne", "Gary"],
  },
  { name: "Iowa", abbr: "IA", cities: ["Des Moines"] },
  { name: "Kansas", abbr: "KS", cities: ["Wichita", "Kansas City"] },
  { name: "Kentucky", abbr: "KY", cities: ["Louisville", "Lexington"] },
  {
    name: "Louisiana",
    abbr: "LA",
    cities: ["New Orleans", "Baton Rouge", "Shreveport"],
  },
  { name: "Maine", abbr: "ME", cities: ["Portland"] },
  {
    name: "Maryland",
    abbr: "MD",
    cities: ["Baltimore", "Silver Spring", "Columbia"],
  },
  {
    name: "Massachusetts",
    abbr: "MA",
    cities: ["Boston", "Worcester", "Springfield"],
  },
  {
    name: "Michigan",
    abbr: "MI",
    cities: ["Detroit", "Grand Rapids", "Lansing"],
  },
  { name: "Minnesota", abbr: "MN", cities: ["Minneapolis", "Saint Paul"] },
  { name: "Mississippi", abbr: "MS", cities: ["Jackson"] },
  { name: "Missouri", abbr: "MO", cities: ["St. Louis", "Kansas City"] },
  { name: "Montana", abbr: "MT", cities: ["Billings"] },
  { name: "Nebraska", abbr: "NE", cities: ["Omaha", "Lincoln"] },
  { name: "Nevada", abbr: "NV", cities: ["Las Vegas", "Reno"] },
  { name: "New Hampshire", abbr: "NH", cities: ["Manchester"] },
  {
    name: "New Jersey",
    abbr: "NJ",
    cities: ["Newark", "Jersey City", "Trenton"],
  },
  { name: "New Mexico", abbr: "NM", cities: ["Albuquerque"] },
  {
    name: "New York",
    abbr: "NY",
    cities: ["New York", "Brooklyn", "Buffalo", "Rochester", "Albany"],
  },
  {
    name: "North Carolina",
    abbr: "NC",
    cities: ["Charlotte", "Raleigh", "Durham", "Greensboro"],
  },
  { name: "North Dakota", abbr: "ND", cities: ["Fargo"] },
  {
    name: "Ohio",
    abbr: "OH",
    cities: ["Columbus", "Cleveland", "Cincinnati", "Akron"],
  },
  { name: "Oklahoma", abbr: "OK", cities: ["Oklahoma City", "Tulsa"] },
  { name: "Oregon", abbr: "OR", cities: ["Portland"] },
  {
    name: "Pennsylvania",
    abbr: "PA",
    cities: ["Philadelphia", "Pittsburgh", "Harrisburg"],
  },
  { name: "Rhode Island", abbr: "RI", cities: ["Providence"] },
  {
    name: "South Carolina",
    abbr: "SC",
    cities: ["Charleston", "Columbia", "Greenville"],
  },
  { name: "South Dakota", abbr: "SD", cities: ["Sioux Falls"] },
  {
    name: "Tennessee",
    abbr: "TN",
    cities: ["Nashville", "Memphis", "Knoxville", "Chattanooga"],
  },
  {
    name: "Texas",
    abbr: "TX",
    cities: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth"],
  },
  { name: "Utah", abbr: "UT", cities: ["Salt Lake City"] },
  { name: "Vermont", abbr: "VT", cities: ["Burlington"] },
  {
    name: "Virginia",
    abbr: "VA",
    cities: [
      "Richmond",
      "Virginia Beach",
      "Norfolk",
      "Arlington",
      "Alexandria",
    ],
  },
  { name: "Washington", abbr: "WA", cities: ["Seattle", "Tacoma", "Spokane"] },
  { name: "West Virginia", abbr: "WV", cities: ["Charleston"] },
  { name: "Wisconsin", abbr: "WI", cities: ["Milwaukee", "Madison"] },
  { name: "Wyoming", abbr: "WY", cities: ["Cheyenne"] },
]

// "Atlanta, GA", "New York, NY", ... used for search suggestions.
export const allCities: string[] = states.flatMap((s) =>
  s.cities.map((c) => `${c}, ${s.abbr}`),
)
