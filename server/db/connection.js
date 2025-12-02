import { MongoClient, ServerApiVersion } from "mongodb";

const URI = process.env.ATLAS_URI;
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    tls: true,
    tlsAllowInvalidCertificates: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
  console.error(err);
}

let db = client.db("iditarodTracker");

export default db;