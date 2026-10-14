import { useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"
import { allCities } from "./data/places"
import { categories } from "./data/organizations"
import { organizations, reachFor, resolvePlace } from "./data/directory"
import type { Organization, Reach } from "./data/directory"

function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: string
  size?: number
  className?: string
}) {
  const paths: Record<string, React.ReactNode> = {
    arrow: (
      <>
        <path d="M4 12h15M13 6l6 6-6 6" />
      </>
    ),
    pin: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="7" r="3" />
        <path d="M3 20v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M18 13a5 5 0 0 1 3 5v2" />
      </>
    ),
    sparkle: (
      <>
        <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    check: <path d="m5 12 4 4L19 6" />,
    book: (
      <>
        <path d="M12 5v16M12 5C8 2 3 3 3 3v16s5-1 9 2c4-3 9-2 9-2V3s-5-1-9 2Z" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1 1M18 18l1 1M5 19l1-1M18 6l1-1" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] || paths.sparkle}
    </svg>
  )
}

function Flower({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
    >
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="24"
          rx="15"
          ry="24"
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="18" fill="var(--cream)" />
    </svg>
  )
}

const photos = {
  main: "https://images.unsplash.com/photo-1630726410985-a1021e8a232a?auto=format&fit=crop&w=1000&q=85",
  friends:
    "https://images.unsplash.com/photo-1521510186458-bbbda7aef46b?auto=format&fit=crop&w=600&q=85",
  group:
    "https://images.unsplash.com/photo-1493655161922-ef98929de9d8?auto=format&fit=crop&w=700&q=85",
  beach:
    "https://images.unsplash.com/photo-1517840933437-c41356892b35?auto=format&fit=crop&w=600&q=85",
}
export default function App() {
  const [page, setPage] = useState<"home" | "results" | "saved">("home")
  const [location, setLocation] = useState("")
  const [city, setCity] = useState("")
  const [category, setCategory] = useState("All communities")
  const [error, setError] = useState("")
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("herpeople-saved") || "[]")
    } catch {
      return []
    }
  })
  const [detail, setDetail] = useState<Organization | null>(null)
  const [about, setAbout] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    localStorage.setItem("herpeople-saved", JSON.stringify(saved))
  }, [saved])
  useEffect(() => {
    if (detail || about) modalRef.current?.showModal()
    else modalRef.current?.close()
  }, [detail, about])
  function navigate(next: typeof page) {
    setPage(next)
    setCategory("All communities")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  function search(e?: FormEvent, selected?: string) {
    e?.preventDefault()
    const value = (selected || location).trim()
    if (value.length < 2) {
      setError("Tell us your city so we can help you get started.")
      inputRef.current?.focus()
      return
    }
    const place = resolvePlace(value)
    setCity(place.label)
    setLocation(place.label)
    setError("")
    navigate("results")
  }
  function toggleSaved(id: string) {
    setSaved((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    )
  }
  function focusSearch() {
    if (page !== "home") navigate("home")
    setTimeout(() => {
      inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      inputRef.current?.focus({ preventScroll: true })
    }, 100)
  }
  function howItWorks() {
    if (page !== "home") navigate("home")
    setTimeout(
      () =>
        document
          .getElementById("how-it-works")
          ?.scrollIntoView({ behavior: "smooth" }),
      100,
    )
  }
  const place = resolvePlace(city)
  const reachOrder: Reach[] = ["local", "statewide", "nationwide"]
  const placed = organizations
    .map((org) => ({
      org,
      reach: page === "saved" ? null : reachFor(org, place),
    }))
    .filter(({ org, reach }) =>
      page === "saved" ? saved.includes(org.id) : reach !== null,
    )
    .sort(
      (a, b) =>
        reachOrder.indexOf(a.reach as Reach) -
        reachOrder.indexOf(b.reach as Reach),
    )
  const visible = placed.filter(
    ({ org }) => category === "All communities" || org.category === category,
  )
  const hasLocal = placed.some(({ reach }) => reach !== "nationwide")
  const reachLabel = (reach: Reach | null) =>
    reach === "local"
      ? place.city
        ? `In ${place.city.split(",")[0]}`
        : `In ${place.label}`
      : reach === "statewide"
        ? `Across ${place.state?.name}`
        : reach === "nationwide"
          ? "Nationwide"
          : ""

  return (
    <div className="app-shell">
      <header className="site-header">
        <button
          className="brand"
          onClick={() => navigate("home")}
          aria-label="Our People home"
        >
          <Flower />
          <span>
            our people<span className="brand-dot">.</span>
          </span>
        </button>
        <nav aria-label="Main navigation">
          <button onClick={howItWorks}>How it works</button>
          <button onClick={() => setAbout(true)}>Our why</button>
          <button
            onClick={() => navigate("saved")}
            className={page === "saved" ? "nav-active" : ""}
          >
            <Icon name="heart" size={17} /> My saved{" "}
            <span className="saved-count">{saved.length}</span>
          </button>
        </nav>
        <button className="header-cta" onClick={focusSearch}>
          Find my people <Icon name="arrow" size={18} />
        </button>
      </header>

      {page === "home" ? (
        <main>
          <section className="hero section-wrap">
            <div className="hero-copy">
              <div className="eyebrow">
                <Icon name="sparkle" size={17} /> YOUR NEXT CHAPTER, TOGETHER
              </div>
              <h1>
                New city.
                <br />
                New chapter.
                <br />
                <span>Your people.</span>
                <svg
                  className="text-underline"
                  viewBox="0 0 350 20"
                  aria-hidden="true"
                >
                  <path
                    d="M4 12Q160-5 340 7M20 18Q160 5 320 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </h1>
              <p className="hero-description">
                Life after graduation comes with a lot of new.
                <br className="desktop-break" /> Finding your community
                shouldn’t be the hard part.
              </p>
              <p className="hero-subcopy">
                Discover social gatherings, book clubs, and spaces where
                <br className="desktop-break" /> Black people connect, belong,
                and bloom.
              </p>
              <form className="location-form" onSubmit={search}>
                <label className="sr-only" htmlFor="home-location">
                  Your current or future city
                </label>
                <Icon name="pin" size={22} />
                <input
                  id="home-location"
                  ref={inputRef}
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value)
                    setError("")
                  }}
                  placeholder="Where are you putting down roots?"
                  list="city-options"
                  autoComplete="off"
                  aria-describedby={error ? "location-error" : undefined}
                />
                <button type="submit">
                  Find my people <Icon name="arrow" size={18} />
                </button>
              </form>
              {error && (
                <p className="form-error" id="location-error" role="alert">
                  {error}
                </p>
              )}
              <div className="popular-cities">
                <span>A few places to start:</span>
                {["Atlanta", "New York", "Washington, DC"].map((c) => (
                  <button key={c} onClick={() => search(undefined, c)}>
                    {c}
                    <Icon name="arrow" size={12} />
                  </button>
                ))}
              </div>
              <div className="reassurance">
                <Icon name="heart" size={14} /> For Black people. For every kind
                of new beginning.
              </div>
            </div>
            <div className="hero-art">
              <div className="art-background" />
              <svg
                className="doodle-rays"
                viewBox="0 0 80 70"
                aria-hidden="true"
              >
                <path d="m42 38 3-30M30 42 12 22M54 46l22-12" />
              </svg>
              <div className="main-photo">
                <img
                  src={photos.main}
                  alt="Two Black women sharing a joyful moment together"
                />
                <span className="photo-caption">
                  the kind of connection that feels like home.
                </span>
              </div>
              <div className="small-photo">
                <div className="tape" />
                <img
                  src={photos.friends}
                  alt="A circle of women spending time together outdoors"
                />
                <span>better, together.</span>
              </div>
              <div className="belong-badge">
                <Icon name="heart" size={23} />
                <span>
                  You belong
                  <br />
                  right here.
                </span>
                <Icon name="sparkle" size={13} className="badge-star" />
              </div>
              <Flower className="art-flower" />
              <div className="handwritten-note">
                your people are out there
                <svg viewBox="0 0 130 45" aria-hidden="true">
                  <path d="M5 3c45 35 70 33 107 10m-17-3 20 2-6 18" />
                </svg>
              </div>
            </div>
          </section>
          <div className="community-ribbon">
            <span>LESS SCROLLING. MORE BELONGING.</span>
            <Icon name="sparkle" size={17} />
            <span>REAL CONNECTIONS, IN REAL LIFE.</span>
            <Icon name="sparkle" size={17} />
            <span>YOUR COMMUNITY IS WAITING.</span>
            <Icon name="sparkle" size={17} />
          </div>
          <section className="how-section section-wrap" id="how-it-works">
            <div className="section-heading">
              <div>
                <div className="eyebrow">
                  A LITTLE NUDGE TOWARD YOUR NEXT CHAPTER
                </div>
                <h2>Finding your people, made simple.</h2>
              </div>
              <p>
                You don’t need to have it all figured out.
                <br />
                Just start with where you’re headed.
              </p>
            </div>
            <div className="steps-grid">
              <div className="step">
                <div className="step-icon lavender">
                  <Icon name="pin" size={28} />
                  <span>01</span>
                </div>
                <div>
                  <h3>Drop your pin</h3>
                  <p>
                    Your hometown, your new city, or that place
                    <br className="desktop-break" /> you’re dreaming of moving
                    to.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="step-icon peach">
                  <Icon name="search" size={28} />
                  <span>02</span>
                </div>
                <div>
                  <h3>Find your kind of community</h3>
                  <p>
                    From book clubs to brunch crews, explore
                    <br className="desktop-break" /> spaces that feel like you.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="step-icon sage">
                  <Icon name="people" size={28} />
                  <span>03</span>
                </div>
                <div>
                  <h3>Make the first hello</h3>
                  <p>
                    Save your favorites, show up as yourself,
                    <br className="desktop-break" /> and let the connections
                    grow.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="explore-section section-wrap">
            <div className="section-heading">
              <div>
                <div className="eyebrow">
                  THERE’S A SPACE FOR EVERY SIDE OF YOU
                </div>
                <h2>More than a place. A feeling.</h2>
              </div>
              <button className="text-link" onClick={focusSearch}>
                Explore your community <Icon name="arrow" size={18} />
              </button>
            </div>
            <div className="inspiration-grid">
              {[
                {
                  title: "Your next favorite people",
                  text: "Culture & social connection",
                  image: photos.group,
                  category: "Social & gatherings",
                },
                {
                  title: "A little fresh air, together",
                  text: "Movement & everyday wellness",
                  image: photos.beach,
                  category: "Outdoors & wellness",
                },
                {
                  title: "Good stories. Great company.",
                  text: "Book clubs & creative spaces",
                  image: photos.friends,
                  category: "Books & culture",
                },
              ].map((item) => (
                <button
                  className="inspiration-card"
                  key={item.title}
                  onClick={() => {
                    if (location.trim().length >= 2) {
                      search()
                      setCategory(item.category)
                    } else focusSearch()
                  }}
                >
                  <img
                    src={item.image}
                    alt="Black women enjoying time together"
                  />
                  <div>
                    <span>{item.text}</span>
                    <h3>{item.title}</h3>
                    <Icon name="arrow" />
                  </div>
                </button>
              ))}
            </div>
          </section>
          <section className="why-banner">
            <Flower />
            <div>
              <span>A NOTE FROM US TO YOU</span>
              <h2>
                You deserve a space where you don’t have to explain yourself.
              </h2>
              <p>
                Where your joy is understood. Your story is celebrated. And you
                can just be.
              </p>
            </div>
            <button onClick={() => setAbout(true)}>
              That’s our why <Icon name="arrow" size={18} />
            </button>
          </section>
        </main>
      ) : (
        <main className="results-main section-wrap">
          <button className="back-link" onClick={() => navigate("home")}>
            <span>←</span> Back to your next chapter
          </button>
          <div className="results-heading">
            <div className="eyebrow">
              {page === "saved"
                ? "A LITTLE COLLECTION OF POSSIBILITY"
                : "YOUR FIRST HELLO STARTS HERE"}
            </div>
            <h1>
              {page === "saved" ? (
                <>
                  Your saved <em>spaces.</em>
                </>
              ) : (
                <>
                  Find your people in <em>{city}.</em>
                </>
              )}
            </h1>
            <p>
              {page === "saved"
                ? "The communities you want to come back to. Your next step is reaching out."
                : "A starting point for shared culture, good company, and a little more belonging."}
            </p>
          </div>
          {page === "results" && (
            <>
              <form className="results-search location-form" onSubmit={search}>
                <Icon name="pin" />
                <label className="sr-only" htmlFor="results-location">
                  Change city
                </label>
                <input
                  id="results-location"
                  ref={inputRef}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  list="city-options"
                  placeholder="Enter a city"
                />
                <button type="submit">
                  Explore city <Icon name="arrow" size={18} />
                </button>
              </form>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <div className="directory-note">
                <Icon name="globe" size={20} />
                <p>
                  <strong>Find your next real-life connection.</strong> Explore
                  community websites and Instagram pages for gatherings, local
                  chapters, and events. This is a curated starting point, not
                  verified local listings; confirm availability near{" "}
                  {city === "Your city" ? "you" : city} directly.
                </p>
              </div>
              {!hasLocal && (
                <div className="directory-note">
                  <Icon name="sparkle" size={20} />
                  <p>
                    <strong>
                      We’re still gathering local groups for {city}.
                    </strong>{" "}
                    In the meantime, these nationwide communities have chapters
                    and events across the country.
                  </p>
                </div>
              )}
            </>
          )}
          <div className="filter-row" aria-label="Filter by interest">
            {["All communities", ...categories].map((c) => (
              <button
                className={category === c ? "filter active" : "filter"}
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="results-count">
            {visible.length}{" "}
            {page === "saved" ? "saved" : "communities to explore"}{" "}
            <span>Find the spaces that feel like you.</span>
          </div>
          <div className="organization-grid">
            {visible.map(({ org, reach }) => (
              <article className="organization-card" key={org.id}>
                <div className={`org-cover ${org.color}`}>
                  <Icon name={org.icon} size={42} />
                  <span>{org.category}</span>
                  <button
                    className={
                      saved.includes(org.id)
                        ? "save-button is-saved"
                        : "save-button"
                    }
                    aria-label={`${
                      saved.includes(org.id) ? "Unsave" : "Save"
                    } ${org.name}`}
                    aria-pressed={saved.includes(org.id)}
                    onClick={() => toggleSaved(org.id)}
                  >
                    <Icon name="heart" size={20} />
                  </button>
                </div>
                <div className="org-body">
                  <h2>{org.name}</h2>
                  <p className="org-tagline">{org.tagline}</p>
                  <p className="org-description">{org.description}</p>
                  <div className="org-tags">
                    {reach && <span>{reachLabel(reach)}</span>}
                    {org.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <button className="org-detail" onClick={() => setDetail(org)}>
                    Get to know this community <Icon name="arrow" size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
          {visible.length === 0 && (
            <div className="empty-state">
              <Icon name="heart" size={40} />
              <h2>
                {saved.length
                  ? "No saved spaces in this category (yet)."
                  : "Your people are still out there."}
              </h2>
              <p>
                Explore a few communities and tap the heart to keep them here.
              </p>
              <button
                className="primary-button"
                onClick={() => {
                  if (saved.length) setCategory("All communities")
                  else focusSearch()
                }}
              >
                {saved.length ? "Show all saved spaces" : "Find my people"}
                <Icon name="arrow" size={18} />
              </button>
            </div>
          )}
          <div className="results-end">
            <Icon name="sparkle" />
            <p>
              You don’t have to find your whole circle today. One hello is a
              beautiful start.
            </p>
          </div>
        </main>
      )}
      <footer className="site-footer">
        <button className="brand" onClick={() => navigate("home")}>
          <Flower />
          <span>our people.</span>
        </button>
        <p>Rooted in community. Built for your next chapter.</p>
        <span>Made with care, for us.</span>
      </footer>
      <datalist id="city-options">
        {allCities.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
      <dialog
        ref={modalRef}
        className="community-dialog"
        onCancel={() => {
          setDetail(null)
          setAbout(false)
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setDetail(null)
            setAbout(false)
          }
        }}
        aria-labelledby="dialog-title"
      >
        <button
          className="modal-close"
          aria-label="Close"
          onClick={() => {
            setDetail(null)
            setAbout(false)
          }}
        >
          <Icon name="close" />
        </button>
        {detail ? (
          <>
            <div className={`modal-symbol ${detail.color}`}>
              <Icon name={detail.icon} size={34} />
            </div>
            <div className="eyebrow">{detail.category}</div>
            <h2 id="dialog-title">{detail.name}</h2>
            <p className="modal-tagline">{detail.tagline}</p>
            <p>{detail.description}</p>
            <div className="modal-tip">
              <strong>Your first step</strong>
              <p>
                Visit their website or Instagram to look for gatherings or
                programs{" "}
                {city && city !== "Your city" ? `near ${city}` : "near you"}.
                Check current schedules, fees, and membership requirements
                before making plans.
              </p>
            </div>
            <a
              className="primary-button"
              href={detail.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {detail.url.includes("instagram.com")
                ? "Explore on Instagram"
                : "Visit community website"}{" "}
              <Icon name="arrow" size={18} />
            </a>
            {detail.instagram && detail.instagram !== detail.url && (
              <a
                className="modal-save"
                href={detail.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow the community on Instagram{" "}
                <Icon name="arrow" size={16} />
              </a>
            )}
            <button
              className="modal-save"
              onClick={() => toggleSaved(detail.id)}
            >
              <Icon
                name={saved.includes(detail.id) ? "check" : "heart"}
                size={18}
              />
              {saved.includes(detail.id)
                ? "Saved to your spaces"
                : "Save for later"}
            </button>
          </>
        ) : (
          <>
            <Flower className="about-flower" />
            <div className="eyebrow">OUR WHY</div>
            <h2 id="dialog-title">
              A new chapter shouldn’t mean starting alone.
            </h2>
            <p>
              Graduation, a big move, or a fresh start can be exciting and a
              little lonely. Our People is a gentle starting point for Black
              people of all genders looking for community beyond campus.
            </p>
            <p>
              We believe in the joy of being understood, the comfort of shared
              experiences, and the friendships that begin with one brave hello.
            </p>
            <div className="modal-tip">
              <strong>Connection, not guesswork.</strong>
              <p>
                We share real communities and their websites or Instagram pages,
                from social gatherings and outdoor adventures to book clubs.
                Women-centered spaces are labeled so you can find your fit. This
                is a curated discovery tool, not a live events directory; always
                confirm local availability directly.
              </p>
            </div>
            <button
              className="primary-button"
              onClick={() => {
                setAbout(false)
                focusSearch()
              }}
            >
              Let’s find your people <Icon name="arrow" size={18} />
            </button>
          </>
        )}
      </dialog>
    </div>
  )
}
