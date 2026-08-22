/* ============================================================
   MOCK DATA — PROVIDERS
   ============================================================ */
const CURATED_PROVIDERS = [
  {id:1,name:'Sara Al-Harbi',city:'Riyadh',tags:['Wedding','Portrait'],rating:4.9,reviews:132,priceFrom:1200,bizType:'individual',
    bio:'Wedding and portrait photographer with 8 years documenting Saudi weddings and engagement sessions across Riyadh and the Eastern Province.',
    responseTime:'Usually responds within 1 hour', completedBookings:118,
    certs:['Certified Wedding Photographer — PPA'],
    freelance:['Al Faisaliah Wedding Season 2025','Rania & Omar Engagement Shoot','Boutique Hotel Bridal Editorial','Diriyah Gate Pre-Wedding Set'],
    mediaCount:24,
    reviewsList:[
      {name:'Huda M.', rating:5, date:'Jul 2026', text:'Delivered exactly what we discussed, on time. Communication was excellent throughout our wedding day.'},
      {name:'Abdullah S.', rating:5, date:'Jun 2026', text:'Sara made everyone comfortable in front of the camera. The engagement photos were beautiful.'},
      {name:'Layla A.', rating:4, date:'Apr 2026', text:'Great experience overall — editing took a bit longer than promised but the results were worth it.'}]},
  {id:2,name:'Khalid Studios',businessName:'Khalid Studios for Photography LLC',city:'Jeddah',tags:['Event','Corporate'],rating:4.7,reviews:58,priceFrom:2500,bizType:'business',cr:'4030112233',vatCertVerified:true,
    bio:'Full-service event and corporate photography studio covering conferences, launches and galas across the Western Region.',
    responseTime:'Usually responds within 3 hours', completedBookings:64,
    certs:['Adobe Certified Expert','First Aid & On-site Safety Cert'],
    freelance:['STC Annual Conference 2025','Red Sea Investment Summit','Jeddah Chamber Gala Night','Corniche Product Launch'],
    mediaCount:40,
    reviewsList:[
      {name:'Reem K.', rating:5, date:'May 2026', text:'Professional crew, arrived early and covered every session of a two-day conference without missing a beat.'},
      {name:'Fahad N.', rating:4, date:'Mar 2026', text:'Solid corporate coverage, good turnaround on the edited gallery.'},
      {name:'Aliyah B.', rating:5, date:'Feb 2026', text:'Handled a last-minute schedule change smoothly. Would book again.'}]},
  {id:3,name:'Noura Creative',city:'Dammam',tags:['Product','Branding'],rating:null,reviews:6,priceFrom:600,bizType:'individual',
    bio:'Product and small-brand photography — food, retail and e-commerce catalogs, styled and shot in a home studio.',
    responseTime:'Usually responds within 4 hours', completedBookings:6,
    certs:[],
    freelance:['Local Bakery Product Shoot','Handmade Jewelry Catalog'],
    mediaCount:12,
    reviewsList:[{name:'Sami R.', rating:5, date:'Jun 2026', text:'Great eye for styling, very responsive.'}]},
  {id:4,name:'Faisal Reels',city:'Riyadh',tags:['Videography','Event','Drone/Aerial'],rating:4.8,reviews:210,priceFrom:3000,bizType:'individual',
    bio:'Cinematic videography for weddings, events and short branded films. Licensed drone pilot for aerial coverage.',
    responseTime:'Usually responds within 2 hours', completedBookings:196,
    certs:['DJI Certified Drone Pilot','GACA Drone Operating License'],
    freelance:['Red Sea Film Fest — Behind the Scenes','Luxury Villa Launch Film','King Abdullah Park Drone Reel','Wedding Season Highlight Reel 2025'],
    mediaCount:55,
    reviewsList:[
      {name:'Mohammed T.', rating:5, date:'Jul 2026', text:'The drone footage of our venue was stunning. Faisal knew exactly what shots would work.'},
      {name:'Dana A.', rating:5, date:'Jun 2026', text:'Cinematic quality, delivered ahead of schedule.'},
      {name:'Waleed H.', rating:4, date:'Apr 2026', text:'Great work, minor delay in the final cut but communicated it clearly.'}]},
  {id:5,name:'Lens & Light Co.',businessName:'Lens & Light Studios Co.',city:'Mecca',tags:['Wedding','Event','Portrait'],rating:4.6,reviews:15,priceFrom:2200,bizType:'business',cr:'2050099887',vatCertVerified:false,
    bio:'Boutique studio offering wedding, event and portrait coverage with a small in-house team.',
    responseTime:'Usually responds within 5 hours', completedBookings:17,
    certs:['ISO Studio Safety Cert'],
    freelance:['Grand Hyatt Gala 2024','Family Reunion Portrait Day','Umrah Season Group Portraits'],
    mediaCount:60,
    reviewsList:[{name:'Yousef Q.', rating:4, date:'May 2026', text:'Good coverage, friendly team.'},{name:'Amal S.', rating:5, date:'Mar 2026', text:'Lovely portraits, would recommend.'}]},
  {id:6,name:'Yara Moments',city:'Khobar',tags:['Portrait','Family','Newborn'],rating:null,reviews:3,priceFrom:450,bizType:'individual',
    bio:'New to Lensly — specializing in relaxed family and newborn portrait sessions at home or outdoors.',
    responseTime:'Usually responds within 6 hours', completedBookings:3,
    certs:[],
    freelance:['Neighborhood Family Portrait Day'],
    mediaCount:8,
    reviewsList:[{name:'Noor F.', rating:5, date:'Jul 2026', text:'So patient with our toddler, lovely photos.'}]},
  {id:7,name:'Omar Vision',city:'Riyadh',tags:['Real Estate','Corporate','Drone/Aerial'],rating:4.9,reviews:89,priceFrom:1800,bizType:'individual',
    bio:'Real estate and architectural photography, including licensed aerial/drone coverage for listings and launches.',
    responseTime:'Usually responds within 2 hours', completedBookings:82,
    certs:['Certified Drone Operator — GACA'],
    freelance:['Downtown Riyadh Tower Launch','Waterfront Villas Listing Set','Diriyah Development Aerial Survey'],
    mediaCount:33,
    reviewsList:[
      {name:'Sami R.', rating:5, date:'Jun 2026', text:'Listing photos sold the unit in a week. Excellent aerial work.'},
      {name:'Reem K.', rating:5, date:'Apr 2026', text:'Very professional, great equipment, sharp images.'},
      {name:'Talal M.', rating:5, date:'Feb 2026', text:'Best real estate photographer we\'ve worked with.'}]},
  {id:8,name:'Studio Bloom',businessName:'Studio Bloom Media Co.',city:'Jeddah',tags:['Product','Branding','Fashion'],rating:4.5,reviews:47,priceFrom:900,bizType:'business',cr:'4031155667',vatCertVerified:true,
    bio:'E-commerce and fashion product photography studio with in-house styling and retouching.',
    responseTime:'Usually responds within 4 hours', completedBookings:51,
    certs:[],
    freelance:['Fashion Week Lookbook','Seasonal Catalog — Spring 2026','Skincare Brand Launch Set'],
    mediaCount:29,
    reviewsList:[{name:'Lama K.', rating:4, date:'May 2026', text:'Clean product shots, fast turnaround.'},{name:'Basil O.', rating:5, date:'Jan 2026', text:'Great styling, made our catalog look premium.'}]},
  {id:9,name:'Aisha Frames',city:'Medina',tags:['Portrait','Family','Newborn'],rating:4.8,reviews:34,priceFrom:750,bizType:'individual',
    bio:'Warm, natural-light portrait photography for families, maternity and newborn sessions.',
    responseTime:'Usually responds within 3 hours', completedBookings:36,
    certs:['Newborn Safety Handling Certificate'],
    freelance:['Maternity Golden Hour Session','Twins Newborn Set','Grandparents Family Portrait Day'],
    mediaCount:21,
    reviewsList:[{name:'Reema T.', rating:5, date:'Jun 2026', text:'So gentle with our newborn, gorgeous photos.'},{name:'Sara D.', rating:5, date:'Mar 2026', text:'Warm and professional, highly recommend.'}]},
  {id:10,name:'Rashid Aerial',city:'Tabuk',tags:['Drone/Aerial','Real Estate'],rating:null,reviews:5,priceFrom:1400,bizType:'individual',
    bio:'Licensed drone operator covering real estate, tourism and industrial site photography in the northern region.',
    responseTime:'Usually responds within 1 day', completedBookings:5,
    certs:['GACA Drone Operating License'],
    freelance:['NEOM Coastal Survey Set','Desert Resort Aerial Package'],
    mediaCount:14,
    reviewsList:[{name:'Faris A.', rating:4, date:'May 2026', text:'Good aerial angles, still building his portfolio.'}]},
  {id:11,name:'Golden Hour Films',businessName:'Golden Hour Films Co.',city:'Abha',tags:['Videography','Wedding'],rating:4.7,reviews:71,priceFrom:2800,bizType:'business',cr:'1090044556',vatCertVerified:true,
    bio:'Cinematic wedding and event films shot across the Aseer region, known for dramatic mountain-backdrop footage.',
    responseTime:'Usually responds within 3 hours', completedBookings:68,
    certs:['DJI Certified Drone Pilot'],
    freelance:['Aseer Mountains Wedding Film','Abha Season Festival Recap','Family Legacy Documentary Short'],
    mediaCount:38,
    reviewsList:[{name:'Nawaf I.', rating:5, date:'Jul 2026', text:'The mountain backdrop shots were incredible, true cinematic quality.'},{name:'Hessa M.', rating:4, date:'Apr 2026', text:'Great film, delivery was a week later than planned.'}]},
  {id:12,name:'Maha Portraits',city:'Riyadh',tags:['Portrait','Newborn','Family'],rating:4.9,reviews:145,priceFrom:850,bizType:'individual',
    bio:'One of Riyadh\'s most-booked portrait photographers — family, maternity and newborn sessions in a cozy home studio.',
    responseTime:'Usually responds within 1 hour', completedBookings:139,
    certs:['Certified Portrait Photographer — PPA','Newborn Safety Handling Certificate'],
    freelance:['Studio Family Portrait Package','Maternity Series — Spring 2026','Newborn 7-Day Session','Sibling Portrait Day'],
    mediaCount:47,
    reviewsList:[
      {name:'Ghadeer S.', rating:5, date:'Jul 2026', text:'Maha is incredible with kids, the photos came out perfectly.'},
      {name:'Bandar F.', rating:5, date:'Jun 2026', text:'Best portrait session we\'ve ever had, worth every riyal.'},
      {name:'Nada Y.', rating:5, date:'Apr 2026', text:'Warm, patient, and extremely talented.'}]},
  {id:13,name:'Jeddah Visuals Co.',businessName:'Jeddah Visuals Co.',city:'Jeddah',tags:['Corporate','Event','Product'],rating:4.4,reviews:22,priceFrom:1600,bizType:'business',cr:'4030198877',vatCertVerified:true,
    bio:'Corporate photography and video studio serving Jeddah\'s business district — headshots, events and product launches.',
    responseTime:'Usually responds within 5 hours', completedBookings:24,
    certs:[],
    freelance:['Executive Headshot Day','Product Launch — Red Sea Mall','Annual Report Photography Set'],
    mediaCount:19,
    reviewsList:[{name:'Turki B.', rating:4, date:'May 2026', text:'Solid corporate headshots, efficient session.'}]},
  {id:14,name:'Hassan Streetworks',city:'Dammam',tags:['Fashion','Portrait'],rating:null,reviews:8,priceFrom:550,bizType:'individual',
    bio:'Editorial and street-style fashion photography with a modern, high-contrast look.',
    responseTime:'Usually responds within 4 hours', completedBookings:9,
    certs:[],
    freelance:['Streetwear Lookbook — Winter 2025','Editorial Test Shoot Set'],
    mediaCount:11,
    reviewsList:[{name:'Jana W.', rating:5, date:'Jun 2026', text:'Great creative direction and editing style.'}]},
];

