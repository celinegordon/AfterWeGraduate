import { organizationEntries } from "./organizations"
import type { Category, OrganizationEntry } from "./organizations"
import { allCities, states } from "./places"
import type { State } from "./places"

export type Reach = "local" | "statewide" | "nationwide"

export type Organization = {
  id: string
  name: string
  category: Category
  icon: string
  color: string
  tagline: string
  description: string
  url: string
  instagram?: string
  tags: string[]
  where: OrganizationEntry["where"]
}

const categoryStyle: Record<Category, { icon: string color: string }> = {
  "Social & gatherings": { icon: "people", color: "pink" },
  "Outdoors & wellness": { icon: "sun", color: "sage" },
  "Books & culture": { icon: "book", color: "lavender" },
  "Career & connection": { icon: "people", color: "butter" },
  "Service & community": { icon: "people", color: "peach" },
}

function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

// Accepts "outdoorafro", "@outdoorafro", or a full instagram.com link.
export function instagramLink(value?: string) {
  const handle = value
    ?.trim()
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/^@/, "")
    .split(/[/?#]/)[0]
  return handle ? `https://www.instagram.com/${handle}/` : undefined
}

function toOrganization(entry: OrganizationEntry): Organization {
  const instagram = instagramLink(entry.instagram)
  return {
    id: slug(entry.name),
    name: entry.name,
    category: entry.category,
    ...categoryStyle[entry.category],
    tagline: entry.tagline || "",
    description:
      entry.description ||
      "Follow along on Instagram for upcoming gatherings and ways to get involved.",
    url: entry.website || instagram || "",
    instagram,
    tags: [
      entry.womenCentered ? "Black women-centered" : "All genders",
      ...(entry.tags || []),
    ],
    where: entry.where,
  }
}

export const organizations: Organization[] =
  organizationEntries.map(toOrganization)

// Typing just "Portland" or "Columbus" picks the larger city.
const preferredState: Record<string, string> = {
  portland: "OR",
  columbus: "OH",
  "kansas city": "MO",
  springfield: "MA",
  charleston: "SC",
  columbia: "SC",
}

export type Place = { label: string city?: string state?: State }

// Turns whatever the user typed into a known city and/or state.
export function resolvePlace(input: string): Place {
  const value = input.trim().toLowerCase().replace(/\s+/g, " ")
  const exact = allCities.find((c) => c.toLowerCase() === value)
  const byName = allCities.filter(
    (c) => c.toLowerCase().split(",")[0] === value,
  )
  const city =
    exact ||
    byName.find((c) => c.endsWith(`, ${preferredState[value]}`)) ||
    byName[0]
  if (city) {
    const abbr = city.split(", ")[1]
    return { label: city, city, state: states.find((s) => s.abbr === abbr) }
  }
  const state = states.find(
    (s) => s.name.toLowerCase() === value || s.abbr.toLowerCase() === value,
  )
  if (state) return { label: state.name, state }
  return { label: input.trim() }
}

// How an organization relates to the searched place, or null if it doesn't show.
export function reachFor(org: Organization, place: Place): Reach | null {
  if (org.where === "nationwide") return "nationwide"
  const abbr = place.state?.abbr
  if (place.city && org.where.includes(place.city)) return "local"
  if (abbr && org.where.includes(abbr)) return "statewide"
  // Searching a whole state: include groups listed in any of its cities.
  if (!place.city && abbr && org.where.some((w) => w.endsWith(`, ${abbr}`)))
    return "local"
  return null
}
