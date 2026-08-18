import heroLoom from "@/assets/hero-loom.jpg";
import pShawl from "@/assets/p-shawl.jpg";
import pJug from "@/assets/p-jug.jpg";
import pDhokra from "@/assets/p-dhokra.jpg";
import pBasket from "@/assets/p-basket.jpg";
import pBowls from "@/assets/p-bowls.jpg";
import pKantha from "@/assets/p-kantha.jpg";
import aMeera from "@/assets/a-meera.jpg";
import aRavi from "@/assets/a-ravi.jpg";
import aHasan from "@/assets/a-hasan.jpg";

export const heroImage = heroLoom;

export type Artisan = {
  slug: string;
  name: string;
  craft: string;
  region: string;
  /** Self-described, first-person. Never used as a pity frame. */
  identity: string;
  years: number;
  portrait: string;
  portraitAlt: string;
  quote: string;
  bio: string[];
  easyRead: string[];
  /** How this artisan prefers to be contacted / accommodated. */
  studioNotes: string[];
  signsInVideo: boolean;
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  category: string;
  material: string;
  region: string;
  image: string;
  /** Long, descriptive alt written for screen-reader users. */
  imageAlt: string;
  artisan: string;
  madeInDays: number;
  edition: string;
  dimensions: string;
  story: string;
  easyRead: string[];
  /** Text spoken by the audio-description player. */
  audioDescription: string;
  care: string;
  hasSignLanguage: boolean;
  tactile: string;
};

export const artisans: Artisan[] = [
  {
    slug: "meera-devi",
    name: "Meera Devi",
    craft: "Handloom weaving",
    region: "Bhuj, Kutch",
    identity: "Wheelchair user",
    years: 22,
    portrait: aMeera,
    portraitAlt:
      "Meera Devi, a weaver in her fifties, seated beside her wooden pit loom in a sunlit workshop, wearing an indigo and red sari.",
    quote:
      "I redesigned my loom before anyone thought to redesign the market. The market took longer.",
    bio: [
      "Meera learned weaving from her grandmother at eleven. After a spinal injury at twenty-six she was told the pit loom was finished for her, so she spent nine months rebuilding it: pedals raised, beam lowered, the whole frame set to chair height.",
      "That loom is now copied by fourteen weavers across Kutch. Her cloth carries a signature slub along the selvedge — the mark of a shuttle thrown from a seated arc rather than a standing one.",
    ],
    easyRead: [
      "Meera is a weaver. She makes cloth.",
      "She uses a wheelchair.",
      "She built a special loom she can use while sitting.",
      "She has been weaving for 22 years.",
    ],
    studioNotes: [
      "Orders are confirmed by voice note or text — whichever suits you.",
      "Workshop visits are step-free and open on Tuesdays.",
    ],
    signsInVideo: false,
  },
  {
    slug: "ravi-kumar",
    name: "Ravi Kumar",
    craft: "Dhokra brass casting",
    region: "Bastar, Chhattisgarh",
    identity: "Deaf — signs in ISL",
    years: 11,
    portrait: aRavi,
    portraitAlt:
      "Ravi Kumar, a young brass caster, mid-sign with both hands raised, standing in his workshop with warm light behind him.",
    quote: "I read the metal by its heat shimmer. Sound was never part of the craft.",
    bio: [
      "Ravi casts using the 4,000-year-old lost-wax method: a clay core, a lattice of wax threads wound by hand, then molten brass poured in a single held breath.",
      "He is Deaf and works in Indian Sign Language. Every listing he publishes carries a signed video, because he refuses to sell in a language his own community cannot read.",
    ],
    easyRead: [
      "Ravi makes small brass figures.",
      "He is Deaf. He talks with sign language.",
      "He makes a sign language video for every item.",
      "He has been casting brass for 11 years.",
    ],
    studioNotes: [
      "Every product page includes an ISL video from Ravi.",
      "Text and video chat only — please do not call.",
    ],
    signsInVideo: true,
  },
  {
    slug: "hasan-ali",
    name: "Hasan Ali",
    craft: "Wheel-thrown terracotta",
    region: "Nizamabad, Uttar Pradesh",
    identity: "Blind since birth",
    years: 38,
    portrait: aHasan,
    portraitAlt:
      "Hasan Ali, an older potter with grey hair, shaping a glowing terracotta vessel on a wheel in a sunlit courtyard, his cane resting beside him.",
    quote: "A wall is even when it stops arguing with my thumb. Eyes would only slow me down.",
    bio: [
      "Hasan has thrown clay for thirty-eight years and has never seen a pot. He centres by sound and resistance, and gauges wall thickness with the pad of his thumb to within half a millimetre.",
      "His vessels are known for their fingertip ridges — he leaves them deliberately, so buyers can feel the making the way he does.",
    ],
    easyRead: [
      "Hasan makes clay pots.",
      "He is blind. He works by touch.",
      "He leaves finger marks on the clay so you can feel them.",
      "He has been a potter for 38 years.",
    ],
    studioNotes: [
      "All of Hasan's listings include an audio description you can play.",
      "He answers voice notes himself, usually within a day.",
    ],
    signsInVideo: false,
  },
];