/* ---------- procedurally generated providers (to reach 100 total) ---------- */
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260821); // fixed seed so the marketplace looks the same on every load
function pick(arr) { return arr[Math.floor(rand() * arr.length)]; }
function pickN(arr, n) { const copy = [...arr]; const out = []; for (let i = 0; i < n && copy.length; i++) { out.push(copy.splice(Math.floor(rand() * copy.length), 1)[0]); } return out; }
function randInt(min, max) { return Math.floor(rand() * (max - min + 1)) + min; }

const FIRST_NAMES_M = ['Abdulaziz','Fahad','Naif','Turki','Meshal','Sultan','Rakan','Yazeed','Saad','Waleed','Bader','Hamad','Majed','Mansour','Nasser','Rayan','Salman','Talal','Zayd','Amjad','Anas','Hussain','Ibrahim','Yasser','Firas','Karim'];
const FIRST_NAMES_F = ['Lama','Ghada','Njoud','Shatha','Alanoud','Reema','Jana','Munira','Deema','Rawan','Aljohara','Haifa','Ruba','Wateen','Maryam','Amani','Renad','Leen','Nada','Farah','Ohoud','Rania','Lina','Salma','Joud','Retaj'];
const LAST_NAMES = ['Al-Zahrani','Al-Ghamdi','Al-Qahtani','Al-Otaibi','Al-Harbi','Al-Dosari','Al-Shehri','Al-Malki','Al-Amri','Al-Mutairi','Al-Anazi','Al-Subaie','Al-Rashidi','Al-Juhani','Al-Sulami','Al-Balawi','Al-Ahmadi','Al-Yami','Al-Faraj','Al-Saeed','Al-Turki','Al-Nasser'];
const BIZ_WORDS = ['Studio','Visuals','Media','Frames','Creative House','Productions','Films','Lens Co.'];
const CITY_POOL = ['Riyadh','Jeddah','Dammam','Khobar','Mecca','Medina','Abha','Tabuk','Jubail','Yanbu','Najran','Hail','Buraidah'];
const TAG_POOL = ['Wedding','Portrait','Event','Product','Videography','Corporate','Real Estate','Family','Branding','Drone/Aerial','Fashion','Newborn'];
const CERT_POOL = ['Certified Wedding Photographer — PPA','Adobe Certified Expert','DJI Certified Drone Pilot','GACA Drone Operating License','Newborn Safety Handling Certificate','First Aid & On-site Safety Cert','ISO Studio Safety Cert','Certified Portrait Photographer — PPA'];
const BIO_TEMPLATES = [
  (t, c) => `${t} photographer based in ${c}, focused on clean, natural-light work for local clients.`,
  (t, c) => `Freelance creative in ${c} specializing in ${t.toLowerCase()} sessions, big and small.`,
  (t, c) => `Covers ${t.toLowerCase()} work across ${c} and nearby areas, with a relaxed, documentary style.`,
  (t, c) => `${c}-based studio offering ${t.toLowerCase()} photography with a modern, editorial look.`,
  (t, c) => `Independent photographer in ${c}, building a portfolio around ${t.toLowerCase()} and portrait work.`,
];
const PROJECT_TEMPLATES = [
  (t, c) => `${c} ${t} Package`,
  (t, c) => `${t} Shoot — ${c}`,
  (t, c) => `${t} Editorial Set`,
  (t, c) => `Weekend ${t} Session`,
  (t, c) => `${t} Portfolio Update`,
];
const REVIEWER_FIRST = ['Huda','Abdullah','Layla','Mohammed','Reem','Sami','Fahad','Aliyah','Dana','Waleed','Ghadeer','Bandar','Nada','Turki','Jana','Faris','Nawaf','Hessa','Lama','Basil','Noor','Talal','Yousef','Amal'];
const REVIEW_TEXTS = [
  {text:'Delivered exactly what we discussed, on time.', rating:5},
  {text:'Really happy with the results — professional and easy to work with.', rating:5},
  {text:'Great experience end to end, would book again.', rating:5},
  {text:'Good quality work, communication could be a bit faster.', rating:4},
  {text:'Very responsive and easy to schedule with.', rating:5},
  {text:'The final gallery exceeded what we expected.', rating:5},
  {text:'Solid work, delivered a little later than promised.', rating:4},
  {text:'Friendly, professional, and well worth the price.', rating:5},
  {text:'Great eye for detail, would recommend to friends.', rating:5},
  {text:'Handled a last-minute change smoothly.', rating:5},
];
const REVIEW_DATES = ['Jan 2026','Feb 2026','Mar 2026','Apr 2026','May 2026','Jun 2026','Jul 2026'];
const RESPONSE_TIMES = ['Usually responds within 1 hour','Usually responds within 2 hours','Usually responds within 3 hours','Usually responds within 4 hours','Usually responds within 6 hours','Usually responds within 1 day'];

