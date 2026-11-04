import { useEffect, useState } from "react"
import type { FormEvent } from "react"

type Message = {
  id: number
  created_at: string
  name: string
  text: string
}

// The community board: anyone can post, everyone sees the 20 newest messages.
// There's no login yet, so the visitor types their name (remembered in this browser).
export default function MessageBoard({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [name, setName] = useState(() => {
    try {
      return localStorage.getItem("awg-board-name") || ""
    } catch {
      return ""
    }
  })
  const [text, setText] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(true)
  const [posting, setPosting] = useState(false)

  // Ask the server for the newest messages
  async function loadMessages() {
    try {
      const response = await fetch("/messages")
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      setMessages(data.messages || [])
    } catch (error) {
      setStatus(
        "Could not load messages: " +
          (error instanceof Error ? error.message : "server not reachable"),
      )
    } finally {
      setLoading(false)
    }
  }

  // Load once, when the board first appears
  useEffect(() => {
    loadMessages()
  }, [])

  // Remember the name for next time
  useEffect(() => {
    try {
      localStorage.setItem("awg-board-name", name)
    } catch {
      // storage blocked; nothing to do
    }
  }, [name])

  async function handlePost(e: FormEvent) {
    e.preventDefault()
    if (!text.trim()) {
      setStatus("Message cannot be empty.")
      return
    }
    setPosting(true)
    try {
      const response = await fetch("/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, text }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message)
      setText("")
      setStatus("")
      await loadMessages() // refresh so the new message shows
    } catch (error) {
      setStatus(
        "Error posting message: " +
          (error instanceof Error ? error.message : "server not reachable"),
      )
    } finally {
      setPosting(false)
    }
  }

  return (
    <main className="results-main section-wrap board-main">
      <button className="back-link" onClick={onBack}>
        <span>←</span> Back to your next chapter
      </button>
      <div className="results-heading">
        <div className="eyebrow">SAY HELLO TO YOUR PEOPLE</div>
        <h1>
          The community <em>board.</em>
        </h1>
        <p>
          Moving somewhere new? Looking for a brunch crew? Leave a note for
          everyone who stops by.
        </p>
      </div>

      <form className="board-form" onSubmit={handlePost}>
        <label htmlFor="board-name">Your name</label>
        <input
          id="board-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First name is fine"
          maxLength={60}
        />
        <label htmlFor="board-text">Your message</label>
        <textarea
          id="board-text"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            setStatus("")
          }}
          placeholder="Just moved to Atlanta and looking for a book club!"
          rows={3}
          maxLength={500}
        />
        <button type="submit" className="primary-button" disabled={posting}>
          {posting ? "Posting..." : "Post"}
        </button>
        {status && (
          <p className="form-error" role="alert">
            {status}
          </p>
        )}
      </form>

      <ul className="board-list" aria-live="polite">
        {loading && <li className="board-empty">Loading messages...</li>}
        {!loading && messages.length === 0 && (
          <li className="board-empty">No messages yet. Be the first hello!</li>
        )}
        {messages.map((msg) => (
          <li key={msg.id} className="board-message">
            <div className="board-meta">
              <strong>{msg.name}</strong>
              <span>{new Date(msg.created_at).toLocaleString()}</span>
            </div>
            <p>{msg.text}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
