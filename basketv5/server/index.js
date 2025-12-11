import express from 'express'
import path from 'path'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'

const app = express()
app.use(cors())
app.use(express.json())

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017'
const MONGO_DB = process.env.MONGO_DB || 'Details.info'

let db
async function connectDB() {
  const client = new MongoClient(MONGO_URI)
  await client.connect()
  db = client.db(MONGO_DB)
  console.log('Connected to MongoDB', MONGO_URI, MONGO_DB)
}

connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err)
  process.exit(1)
})

app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' })
  const users = db.collection('users')
  const exists = await users.findOne({ email })
  if (exists) return res.status(409).json({ message: 'User already exists' })
  const hash = await bcrypt.hash(password, 10)
  await users.insertOne({ name, email, passwordHash: hash, createdAt: new Date() })
  res.json({ message: 'User created' })
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' })
  const users = db.collection('users')
  const user = await users.findOne({ email })
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
  res.json({ message: 'Logged in', user: { name: user.name, email: user.email } })
})

// Serve production build when available
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API server listening on ${PORT}`))
