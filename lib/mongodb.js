import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise

// If no URI is provided, avoid throwing during build — return a resolved
// promise so Next.js can complete the build. Runtime API routes should
// handle a null client if they require a real database connection.
if (!uri) {
  console.warn('MONGODB_URI not set — skipping MongoDB connection during build')
  clientPromise = Promise.resolve(null)
} else {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }
}

export default clientPromise