const GENERATED_PROVIDERS = [];
for (let i = 0; i < 86; i++) {
  const id = 15 + i;
  const isFemale = rand() < 0.5;
  const firstName = isFemale ? pick(FIRST_NAMES_F) : pick(FIRST_NAMES_M);
  const lastName = pick(LAST_NAMES);
  const city = pick(CITY_POOL);
  const tags = pickN(TAG_POOL, randInt(1, 3));
  const bizType = rand() < 0.25 ? 'business' : 'individual';
  let name, businessName, cr, vatCertVerified;
  if (bizType === 'business') {
    name = `${lastName.replace('Al-', '')} ${pick(BIZ_WORDS)}`;
    businessName = `${name} for Photography LLC`;
    cr = String(randInt(1000000000, 9999999999));
    vatCertVerified = rand() < 0.75;
  } else {
    name = `${firstName} ${lastName}`;
  }
  const isNew = rand() < 0.12;
  const reviews = isNew ? randInt(1, 9) : randInt(10, 230);
  const rating = isNew ? null : Math.min(5, Math.round((4.0 + rand() * 0.95) * 10) / 10);
  const priceFrom = randInt(9, 64) * 50;
  const certs = pickN(CERT_POOL, randInt(0, 2));
  const numProjects = randInt(2, 4);
  const freelance = Array.from({ length: numProjects }, () => pick(PROJECT_TEMPLATES)(pick(tags), city));
  const mediaCount = numProjects * randInt(3, 9) + randInt(0, 10);
  const responseTime = pick(RESPONSE_TIMES);
  const completedBookings = reviews + randInt(0, 15);
  const bio = pick(BIO_TEMPLATES)(tags[0], city);
  const numRev = Math.max(1, Math.min(reviews, 4));
  const reviewsList = Array.from({ length: numRev }, () => {
    const r = pick(REVIEW_TEXTS);
    return { name: `${pick(REVIEWER_FIRST)} ${String.fromCharCode(65 + randInt(0, 25))}.`, rating: r.rating, date: pick(REVIEW_DATES), text: r.text };
  });
  const p = { id, name, city, tags, rating, reviews, priceFrom, bizType, bio, responseTime, completedBookings, certs, freelance, mediaCount, reviewsList };
  if (bizType === 'business') { p.businessName = businessName; p.cr = cr; p.vatCertVerified = vatCertVerified; }
  GENERATED_PROVIDERS.push(p);
}

