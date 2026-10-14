// ─────────────────────────────────────────────────────────────────────────────
// YOUR CURATED LIST. Add one { ... } block per organization.
//
//   name       The group's name.
//   instagram  Their handle ("outdoorafro") or the full link
//              ("https://www.instagram.com/outdoorafro/"). Either works.
//   where      Where they are active:
//                "nationwide"                     → shows for every city
//                ["GA"]                           → shows for every city in Georgia
//                ["Atlanta, GA"]                  → shows only for Atlanta
//                ["Atlanta, GA", "Houston, TX"]   → mix and match cities/states
//              City spelling must match src/data/places.ts ("City, ST").
//   category   One of the five categories listed below.
//
// Optional:
//   website        Their website, if they have one.
//   description    A sentence or two about them.
//   tagline        A short, friendly one-liner.
//   womenCentered  true if the group is for Black women specifically.
//   tags           Extra labels, e.g. ["Running", "All levels"].
//
// Tip: keep a comma after every closing } so the next entry can follow.
// ─────────────────────────────────────────────────────────────────────────────

export const categories = [
  "Social & gatherings",
  "Outdoors & wellness",
  "Books & culture",
  "Career & connection",
  "Service & community",
] as const

export type Category = typeof categories[number]

export type OrganizationEntry = {
  name: string
  instagram?: string
  where: "nationwide" | string[]
  category: Category
  website?: string
  description?: string
  tagline?: string
  womenCentered?: boolean
  tags?: string[]
}

export const organizationEntries: OrganizationEntry[] = [
  // ── Nationwide ────────────────────────────────────────────────────────────
  {
    name: "Black on the Block",
    instagram: "blackontheblock",
    where: "nationwide",
    category: "Social & gatherings",
    tagline: "Come for the culture. Stay for the connections.",
    description:
      "Discover pop-up markets celebrating Black-owned businesses, food, music, and community. Check their Instagram for upcoming cities, event announcements, and ticket details.",
    tags: ["Pop-up markets", "Social gatherings"],
  },
  {
    name: "Outdoor Afro",
    instagram: "outdoorafro",
    website: "https://outdoorafro.org/",
    where: "nationwide",
    category: "Outdoors & wellness",
    tagline: "Fresh air. Familiar faces. New adventures.",
    description:
      "A national network celebrating Black connections to nature. Explore their local networks for group hikes, outdoor experiences, and opportunities to connect; confirm current activities with your local network.",
    tags: ["Outdoor adventures", "Local networks"],
  },
  {
    name: "GirlTrek",
    website: "https://www.girltrek.org/",
    where: "nationwide",
    category: "Outdoors & wellness",
    womenCentered: true,
    tagline: "A little fresh air. A whole lot of sisterhood.",
    description:
      "A national movement of Black women walking together for health, joy, and connection. Explore their community to find a walking crew or start your own.",
    tags: ["Walking groups", "Wellness"],
  },
  {
    name: "Black Girls RUN!",
    website: "https://blackgirlsrun.com/",
    where: "nationwide",
    category: "Outdoors & wellness",
    womenCentered: true,
    tagline: "Your next running buddy is out there.",
    description:
      "Connect with a national community making fitness welcoming for Black women. Their group directory is the place to check for local runs and meetups.",
    tags: ["Running", "All levels"],
  },
  {
    name: "Well-Read Black Girl",
    website: "https://www.wellreadblackgirl.com/",
    where: "nationwide",
    category: "Books & culture",
    womenCentered: true,
    tagline: "Good books. Even better conversations.",
    description:
      "Celebrate Black women writers and readers through a community rooted in storytelling. Explore their book club network, reading recommendations, and cultural gatherings.",
    tags: ["Book clubs", "Culture"],
  },
  {
    name: "Urban League Young Professionals",
    website: "https://nulyp.org/",
    where: "nationwide",
    category: "Career & connection",
    tagline: "Grow your circle. Make your impact.",
    description:
      "A national network for young Black professionals, with local chapters offering networking, service, and community-building opportunities. Open to all genders.",
    tags: ["Young professionals", "Networking"],
  },
  {
    name: "Black Women’s Health Imperative",
    website: "https://bwhi.org/",
    where: "nationwide",
    category: "Outdoors & wellness",
    womenCentered: true,
    tagline: "Make space for your well-being.",
    description:
      "Explore programs and resources centered on the health and well-being of Black women and girls. Check their site for current programs and ways to get involved.",
    tags: ["Well-being", "Advocacy"],
  },
  {
    name: "National Council of Negro Women",
    website: "https://ncnw.org/",
    where: "nationwide",
    category: "Service & community",
    womenCentered: true,
    tagline: "Sisterhood with a sense of purpose.",
    description:
      "Find a local section of this longstanding network connecting Black women through leadership, advocacy, education, and service. Check membership details with your local section.",
    tags: ["Local sections", "Service"],
  },

  // ── Multiple cities ───────────────────────────────────────────────────────
  {
    name: "The Gathering Spot",
    website: "https://thegatheringspot.club/",
    where: ["Atlanta, GA", "Washington, DC", "Los Angeles, CA"],
    category: "Social & gatherings",
    tagline: "A gathering place for your next great connection.",
    description:
      "A private membership community rooted in Black culture. Explore conversations, cultural programming, and social events; check membership fees and access directly.",
    tags: ["Member community", "Culture & connection"],
  },

  // ── Washington, DC ────────────────────────────────────────────────────────
  {
    name: "MahoganyBooks",
    instagram: "mahoganybooks",
    website: "https://www.mahoganybooks.com/",
    where: ["Washington, DC", "MD"],
    category: "Books & culture",
    tagline: "Black stories. Big conversations. Your kind of company.",
    description:
      "A Black-owned bookstore in the Washington, DC area celebrating books by and about the African diaspora. Explore author talks, literary conversations, and community events; check each event’s location and registration details.",
    tags: ["Literary events"],
  },

  // ── Add your local finds below (copy this template) ──────────────────────
  // {
  //   name: "",
  //   instagram: "",
  //   where: ["Atlanta, GA"],
  //   category: "Social & gatherings",
  // },
]
