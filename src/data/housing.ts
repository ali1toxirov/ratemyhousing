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
  /** Set when the range is not a per-student or per-bedroom price. */
  priceBasis?: string;
  roomTypes: string[];
  amenities: string[];
  bestFor: string;
  description: string;
  /** A short leasing tip shown on the listing. */
  tip?: string;
  freshmen: boolean;
  gradient: string;
  /** Where to apply or start a lease. Omitted when there is no public site. */
  website?: { url: string; label: string };
  /** Freely licensed photo. Omitted when none is available. */
  image?: { src: string; alt: string; credit: string; creditHref: string };
  parking: { summary: string; detail: string };
  /** Overrides the shared on-campus or off-campus guest policy. */
  guests?: { summary: string; detail: string };
};

// University Housing applies the same guest rules in every residence hall.
// Hours and overnight limits are from UHRL's guest policy and the 2026–27 housing license.
const campusGuests = {
  summary: "1 overnight guest",
  detail:
    "You can host up to 3 guests at a time from 7 a.m. to 3 a.m., and only 1 of them can stay overnight. A guest can stay 2 nights in a row, and no more than 3 nights in 7 days. You need your roommate's permission, you register the guest in MyHousing, and you escort them. Guests under 18 can visit from 8 a.m. to 10 p.m. and cannot stay overnight. Temple can take guest privileges away.",
};

const apartmentGuests = {
  summary: "Set by the lease",
  detail:
    "This is a private apartment, so Temple's residence-hall guest desk rules do not apply. How many guests you can have, and whether they can stay overnight, is in your lease and up to your roommates. Ask the leasing office before you count on overnight guests.",
};

// On-campus rooms do not include a spot. Overnight permits are sold by Temple Parking Services.
const campusParking = {
  summary: "Paid · $426/semester",
  detail:
    "A room does not include a parking spot. Students who bring a car buy an overnight permit for $426 per semester. Those permits work at the Montgomery, Liacouras, and Bell garages, plus the Temple Towers and Tyler lots.",
};