export const products: Product[] = [
  {
    slug: "indigo-block-shawl",
    name: "Nakshi Indigo Shawl",
    price: 4850,
    category: "Textile",
    material: "Handspun cotton",
    region: "Kutch",
    image: pShawl,
    imageAlt:
      "A folded handwoven shawl in deep indigo with a wide cream and blue geometric border and knotted fringe, resting on warm bone-coloured paper.",
    artisan: "meera-devi",
    madeInDays: 9,
    edition: "1 of 12",
    dimensions: "203 × 71 cm",
    story:
      "Nine days on a seated pit loom, dyed three times in a natural indigo vat until the blue stops taking. The border motif is a Kutchi diamond that Meera's grandmother called 'the eye that stays open'.",
    easyRead: [
      "A big soft scarf.",
      "It is dark blue with a white pattern.",
      "Meera made it by hand in 9 days.",
      "Price: ₹4,850.",
    ],
    audioDescription:
      "A large rectangular shawl in deep indigo blue, folded loosely. The lower third carries a broad band of cream and blue diamond patterning, finished with hand-knotted twisted fringe. The cotton is matte, with a soft slubbed texture.",
    care: "Cold hand wash separately for the first three washes. Dry in shade.",
    hasSignLanguage: false,
    tactile: "Slubbed, cool to the touch, with a raised woven border you can trace.",
  },
  {
    slug: "ridged-water-jug",
    name: "Thumbline Water Jug",
    price: 2200,
    category: "Pottery",
    material: "Unglazed terracotta",
    region: "Nizamabad",
    image: pJug,
    imageAlt:
      "A tall unglazed terracotta jug with a looped handle and horizontal ridges spiralling up the body, lit warmly against a clay-coloured wall.",
    artisan: "hasan-ali",
    madeInDays: 3,
    edition: "Open series",
    dimensions: "26 cm tall, 1.4 L",
    story:
      "Thrown blind and true. The ridges are not decoration — they are Hasan's thumb finding the wall on every rotation, left in place as a record of the making.",
    easyRead: [
      "A clay jug for water.",
      "It holds about 1.4 litres.",
      "Hasan made it by touch.",
      "Price: ₹2,200.",
    ],
    audioDescription:
      "A terracotta jug about the height of a forearm, widening from a narrow neck to a rounded base. A single loop handle joins the shoulder. Horizontal finger ridges spiral evenly up the body. The clay is unglazed and matte orange-pink.",
    care: "Season by soaking overnight before first use. Never use soap.",
    hasSignLanguage: false,
    tactile: "Porous and cool, with even ridges roughly a fingertip apart.",
  },
  {
    slug: "dancing-dhokra-figure",
    name: "Dancing Figure, Dhokra",
    price: 6400,
    category: "Metal",
    material: "Cast brass",
    region: "Bastar",
    image: pDhokra,
    imageAlt:
      "A small brass figurine of a dancing woman mid-turn, skirt flaring, one hand raised, standing on a fluted round base in warm sunlight.",
    artisan: "ravi-kumar",
    madeInDays: 14,
    edition: "1 of 1",
    dimensions: "21 cm tall, 780 g",
    story:
      "Wound from over four hundred hand-rolled wax threads, then lost to fire so the brass could take its place. Every Dhokra piece is singular because the mould is destroyed to release it.",
    easyRead: [
      "A small brass statue of a dancer.",
      "It is one of a kind.",
      "Ravi made it in 14 days.",
      "Price: ₹6,400.",
    ],
    audioDescription:
      "A brass figure of a woman in mid-dance, roughly the height of a hand span. Her skirt swings outward in carved pleats, one arm lifted, the other folded to her chest. She balances on one foot on a fluted circular base. The surface shifts between polished gold and darker patina.",
    care: "Dust with a dry cloth. Occasional tamarind polish restores the shine.",
    hasSignLanguage: true,
    tactile: "Heavy, cool, with fine ridged wax-thread lines across the skirt.",
  },
  {
    slug: "golden-grass-basket",
    name: "Sikki Lidded Basket",
    price: 1950,
    category: "Fibre",
    material: "Golden grass & cane",
    region: "Kutch",
    image: pBasket,
    imageAlt:
      "A round lidded basket woven from pale golden grass and cane, with a domed lid and a small knob handle, on a cream background.",
    artisan: "meera-devi",
    madeInDays: 4,
    edition: "Open series",
    dimensions: "24 × 20 cm",
    story:
      "Sikki grass is cut at monsoon's end, sun-dried to a pale gold, then coiled damp so it sets hard. Meera weaves these between loom commissions, resting her shoulders.",
    easyRead: [
      "A round basket with a lid.",
      "It is made from dried grass.",
      "Good for keeping small things.",
      "Price: ₹1,950.",
    ],
    audioDescription:
      "A rounded basket about the size of a melon, woven in tight vertical ribs of pale golden grass over cane. A domed lid sits on top with a small twisted knob at its centre.",
    care: "Keep dry. Wipe with a barely damp cloth.",
    hasSignLanguage: false,
    tactile: "Light, dry and ribbed, with a smooth knob that turns in the fingers.",
  },
  {
    slug: "blue-pottery-bowls",
    name: "Cobalt Bowls, Set of Three",
    price: 3600,
    category: "Pottery",
    material: "Glazed stoneware",
    region: "Nizamabad",
    image: pBowls,
    imageAlt:
      "Three small stoneware bowls glazed in cobalt and midnight blue with faint floral shadows, arranged on a pale ledge in raking sunlight.",
    artisan: "hasan-ali",
    madeInDays: 6,
    edition: "1 of 20",
    dimensions: "11 cm across, each",
    story:
      "Hasan throws the forms; the cobalt is brushed by his apprentice, who describes each motif aloud as it is painted so Hasan can approve it.",
    easyRead: [
      "Three small blue bowls.",
      "Good for snacks or dips.",
      "They are safe to wash by hand.",
      "Price: ₹3,600 for all three.",
    ],
    audioDescription:
      "Three bowls of the same size, each glazed a deep cobalt that darkens to near-black at the rim. Faint floral silhouettes sit under the glaze. The unglazed foot rings are pale clay.",
    care: "Hand wash. Not for microwave use.",
    hasSignLanguage: false,
    tactile: "Glassy and smooth, with a slightly gritty unglazed foot.",
  },
  {
    slug: "kantha-wall-panel",
    name: "Kantha Wall Panel",
    price: 5400,
    category: "Textile",
    material: "Layered cotton, cotton thread",
    region: "Bastar",
    image: pKantha,
    imageAlt:
      "A long vertical wall hanging on a wooden dowel, with indigo side panels, saffron zigzag columns and a cream centre embroidered with blue diamonds, ending in cream tassels.",
    artisan: "ravi-kumar",
    madeInDays: 21,
    edition: "1 of 3",
    dimensions: "132 × 44 cm",
    story:
      "Three worn saris layered and bound by a single running stitch, repeated some eleven thousand times. Kantha was never meant to be new — it is repair raised to a language.",
    easyRead: [
      "A long cloth to hang on a wall.",
      "It is blue, orange and cream.",
      "It took 21 days to sew.",
      "Price: ₹5,400.",
    ],
    audioDescription:
      "A tall narrow textile panel hung from a wooden rod. Two deep indigo columns run down the outer edges, printed with small white starbursts. Inside them, saffron zigzag bands frame a cream centre stitched with a vertical row of blue diamond motifs. Cream tassels finish the lower edge.",
    care: "Dry clean, or spot clean gently. Keep out of direct sun.",
    hasSignLanguage: true,
    tactile: "Quilted and slightly puckered; the running stitch is easy to trace by finger.",
  },
];

export const categories = ["All", "Textile", "Pottery", "Metal", "Fibre"] as const;

export const accessFilters = [
  { id: "sign", label: "Has sign-language video" },
  { id: "audio", label: "Has audio description" },
  { id: "tactile", label: "Tactile detail described" },
] as const;

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getArtisan(slug: string) {
  return artisans.find((a) => a.slug === slug);
}

export function productsByArtisan(slug: string) {
  return products.filter((p) => p.artisan === slug);
}

export function formatPrice(paise: number) {
  return `₹${paise.toLocaleString("en-IN")}`;
}
