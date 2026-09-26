export type HousingType = "on-campus" | "off-campus";

export type Housing = {
  slug: string;
  name: string;
  type: HousingType;
  style: "Traditional dorm" | "Suite" | "Apartment" | "Rowhouse";
  address: string;
  walkMinutes: number;
  priceMin: number;
  priceMax: number;
  pricePeriod: "semester" | "month";
  roomTypes: string[];
  amenities: string[];
  bestFor: string;
  description: string;
  freshmen: boolean;
  gradient: string;
};

// Prices are rough estimates for demo purposes. Always confirm with
// Temple University Housing & Residential Life or the property manager.
export const housing: Housing[] = [
  {
    slug: "morgan-hall",
    name: "Morgan Hall",
    type: "on-campus",
    style: "Suite",
    address: "1601 N Broad St",
    walkMinutes: 3,
    priceMin: 5900,
    priceMax: 6900,
    pricePeriod: "semester",
    roomTypes: ["2-bed suite", "4-bed suite", "Studio"],
    amenities: ["A/C", "Private bathroom in suite", "Dining hall on site", "Skyline views", "24/7 security desk"],
    bestFor: "Students who want modern suites right on Broad Street",
    description:
      "Temple's tallest residence hall, split into North and South towers. Suites come with a shared bathroom and some have full kitchens. The dining hall and retail on the ground floor mean you rarely have to go far.",
    freshmen: true,
    gradient: "from-rose-700 to-red-900",
  },
  {
    slug: "1300-residence-hall",
    name: "1300 Residence Hall",
    type: "on-campus",
    style: "Suite",
    address: "1300 Cecil B. Moore Ave",
    walkMinutes: 4,
    priceMin: 5400,
    priceMax: 6200,
    pricePeriod: "semester",
    roomTypes: ["2-bed suite", "4-bed suite"],
    amenities: ["A/C", "Suite bathroom", "Lounges on every floor", "Laundry in building", "24/7 security desk"],
    bestFor: "First-years who want a social building with suite-style living",
    description:
      "A popular first-year building in the heart of campus. Suites share a bathroom between two rooms, and the floor lounges make it easy to meet people during the first weeks of school.",
    freshmen: true,
    gradient: "from-red-800 to-rose-950",
  },
  {
    slug: "johnson-hardwick",
    name: "Johnson & Hardwick Halls",
    type: "on-campus",
    style: "Traditional dorm",
    address: "2031 N Broad St",
    walkMinutes: 6,
    priceMin: 4500,
    priceMax: 5200,
    pricePeriod: "semester",
    roomTypes: ["Double", "Triple"],
    amenities: ["Community bathrooms", "Dining hall (J&H)", "Laundry in building", "Study lounges"],
    bestFor: "Budget-minded first-years who want the classic dorm experience",
    description:
      "Twin traditional-style halls with communal bathrooms and the well-known J&H dining hall downstairs. Rooms are smaller and older, but it's one of the cheapest on-campus options and a great place to make friends.",
    freshmen: true,
    gradient: "from-stone-600 to-stone-900",
  },
  {
    slug: "white-hall",
    name: "James S. White Hall",
    type: "on-campus",
    style: "Traditional dorm",
    address: "1901 N 13th St",
    walkMinutes: 5,
    priceMin: 4700,
    priceMax: 5400,
    pricePeriod: "semester",
    roomTypes: ["Double", "Single (limited)"],
    amenities: ["A/C", "Semi-private bathrooms", "Laundry in building", "Bike storage"],
    bestFor: "First-years who want a quieter, more affordable building",
    description:
      "A mid-sized, low-key residence hall close to the Liacouras Center. Rooms are simple but air-conditioned and it's known as a calmer option compared to the bigger towers.",
    freshmen: true,
    gradient: "from-red-700 to-orange-900",
  },
  {
    slug: "temple-towers",
    name: "Temple Towers",
    type: "on-campus",
    style: "Apartment",
    address: "1415 N Broad St",
    walkMinutes: 8,
    priceMin: 5600,
    priceMax: 6600,
    pricePeriod: "semester",
    roomTypes: ["2-bed apartment", "4-bed apartment"],
    amenities: ["Full kitchen", "Living room", "A/C", "Laundry in building", "24/7 security desk"],
    bestFor: "Upperclassmen who want apartment living with on-campus support",
    description:
      "Apartment-style housing on the south end of campus for sophomores and above. Each unit has a full kitchen and living room, so it's a good step between dorm life and renting off campus.",
    freshmen: false,
    gradient: "from-rose-800 to-pink-950",
  },
  {
    slug: "1940-residence-hall",
    name: "1940 Residence Hall",
    type: "on-campus",
    style: "Traditional dorm",
    address: "1940 N 13th St",
    walkMinutes: 5,
    priceMin: 4800,
    priceMax: 5500,
    pricePeriod: "semester",
    roomTypes: ["Double", "Triple"],
    amenities: ["A/C", "Community bathrooms", "Study lounges", "Laundry in building"],
    bestFor: "Students who want a central location at a middle-of-the-road price",
    description:
      "A traditional hall on 13th Street, a short walk from the Bell Tower and main classroom buildings. Expect standard doubles, shared floor bathrooms and a friendly floor community.",
    freshmen: true,
    gradient: "from-red-900 to-stone-900",
  },
  {
    slug: "the-edge",
    name: "The Edge at Avenue North",
    type: "off-campus",
    style: "Apartment",
    address: "1601 N 15th St",
    walkMinutes: 5,
    priceMin: 1150,
    priceMax: 1450,
    pricePeriod: "month",
    roomTypes: ["2-bed", "3-bed", "4-bed"],
    amenities: ["Furnished", "Gym", "In-unit laundry", "Movie theater", "Utilities included"],
    bestFor: "Students who want off-campus perks while staying next to campus",
    description:
      "A large, furnished student apartment complex just off Broad Street with a gym, study rooms and a shopping plaza (with a grocery store) right next door. You sign an individual lease by the bedroom.",
    freshmen: true,
    gradient: "from-slate-700 to-slate-900",
  },
  {
    slug: "vantage",
    name: "Vantage Philadelphia",
    type: "off-campus",
    style: "Apartment",
    address: "1920 N 15th St",
    walkMinutes: 6,
    priceMin: 1100,
    priceMax: 1400,
    pricePeriod: "month",
    roomTypes: ["Studio", "2-bed", "4-bed"],
    amenities: ["Furnished", "Rooftop lounge", "Gym", "In-unit laundry", "Package lockers"],
    bestFor: "Upperclassmen who want newer finishes and amenities",
    description:
      "A newer mid-rise with modern apartments, a rooftop deck and plenty of study space. Popular with sophomores and juniors moving off campus for the first time.",
    freshmen: false,
    gradient: "from-zinc-700 to-neutral-900",
  },
  {
    slug: "oxford-village",
    name: "Oxford Village",
    type: "off-campus",
    style: "Apartment",
    address: "2000 N 16th St",
    walkMinutes: 9,
    priceMin: 850,
    priceMax: 1100,
    pricePeriod: "month",
    roomTypes: ["2-bed", "3-bed", "4-bed"],
    amenities: ["Furnished options", "Free parking", "Courtyard", "Laundry on site"],
    bestFor: "Students who want more space for less money",
    description:
      "Townhouse-style apartments a little farther west of campus. Units tend to be bigger and cheaper than the high-rises, and it's one of the few places with free parking.",
    freshmen: false,
    gradient: "from-emerald-800 to-teal-950",
  },
  {
    slug: "university-village",
    name: "University Village",
    type: "off-campus",
    style: "Apartment",
    address: "1719 N 17th St",
    walkMinutes: 10,
    priceMin: 900,
    priceMax: 1200,
    pricePeriod: "month",
    roomTypes: ["2-bed", "3-bed", "4-bed"],
    amenities: ["Furnished", "Gym", "Study rooms", "Utilities included (capped)"],
    bestFor: "Students on a budget who still want a managed building",
    description:
      "An older but well-located complex with furnished units and individual leases. Management is responsive, and the price is a step below the newer towers.",
    freshmen: false,
    gradient: "from-indigo-800 to-slate-950",
  },
  {
    slug: "north-philly-rowhouses",
    name: "Rowhouse Shares (Norris / Diamond area)",
    type: "off-campus",
    style: "Rowhouse",
    address: "Various, N 16th–N 19th St",
    walkMinutes: 10,
    priceMin: 600,
    priceMax: 900,
    pricePeriod: "month",
    roomTypes: ["Room in a 3–6 bedroom house"],
    amenities: ["Private landlord", "Backyards (some)", "Basement laundry (some)"],
    bestFor: "Groups of friends who want the cheapest rent and more independence",
    description:
      "Renting a room in a shared rowhouse is the most affordable way to live near Temple. Quality varies a lot by landlord, so reading reviews and touring in person really matters here.",
    freshmen: false,
    gradient: "from-amber-700 to-orange-950",
  },
];

export function getHousing(slug: string) {
  return housing.find((h) => h.slug === slug);
}

export function formatPrice(h: Housing) {
  const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;
  return `${fmt(h.priceMin)}–${fmt(h.priceMax)}`;
}

// Normalizes semester prices (≈4.5 months) to a monthly figure so on- and
// off-campus options can be compared side by side.
export function monthlyEstimate(h: Housing) {
  const avg = (h.priceMin + h.priceMax) / 2;
  return Math.round(h.pricePeriod === "semester" ? avg / 4.5 : avg);
}
