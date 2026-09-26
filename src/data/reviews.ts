export type CategoryRatings = {
  cleanliness: number;
  location: number;
  value: number;
  management: number;
  quiet: number;
};

export type Review = {
  id: string;
  housingSlug: string;
  author: string;
  year: string;
  date: string;
  overall: number;
  ratings: CategoryRatings;
  title: string;
  body: string;
  wouldRecommend: boolean;
  helpful: number;
};

export const categoryLabels: Record<keyof CategoryRatings, string> = {
  cleanliness: "Cleanliness",
  location: "Location",
  value: "Value for money",
  management: "Staff / management",
  quiet: "Quietness",
};

export const seedReviews: Review[] = [
  {
    id: "r1",
    housingSlug: "morgan-hall",
    author: "Maya R.",
    year: "Sophomore · Nursing",
    date: "2026-05-02",
    overall: 5,
    ratings: { cleanliness: 5, location: 5, value: 3, management: 4, quiet: 4 },
    title: "Worth it for the view and the location",
    body: "My suite on the 20th floor had an incredible view of the city. Dining hall downstairs is a lifesaver in winter. Elevators get backed up around 9:50am, so leave early for class.",
    wouldRecommend: true,
    helpful: 24,
  },
  {
    id: "r2",
    housingSlug: "morgan-hall",
    author: "Anonymous",
    year: "Freshman · Undeclared",
    date: "2026-04-18",
    overall: 4,
    ratings: { cleanliness: 4, location: 5, value: 3, management: 4, quiet: 3 },
    title: "Great building, pricey",
    body: "Everything is modern and the security desk makes you feel safe. It's one of the more expensive options though, and the fire alarm went off at 3am twice.",
    wouldRecommend: true,
    helpful: 11,
  },
  {
    id: "r3",
    housingSlug: "1300-residence-hall",
    author: "Jordan T.",
    year: "Freshman · Business",
    date: "2026-05-10",
    overall: 4,
    ratings: { cleanliness: 4, location: 5, value: 4, management: 4, quiet: 2 },
    title: "The most social dorm on campus",
    body: "If you want to meet people, pick 1300. Everyone keeps their doors open the first month. It can get loud on weekends, so bring earplugs.",
    wouldRecommend: true,
    helpful: 19,
  },
  {
    id: "r4",
    housingSlug: "johnson-hardwick",
    author: "Chris P.",
    year: "Freshman · Engineering",
    date: "2026-03-29",
    overall: 3,
    ratings: { cleanliness: 2, location: 4, value: 5, management: 3, quiet: 3 },
    title: "Classic dorm experience, old building",
    body: "Community bathrooms are cleaned daily but get messy by the evening. No A/C in some rooms made August rough. But it's cheap and I made my best friends here.",
    wouldRecommend: true,
    helpful: 15,
  },
  {
    id: "r5",
    housingSlug: "johnson-hardwick",
    author: "Anonymous",
    year: "Freshman · Media Studies",
    date: "2026-02-12",
    overall: 2,
    ratings: { cleanliness: 2, location: 3, value: 4, management: 2, quiet: 2 },
    title: "Bring a fan and shower shoes",
    body: "The heat in September was brutal and maintenance took a week to fix our window. The dining hall is convenient though.",
    wouldRecommend: false,
    helpful: 8,
  },
  {
    id: "r6",
    housingSlug: "white-hall",
    author: "Priya S.",
    year: "Freshman · Biology",
    date: "2026-04-30",
    overall: 4,
    ratings: { cleanliness: 4, location: 4, value: 4, management: 4, quiet: 5 },
    title: "Quiet and affordable",
    body: "Perfect if you actually want to study in your room. RAs were super helpful. It's a bit of a walk to the gym but otherwise great.",
    wouldRecommend: true,
    helpful: 9,
  },
  {
    id: "r7",
    housingSlug: "temple-towers",
    author: "Devon M.",
    year: "Junior · Computer Science",
    date: "2026-05-05",
    overall: 4,
    ratings: { cleanliness: 4, location: 3, value: 4, management: 4, quiet: 4 },
    title: "Having a kitchen changed everything",
    body: "Cooking my own food saved a lot on meal plans. It's on the south end of campus so the walk to the Science Education and Research Center is long.",
    wouldRecommend: true,
    helpful: 12,
  },
  {
    id: "r8",
    housingSlug: "1940-residence-hall",
    author: "Anonymous",
    year: "Freshman · Psychology",
    date: "2026-03-14",
    overall: 3,
    ratings: { cleanliness: 3, location: 5, value: 3, management: 3, quiet: 3 },
    title: "Fine, nothing special",
    body: "Location is the best part: two minutes to the Bell Tower. Rooms are small and the laundry machines are often full on Sundays.",
    wouldRecommend: true,
    helpful: 4,
  },
  {
    id: "r9",
    housingSlug: "the-edge",
    author: "Alexis K.",
    year: "Sophomore · Marketing",
    date: "2026-05-15",
    overall: 4,
    ratings: { cleanliness: 4, location: 5, value: 3, management: 3, quiet: 4 },
    title: "Super convenient, watch your lease",
    body: "Having the grocery store and a gym downstairs is amazing. Read your lease carefully, since there were extra fees for amenities and parking I didn't expect.",
    wouldRecommend: true,
    helpful: 21,
  },
  {
    id: "r10",
    housingSlug: "vantage",
    author: "Sam W.",
    year: "Junior · Architecture",
    date: "2026-04-02",
    overall: 5,
    ratings: { cleanliness: 5, location: 4, value: 4, management: 5, quiet: 4 },
    title: "Best management I've had",
    body: "Maintenance requests get handled within a day. The rooftop is a great place to study when it's nice out. Units are newer and actually feel like apartments.",
    wouldRecommend: true,
    helpful: 13,
  },
  {
    id: "r11",
    housingSlug: "oxford-village",
    author: "Luis G.",
    year: "Senior · Finance",
    date: "2026-01-20",
    overall: 4,
    ratings: { cleanliness: 3, location: 3, value: 5, management: 4, quiet: 5 },
    title: "Lots of space for the price",
    body: "I pay way less than my friends in the towers and have a bigger room. Having a car spot for free is huge. It's a longer walk though.",
    wouldRecommend: true,
    helpful: 10,
  },
  {
    id: "r12",
    housingSlug: "university-village",
    author: "Anonymous",
    year: "Sophomore · Kinesiology",
    date: "2026-02-28",
    overall: 3,
    ratings: { cleanliness: 3, location: 4, value: 4, management: 3, quiet: 3 },
    title: "Decent middle option",
    body: "Older furniture but it does the job. Utilities are capped so we paid overages in the winter. Staff are friendly.",
    wouldRecommend: true,
    helpful: 5,
  },
  {
    id: "r13",
    housingSlug: "north-philly-rowhouses",
    author: "Taylor B.",
    year: "Junior · Journalism",
    date: "2026-04-11",
    overall: 3,
    ratings: { cleanliness: 3, location: 4, value: 5, management: 2, quiet: 3 },
    title: "Cheapest rent, landlord luck matters",
    body: "Living with 4 friends in a rowhouse is the most fun I've had at Temple. Our landlord was slow on repairs though. Take photos at move-in and get everything in writing.",
    wouldRecommend: true,
    helpful: 27,
  },
];