// On-campus prices are Temple's published 2026–27 semester rates.
// Apartment prices are current advertised rents from each property or Temple's
// off-campus listing. Rents change, so confirm before signing.
export const housing: Housing[] = [
  {
    slug: "morgan-hall",
    name: "Morgan Hall",
    type: "on-campus",
    style: "Apartment",
    address: "1601 N Broad St",
    walkMinutes: 3,
    priceMin: 7270,
    priceMax: 8715,
    pricePeriod: "semester",
    roomTypes: ["1-bedroom, single or double", "2-bedroom double", "3-bedroom, single or double"],
    amenities: ["A/C", "Full kitchen", "Private bathroom", "Dining hall on site", "Laundry in building", "Skyline views"],
    bestFor: "Students who want an on-campus apartment on Broad Street",
    description:
      "A three-building complex for first-years through seniors. Morgan North (1601 N Broad) is 27 stories and Morgan South (1603 N Broad) is 10. Every unit is a 1-, 2-, or 3-bedroom apartment with its own bathroom and a full kitchen. A bedroom is not always one person. Temple prices a 2-bedroom as a double, and a 3-bedroom in three layouts: a Single A, a Double B, and a Double C, so one apartment can mix a private bedroom with a shared one. A 1-bedroom can be a single or a double. Temple describes the towers as having skyline views, and the dining hall is in the complex. Resident Assistants still live here, and a Resident Director runs each tower. A kitchen does not make this a private apartment. First-years and transfers must buy at least 12 meals a week. Returning students can skip the meal plan and cook. 2026–27 semester rates run from $7,270 to $8,715.",
    freshmen: true,
    website: { url: "https://studentaffairs.temple.edu/housing", label: "Apply for housing" },
    image: {
      src: "/housing/morgan-hall.jpg",
      alt: "Morgan Hall North and Morgan Hall South on Temple's Main Campus",
      credit: "ImagineerJC, CC0, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:Morgan_Hall_North_from_Morgan_Hall_South_in_2016.jpg",
    },
    parking: campusParking,
    gradient: "from-rose-700 to-red-900",
  },
  {
    slug: "1300-residence-hall",
    name: "1300 Residence Hall",
    type: "on-campus",
    style: "Suite",
    address: "1300 Cecil B. Moore Ave",
    walkMinutes: 4,
    priceMin: 6041,
    priceMax: 7978,
    pricePeriod: "semester",
    roomTypes: ["Double suite", "Studio", "Apartment", "Single", "Quad"],
    amenities: ["A/C", "Private bathroom", "Kitchens on floors 4–5", "Laundry in building", "Study lounges"],
    bestFor: "First-years who want suite living, or returning students who want a kitchen",
    description:
      "A 5-story hall for about 1,050 students, from first-year through senior. Floors 1–3 are suites and studios without kitchens. Floors 4 and 5 are apartments with full kitchens and are usually taken by returning students. Every unit has its own bathroom, and there is a community kitchen on the ground floor. Resident Assistants live in the building. New students on the suite floors have nowhere to cook a real meal, so they must buy at least 12 meals a week. Returning students upstairs are not required to. 2026–27 semester rates run from $6,041 to $7,978.",
    freshmen: true,
    website: { url: "https://studentaffairs.temple.edu/housing", label: "Apply for housing" },
    parking: campusParking,
    gradient: "from-red-800 to-rose-950",
  },
  {
    slug: "johnson-hardwick",
    name: "Johnson & Hardwick Halls",
    type: "on-campus",
    style: "Traditional dorm",
    address: "2029 N Broad St",
    walkMinutes: 6,
    priceMin: 5158,
    priceMax: 5726,
    pricePeriod: "semester",
    roomTypes: ["Double", "Quad", "4-person, 2-bedroom"],
    amenities: ["A/C", "Community bathrooms", "Esposito Dining Hall", "Laundry in building", "Floor lounges"],
    bestFor: "First-years who want a traditional hall at the lowest on-campus rate",
    description:
      "Twin 11-story halls aimed at first-years, about 465 students each. Bathrooms are shared by the floor and cleaned daily. Bedrooms have heat and air conditioning, and there is no kitchen in the room. Resident Assistants live on the floors. They are who you find for a lockout, a roommate problem, or someone on duty at night. Because you cannot cook in the room, new students must take at least 12 meals a week, and most of them eat downstairs at the Luis J. Esposito Dining Hall. 2026–27 semester rates are $5,158 for a double and $5,726 for a single.",
    freshmen: true,
    website: { url: "https://studentaffairs.temple.edu/housing", label: "Apply for housing" },
    parking: campusParking,
    gradient: "from-stone-600 to-stone-900",
  },
  {
    slug: "white-hall",
    name: "James S. White Hall",
    type: "on-campus",
    style: "Suite",
    address: "2108 N Broad St",
    walkMinutes: 8,
    priceMin: 5958,
    priceMax: 5958,
    pricePeriod: "semester",
    roomTypes: ["2-person studio", "4-person, 2-bedroom suite"],
    amenities: ["A/C", "Suite bathroom", "Laundry in building", "Bike storage", "Community kitchen"],
    bestFor: "First-years who want a suite with their own bathroom",
    description:
      "A 4-story suite hall for about 570 first-year students. You share a studio with one roommate or a 2-bedroom suite with three, and every suite has its own bathroom. There are no singles. A community kitchen on the first floor is for snacks, not a replacement for a dining plan. Resident Assistants live in the hall, and every resident is a new student, so at least 12 meals a week is required. The 2026–27 double rate is $5,958 per semester.",
    freshmen: true,
    website: { url: "https://studentaffairs.temple.edu/housing", label: "Apply for housing" },
    parking: campusParking,
    gradient: "from-red-700 to-orange-900",
  },
  {
    slug: "temple-towers",
    name: "Temple Towers",
    type: "on-campus",
    style: "Apartment",
    address: "1200 Cecil B. Moore Ave",
    walkMinutes: 8,
    priceMin: 6556,
    priceMax: 8475,
    pricePeriod: "semester",
    roomTypes: ["Double", "Large double", "Double with its own bath", "Single", "Single in a 2-bedroom", "3- and 4-bedroom apartments"],
    amenities: ["Full kitchen", "Bathroom in the apartment", "A/C", "Laundry in building", "Study lounges"],
    bestFor: "Students who want an on-campus apartment with a kitchen",
    description:
      "A 6-story apartment hall for about 658 students, from first-year through senior. Units are 1- to 4-bedroom apartments with a full kitchen and at least one bathroom. The bedroom itself comes in different layouts: a double, a large double, a double with its own bathroom, a single, or a single in a 2-bedroom apartment. A group of 6 or 7 can fill one apartment, because some bedrooms are shared. Temple Towers East is 1200 Cecil B. Moore Ave and West is 1250. It feels like an apartment, but it is still University Housing: Resident Assistants live in the building and a Resident Director runs it. New students must buy at least 12 meals a week. Returning students can opt out and cook. 2026–27 semester rates run from $6,556 to $8,475.",
    freshmen: true,
    website: { url: "https://studentaffairs.temple.edu/housing", label: "Apply for housing" },
    parking: {
      summary: "Paid · $426/semester",
      detail:
        "The Temple Towers lot is one of Temple's overnight lots. A permit is still $426 per semester and is not included in the room rate.",
    },
    gradient: "from-rose-800 to-pink-950",
  },
  {
    slug: "1940-residence-hall",
    name: "1940 Residence Hall",
    type: "on-campus",
    style: "Suite",
    address: "1940 Liacouras Walk",
    walkMinutes: 5,
    priceMin: 6104,
    priceMax: 6104,
    pricePeriod: "semester",
    roomTypes: ["2-person, 1-bedroom suite", "4-person, 2-bedroom suite"],
    amenities: ["A/C", "Suite bathroom", "Laundry in building", "Study lounges", "Community kitchen"],
    bestFor: "First-years who want a suite on Liacouras Walk",
    description:
      "A 5-story suite hall for about 472 first-year students, sitting on Liacouras Walk, a short walk from the Bell Tower and the main classroom buildings. Suites are a 1-bedroom double or a 2-bedroom for four people, and each suite has its own bathroom. There are no singles. Resident Assistants live in the hall. The community kitchen on the ground floor is shared, and new students must buy at least 12 meals a week. The 2026–27 double rate is $6,104 per semester.",
    freshmen: true,
    website: { url: "https://studentaffairs.temple.edu/housing", label: "Apply for housing" },
    parking: campusParking,
    gradient: "from-red-900 to-stone-900",
  },
  {
    slug: "the-edge",
    name: "Avery Philly",
    type: "off-campus",
    style: "Apartment",
    address: "1601 N 15th St",
    walkMinutes: 5,
    priceMin: 949,
    priceMax: 1800,
    pricePeriod: "month",
    roomTypes: ["Studio", "2-bed / 2-bath, private rooms", "2-bed with a den or office"],
    amenities: ["Furnished", "Fitness center", "Laundry in building", "Community Wi-Fi"],
    bestFor: "Students who want a furnished apartment at Avenue North",
    description:
      "Formerly The Edge at Avenue North. Furnished studios and two-bedroom suites next to campus, leased by the person. Studios come in more than one size. The two-bedroom suites are 2-bed/2-bath, and some layouts add a den or an office. Every bedroom and bathroom is private, so you do not share a room. Listed rents are about $949–$1,800. The building has a fitness center, laundry, and community Wi-Fi. There are no Resident Assistants. Maintenance and roommate issues go to the leasing office, not a Temple staff member on your floor. Each unit has a place to cook, and a meal plan is optional.",
    freshmen: true,
    website: {
      url: "https://www.apartments.com/avery-philly-philadelphia-pa/1kd7cz7/",
      label: "See current rates",
    },
    parking: {
      summary: "Paid · ask the office",
      detail:
        "Avery Philly has offered on-site parking for a fee, and it is not included in rent. There is no current public price, so confirm a spot and the rate before you sign.",
    },
    gradient: "from-slate-700 to-slate-900",
  },
  {
    slug: "the-view-at-montgomery",
    name: "The View at Montgomery",
    type: "off-campus",
    style: "Apartment",
    address: "1100 W Montgomery Ave",
    walkMinutes: 4,
    priceMin: 849,
    priceMax: 2129,
    pricePeriod: "month",
    roomTypes: ["Studio", "2-bed / 1-bath, private", "2-bed / 2-bath, shared or private", "3-bed / 2-bath, shared or private", "4-bed / 2-bath"],
    amenities: ["Furnished", "Sky lounge", "24/7 fitness center", "Study rooms", "24-hour front desk"],
    bestFor: "Students who want a furnished high-rise steps from campus",
    tip: "Before you sign, check their website and call or text them. They sometimes have special offers, like a 10-month lease, that are not listed with the regular rent.",
    description:
      "A furnished high-rise at 1100 W Montgomery Ave, which the property describes as steps from campus. Floor plans are a studio, a 2-bed/1-bath, a 2-bed/2-bath, a 3-bed/2-bath, and a 4-bed/2-bath, leased by the bedroom. In the 2-bed/2-bath and the 3-bed/2-bath, a bedroom can be private or shared with one other person. A shared room in a 3-bedroom is advertised at $849; private rooms and studios run higher, up to about $2,129. The 2-bed/1-bath and the current 4-bed/2-bath listings are private bedrooms. Amenities include a 14th-floor sky lounge, a 24/7 fitness center, study rooms, and a 24-hour front desk. There are no Temple RAs. That front desk works for the apartment company. First Year Flock is the building's own program for freshmen, not a residence-hall floor. You cook in the apartment, and a meal plan is optional.",
    freshmen: true,
    website: { url: "https://www.theviewatmontgomery.com/floor-plans", label: "Start a lease" },
    parking: {
      summary: "Paid · about $169/month",
      detail:
        "Gated parking is available and not included in rent. A surface-lot spot is listed around $169 a month.",
    },
    gradient: "from-sky-800 to-indigo-950",
  },
  {
    slug: "vantage",
    name: "Vantage Philadelphia",
    type: "off-campus",
    style: "Apartment",
    address: "1717 N 12th St",
    walkMinutes: 6,
    priceMin: 929,
    priceMax: 2699,
    pricePeriod: "month",
    roomTypes: ["Studio", "1-bed / 1-bath", "2-bed / 1-bath", "2-bed / 2-bath, shared or private", "3-bed / 2-bath", "4-bed / 2-bath"],
    amenities: ["Furnished", "18th-floor sky lounge", "Fitness center", "Laundry on each floor", "Wi-Fi"],
    bestFor: "Students who want a furnished high-rise with utilities in the rent",
    description:
      "Furnished studios and 1- to 4-bedroom apartments at 1717 N 12th St, about a 6-minute walk to Main Campus. A 2-bedroom is either 1 bath or 2 baths, and the 2-bath plan has several layouts. Some of those 2-bed/2-bath units put two people in a bedroom, which is why rents start near $929. A private bedroom costs more. The 3-bedroom and 4-bedroom are both 2-bath apartments, and the rooms listed for them are private. Listed bedroom rents run about $929–$2,699. The property says rent includes gas, water, sewer, trash, and wireless internet, plus furniture. Laundry is on each floor, and there is a fitness center and a sky lounge on the 18th floor. There are no RAs. You sign with the property and send maintenance requests to them. A Temple meal plan is optional.",
    freshmen: true,
    website: { url: "https://www.pursuevantage.com/floor-plans", label: "Start a lease" },
    parking: {
      summary: "Paid · about $169/month",
      detail:
        "A surface-lot spot is listed around $169 a month, and other options run closer to $199. Parking is not included in rent.",
    },
    gradient: "from-zinc-700 to-neutral-900",
  },
  {
    slug: "oxford-village",
    name: "Oxford Village",
    type: "off-campus",
    style: "Apartment",
    address: "1612 N 15th St",
    walkMinutes: 5,
    priceMin: 1225,
    priceMax: 1815,
    pricePeriod: "month",
    priceBasis: "whole apartment",
    roomTypes: ["1-bed", "2-bed", "3-bed"],
    amenities: ["Furnished options", "Gated parking ($100/mo)", "Fitness center", "Laundry rooms", "A/C"],
    bestFor: "Students who want a regular apartment within two blocks of campus",
    description:
      "Apartments at 1612 N 15th St, within two blocks of campus. These prices are for the whole apartment, not one bedroom: one-bedrooms start at $1,225, two-bedrooms at $1,425 (about $713 per person), and three-bedrooms at $1,815. Furnished and unfurnished units are available. Gated parking is $100 a month. The property lists water, sewer, trash, and Wi-Fi as included, and the FAQ also mentions possible monthly fees, so read the lease. There are no RAs. Roommates split one lease with the property, and a meal plan is optional.",
    freshmen: true,
    website: {
      url: "https://oxfordvillageapts.com/",
      label: "See current rates",
    },
    parking: {
      summary: "Paid · $100/month",
      detail: "Gated parking is $100 a month per space. It is not included in rent.",
    },
    gradient: "from-emerald-800 to-teal-950",
  },
  {
    slug: "university-village",
    name: "University Village",
    type: "off-campus",
    style: "Apartment",
    address: "1701 N 10th St",
    walkMinutes: 8,
    priceMin: 479,
    priceMax: 1494,
    pricePeriod: "month",
    roomTypes: ["1-bed / 1-bath", "2-bed / 1-bath, private rooms", "2-bed / 2-bath, four people", "2-bed / 2-bath, private rooms", "3-bed / 3-bath", "4-bed / 4-bath"],
    amenities: ["Furnished", "24-hour fitness center", "Academic Success Center", "Internet included", "Individual leases"],
    bestFor: "Students who want a furnished apartment with a lower per-bedroom rent",
    description:
      "Furnished apartments at 1701 N 10th St, about an 8-minute walk to Main Campus. The 2-bedroom is three layouts. A 2-bed/1-bath is two private bedrooms. A 2-bed/2-bath can hold four people, two per bedroom, at $479 each, or two people with a private bedroom at about $979. The 3-bedroom is a 3-bed/3-bath with one person per room. The 4-bedroom is a 4-bed/4-bath, so each person has a bedroom and a bathroom. Listed rents run from $479 a bedroom up to $1,494 for a 1-bedroom. Leases are individual. The building has a 24-hour fitness center and an Academic Success Center. Internet, recycling, and trash are included; other utilities are not listed as included. There are no RAs. Each person signs with the property, and a meal plan is optional.",
    freshmen: true,
    website: {
      url: "https://portal.tkclients.com/application?lease_type=NEW_LEASE_APPLICATION&prop_code=380",
      label: "Start a lease",
    },
    parking: {
      summary: "Paid · limited spots",
      detail:
        "University Village has assigned parking and charges for it separately from rent. The current price is not listed publicly, so confirm it with the leasing office.",
    },
    gradient: "from-indigo-800 to-slate-950",
  },
  {
    slug: "temple-crossing",
    name: "Temple Crossing",
    type: "off-campus",
    style: "Apartment",
    address: "1000 Diamond St",
    walkMinutes: 8,
    priceMin: 675,
    priceMax: 800,
    pricePeriod: "month",
    roomTypes: ["2-bed, private or shared", "4-bed, private or shared"],
    amenities: ["Furnished", "Smart locks", "Fitness center", "Study rooms", "Movie theater", "Laundry on site"],
    bestFor: "Students who want a furnished apartment about 8 minutes from campus",
    description:
      "Furnished 2- and 4-bedroom apartments at 1000 Diamond St, an 8-minute walk to Main Campus. In both sizes, the bedroom you lease can be private or shared with another student. You can bring your own roommates or use the building's matching. Current per-bedroom listings run about $675–$800, and the property site advertises 2026–27 rents starting at $760. The building has smart locks, a fitness center, study rooms, a movie theater, and laundry. Water, internet, and trash are typically included. There are no RAs. You lease a bedroom from the property and cook in the apartment. The building does not sell a meal plan.",
    freshmen: true,
    website: { url: "https://www.templecrossing.com/", label: "Start a lease" },
    parking: {
      summary: "Not listed with rent",
      detail: "Current listings do not say whether Temple Crossing includes a parking spot or what it costs. Ask the office before you count on a car.",
    },
    gradient: "from-violet-800 to-purple-950",
  },
  {
    slug: "kardon-atlantic",
    name: "Kardon Atlantic",
    type: "off-campus",
    style: "Apartment",
    address: "1801 N 10th St",
    walkMinutes: 8,
    priceMin: 800,
    priceMax: 900,
    pricePeriod: "month",
    roomTypes: ["1-bed", "2-bed", "3-bed", "4-bed", "5-bed"],
    amenities: ["A/C", "Fitness center", "Laundry rooms", "24/7 front desk", "Study areas"],
    bestFor: "Students who want a 2- to 5-bedroom apartment near the train station",
    description:
      "More than 240 apartments at 1801 N 10th St, about three blocks from campus and next to the Temple University train station. Floor plans run from 1 to 5 bedrooms. Currently advertised rents are $820–$860 for a 2-bedroom, $825–$850 for a 4-bedroom, and $800–$900 for a 5-bedroom; 1- and 3-bedrooms were sold out on the site. Furniture is optional and extra. Sewage and trash are included; water and electric are billed separately. There is a fitness center, laundry, and a 24/7 front desk. There are no Temple RAs. That desk works for the landlord. A meal plan is optional.",
    freshmen: true,
    website: { url: "https://kardon-atlantic.com/apartments/", label: "Start a lease" },
    parking: {
      summary: "Not listed with rent",
      detail: "Current listings do not include a parking spot with the apartment. Ask the office before you count on a car.",
    },
    gradient: "from-cyan-800 to-slate-950",
  },
  {
    slug: "beech-international",
    name: "Beech International Village",
    type: "off-campus",
    style: "Apartment",
    address: "1520 Cecil B. Moore Ave",
    walkMinutes: 8,
    priceMin: 725,
    priceMax: 1350,
    pricePeriod: "month",
    roomTypes: ["1-bed", "2-bed"],
    amenities: ["Furnished", "Utilities included", "A/C", "Laundry on site"],
    bestFor: "Students who want utilities bundled in a building next to campus",
    description:
      "Furnished 1- and 2-bedroom apartments at 1520 Cecil B. Moore Ave. The property describes it as one block from campus; Temple's listing puts Main Campus at about an 8-minute walk. Listed rents are $1,350 for a 1-bedroom and $725–$1,350 per bedroom for a 2-bedroom. A one-time utility payment covers water, electricity, internet, cable, trash, and sewer. Laundry is in the building. There are no RAs. You rent from the property, and a meal plan is optional.",
    freshmen: true,
    website: {
      url: "https://offcampus.temple.edu/housing/property/beech-international/ocp11z2vr4",
      label: "Start a lease",
    },
    parking: {
      summary: "Not listed with rent",
      detail: "Current listings do not say whether Beech International Village includes a parking spot or what it costs. Ask the office before you count on a car.",
    },
    gradient: "from-teal-800 to-emerald-950",
  },
  {
    slug: "university-apartments",
    name: "University Apartments",
    type: "off-campus",
    style: "Apartment",
    address: "1500 N 15th St",
    walkMinutes: 11,
    priceMin: 795,
    priceMax: 1295,
    pricePeriod: "month",
    roomTypes: ["1-bed", "2-bed"],
    amenities: ["In-unit washer and dryer", "Private bathroom per bedroom", "A/C", "Fitness room"],
    bestFor: "Roommates who want a washer and dryer in the apartment",
    description:
      "1- and 2-bedroom apartments at 1500 N 15th St, about an 11-minute walk to Main Campus. Each apartment has a washer and dryer and a private bathroom in each bedroom. Listed rents are $1,195–$1,295 for a 1-bedroom and $795–$900 per bedroom for a 2-bedroom. Assigned parking is $100 a month. There are no RAs. You lease from the property and cook at home, so a meal plan is optional.",
    freshmen: true,
    website: {
      url: "https://offcampus.temple.edu/housing/property/university-apartments/ocpmtblt9k",
      label: "Start a lease",
    },
    parking: {
      summary: "Paid · $100/month",
      detail: "Assigned parking is $100 a month and is not included in the rent.",
    },
    gradient: "from-orange-800 to-rose-950",
  },
];

