/** Owner-supplied client briefs. Audiences are planning profiles, NOT verified demographics. */
export const industryFilters = [
  {
    "id": "all",
    "label": "All Industries"
  },
  {
    "id": "beauty",
    "label": "Beauty & Wellness"
  },
  {
    "id": "education",
    "label": "Education"
  },
  {
    "id": "b2b",
    "label": "B2B Services"
  },
  {
    "id": "consumer",
    "label": "Consumer Products"
  },
  {
    "id": "food",
    "label": "Food & Restaurants"
  }
] as const;
export const socialClients = {
  "jp-beauty-studio": {
    "name": "J&P Beauty Studio",
    "industry": "Beauty & Wellness",
    "location": "Acworth, Georgia, USA",
    "website": "https://j-pbeautystudio.com/",
    "sector": "beauty",
    "collection": "core",
    "audience": "Women approximately 20–55 seeking waxing, threading, lashes, skincare and personal care.",
    "focus": "Treatment-focused beauty storytelling",
    "initials": "J&P",
    "accent": "#92083f",
    "wash": "#f7e9ef"
  },
  "zoya-beauty-hub": {
    "name": "Zoya Beauty Hub",
    "industry": "Beauty & Wellness",
    "location": "United States (city unconfirmed)",
    "website": "https://zoyabeautyhub.com/",
    "sector": "beauty",
    "collection": "core",
    "audience": "Women approximately 18–45 interested in skincare, threading, waxing and henna.",
    "focus": "Salon services and accessible beauty storytelling",
    "initials": "ZB",
    "accent": "#b65b83",
    "wash": "#f8edf2"
  },
  "webbridge-global-institute": {
    "name": "WebBridge Global Institute",
    "industry": "Education",
    "location": "Pakistan",
    "website": "https://webbridgeglobalinstitute.com/",
    "sector": "education",
    "collection": "core",
    "audience": "Students, graduates and early-career professionals approximately 17–35 exploring design, development, freelancing and AI/ML.",
    "focus": "Technology education and career-building creatives",
    "initials": "WGI",
    "accent": "#db843d",
    "wash": "#fff0e4"
  },
  "webcraft-consulting": {
    "name": "WebCraft Consulting",
    "industry": "B2B Services",
    "location": "Fishkill, New York, USA",
    "website": "https://webcraftcons.com/",
    "sector": "b2b",
    "collection": "core",
    "audience": "Entrepreneurs, retailers, restaurants, property professionals and business marketing teams, approximately 25–55.",
    "focus": "Print applications and business-service communications",
    "initials": "WC",
    "accent": "#3461a5",
    "wash": "#eaf1ff"
  },
  "breakout-buddies": {
    "name": "Breakout Buddies",
    "industry": "Consumer Products",
    "location": "United States market",
    "website": "https://breakoutbuddies.com/",
    "sector": "consumer",
    "collection": "core",
    "audience": "Teens and young adults approximately 15–30 who are interested in skincare and hydrocolloid patches.",
    "focus": "Youthful skincare product-use concepts",
    "initials": "BB",
    "accent": "#825dd5",
    "wash": "#f2ebff"
  },
  "cutwoods": {
    "name": "CutWoods",
    "industry": "Consumer Products",
    "location": "United States market",
    "website": "https://cut-woods.com/",
    "sector": "consumer",
    "collection": "core",
    "audience": "Adult DIY enthusiasts, crafters, gardeners, sewers and light-workshop users, approximately 20–55.",
    "focus": "Practical precision-tool product creatives",
    "initials": "CW",
    "accent": "#407e68",
    "wash": "#e7f4ee"
  },
  "perfect-beauty-saloon": {
    "name": "Perfect Beauty Saloon",
    "industry": "Beauty & Wellness",
    "location": "Parsippany, New Jersey, USA",
    "website": null,
    "sector": "beauty",
    "collection": "core",
    "audience": "Local women approximately 18–60 and male grooming clients seeking threading, waxing, facials and haircare.",
    "focus": "Salon treatment and service communications",
    "initials": "PB",
    "accent": "#b95284",
    "wash": "#fcecf2"
  },
  "halal-bros-fish-n-fries": {
    "name": "Halal Bros Fish N Fries",
    "industry": "Food & Restaurants",
    "location": "Fishkill, New York, USA",
    "website": "https://halalbrosfishkill.com/",
    "sector": "food",
    "collection": "additional",
    "audience": "Families, commuters and takeaway customers seeking halal meals.",
    "focus": "Craveable food and takeaway creative concepts",
    "initials": "HB",
    "accent": "#bc6b3c",
    "wash": "#faede5"
  },
  "star-pizza-and-pasta": {
    "name": "Star Pizza & Pasta",
    "industry": "Food & Restaurants",
    "location": "Roswell, Georgia, USA",
    "website": "https://starpizzapasta.com/",
    "sector": "food",
    "collection": "additional",
    "audience": "Families, pizza lovers, lunch customers and takeaway or delivery audiences.",
    "focus": "Food-first restaurant and occasion-led social designs",
    "initials": "SP",
    "accent": "#c65339",
    "wash": "#fff0e9"
  },
  "lombardis": {
    "name": "Lombardi's",
    "industry": "Food & Restaurants",
    "location": "Location unconfirmed",
    "website": null,
    "sector": "food",
    "collection": "additional",
    "audience": "Local diners, families and pizza customers interested in Italian food.",
    "focus": "Italian restaurant and family-dining creative concepts",
    "initials": "LO",
    "accent": "#a9604a",
    "wash": "#f9ede7"
  },
  "beauty-on-tilba": {
    "name": "Beauty on Tilba",
    "industry": "Beauty & Wellness",
    "location": "Location unconfirmed",
    "website": "https://beautyontilba.com/",
    "sector": "beauty",
    "collection": "additional",
    "audience": "Salon treatment clients and skincare e-commerce shoppers.",
    "focus": "Beauty treatment and skincare visual communications",
    "initials": "BT",
    "accent": "#b27b81",
    "wash": "#f9eff1"
  },
  "honest-international": {
    "name": "Honest International",
    "industry": "B2B Services",
    "location": "Gujranwala, Pakistan",
    "website": null,
    "sector": "b2b",
    "collection": "additional",
    "audience": "Wholesalers, retailers, contractors and construction-material businesses.",
    "focus": "Packaging, materials and practical construction-product designs",
    "initials": "HI",
    "accent": "#276e91",
    "wash": "#e9f4f7"
  }
} as const;
export type SocialClientSlug = keyof typeof socialClients;
