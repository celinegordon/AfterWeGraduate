// AfterWeGraduate API server
// Serves the built React app (dist/) and the message board routes.
// Secrets come from .env locally and from Render's environment variables.

import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY. Add them to .env (local) or Render (live).')
  process.exit(1)
}

// The secret key stays on the server; the browser never sees it
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY)

const app = express()
app.use(express.json())

// Serve the built React app
app.use(express.static(path.join(__dirname, '../dist')))

// ========================================================
// Message Board Routes
// (must stay above the app.get('*') fallback below)
// ========================================================

// GET /messages: return the 20 newest messages
app.get('/messages', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) throw error

    res.json({ success: true, messages: data })
  } catch (error) {
    console.error('Get messages error:', error)
    res.status(500).json({ success: false, message: error.message || 'Error loading messages' })
  }
})

// POST /messages: body { name, text }, save a new message
app.post('/messages', async (req, res) => {
  const { name, text } = req.body

  // Reject an empty message (only spaces counts as empty)
  if (!text || !text.trim()) {
    return res.status(400).json({ success: false, message: 'Message cannot be empty.' })
  }

  try {
    const { error } = await supabase
      .from('messages')
      .insert({ name: name?.trim() || 'Anonymous', text: text.trim() })

    if (error) throw error

    res.json({ success: true, message: 'Message posted.' })
  } catch (error) {
    console.error('Post message error:', error)
    res.status(500).json({ success: false, message: error.message || 'Error posting message' })
  }
})

// Fallback: send the React app for any other URL
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// Render sets PORT; locally it defaults to 5000
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