export function getHousing(slug: string) {
  return housing.find((h) => h.slug === slug);
}

export function guestPolicy(h: Housing) {
  return h.guests ?? (h.type === "on-campus" ? campusGuests : apartmentGuests);
}

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export function formatPrice(h: Housing) {
  if (h.priceMin === h.priceMax) return money(h.priceMin);
  return `${money(h.priceMin)}–${money(h.priceMax)}`;
}

// New students in any on-campus unit must buy at least 12 meals a week.
// Plan C is $2,389 per semester for 2026–27.
// https://studentaffairs.temple.edu/housing/campus-living/dining/dining-plans
export const requiredMealPlan = {
  mealsPerWeek: 12,
  semester: 2389,
};

export function mealPlanRequired(h: Housing) {
  return h.type === "on-campus";
}

/** Room rate plus the required 12-meal plan. Null where a meal plan is optional. */
export function formatWithRequiredMealPlan(h: Housing) {
  if (!mealPlanRequired(h)) return null;
  const min = h.priceMin + requiredMealPlan.semester;
  const max = h.priceMax + requiredMealPlan.semester;
  if (min === max) return money(min);
  return `${money(min)}–${money(max)}`;
}

// Normalizes semester prices (≈4.5 months) to a monthly figure so on- and
// off-campus options can be compared side by side.
export function monthlyEstimate(h: Housing) {
  const avg = (h.priceMin + h.priceMax) / 2;
  return Math.round(h.pricePeriod === "semester" ? avg / 4.5 : avg);
}

function scrubNegatives(text: string) {
  return text.replace(/\b(no|not|without)\s+[\w’'-]+/gi, " ");
}

/** Everything a student might type when looking for a place or a detail. */
export function housingSearchText(h: Housing) {
  const guests = guestPolicy(h);
  const text = scrubNegatives(
    [
      h.name,
      h.address,
      h.style,
      h.type === "on-campus" ? "on campus residence hall dorm" : "off campus apartment",
      h.bestFor,
      h.description,
      h.tip,
      h.roomTypes.join(" "),
      h.amenities.join(" "),
      h.parking.summary,
      h.parking.detail,
      guests.summary,
      guests.detail,
      h.priceBasis,
      h.freshmen ? "freshman first-year freshman-friendly" : "returning students",
      mealPlanRequired(h) ? "meal plan required 12 meals a week" : "",
    ]
      .filter(Boolean)
      .join(" "),
  ).toLowerCase();

  return text.includes("fitness") ? `${text} gym` : text;
}

export function matchesHousingQuery(h: Housing, query: string) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const text = housingSearchText(h);
  return words.every((word) => text.includes(word));
}