const PROVIDERS = CURATED_PROVIDERS.concat(GENERATED_PROVIDERS);

const CATEGORIES = [...new Set(PROVIDERS.flatMap(p => p.tags))];
const CITIES = [...new Set(PROVIDERS.map(p => p.city))].sort();
const PAGE_SIZE = 12;

const BOOKINGS = [
  {provider:'Sara Al-Harbi', service:'Wedding Photography', date:'2026-09-14', status:'Upcoming', escrow:'Deposit paid'},
  {provider:'Faisal Reels', service:'Event Videography', date:'2026-07-02', status:'Completed', escrow:'Released'},
  {provider:'Omar Vision', service:'Real Estate Shoot', date:'2026-06-11', status:'Completed', escrow:'Released'},
  {provider:'Khalid Studios', service:'Corporate Conference Coverage', date:'2026-05-20', status:'Disputed', escrow:'Held'},
  {provider:'Maha Portraits', service:'Newborn Session', date:'2026-04-08', status:'Completed', escrow:'Released'},
];

const ADMIN_QUEUE = [
  {name:'Noura Creative', item:'2 certificates + 12 media items pending review', type:'New provider'},
  {name:'Yara Moments', item:'Profile + 8 media items pending review', type:'New provider'},
  {name:'Rashid Aerial', item:'GACA license + 14 media items pending review', type:'New provider'},
  {name:'Lens & Light Co.', item:'VAT certificate pending re-verification', type:'Business update'},
];

const ADMIN_PAYMENTS = [
  {booking:'#8841', consumer:'Huda M.', provider:'Sara Al-Harbi', amount:'1,200 SAR', status:'Held (escrow)'},
  {booking:'#8790', consumer:'Abdullah S.', provider:'Faisal Reels', amount:'3,000 SAR', status:'Released'},
  {booking:'#8765', consumer:'Reem K.', provider:'Khalid Studios', amount:'2,500 SAR', status:'Disputed — under review'},
  {booking:'#8702', consumer:'Sami R.', provider:'Omar Vision', amount:'1,800 SAR', status:'Released'},
  {booking:'#8688', consumer:'Ghadeer S.', provider:'Maha Portraits', amount:'850 SAR', status:'Released'},
];

const TEAM = [
  {name:'Reem Al-Qahtani', role:'Co-founder / CEO'},
  {name:'Yusuf Al-Amri', role:'Co-founder / Engineering'},
  {name:'Dana Al-Otaibi', role:'Head of Trust & Safety'},
  {name:'Bandar Al-Ghamdi', role:'Provider Success'},
];

const FEES = { platformRate: 0.05, vatRate: 0.15, depositRate: 0.15, insuranceRate: 0.03 };
