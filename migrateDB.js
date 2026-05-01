import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const migrate = async () => {
  const localUri = "mongodb://127.0.0.1:27017/portfolio";
  let remoteUri = process.env.MONGO_URI;
  
  if (remoteUri.endsWith(".net/")) {
    remoteUri += "portfolio";
  }

  console.log("Connecting to Local DB...", localUri);
  const localDb = mongoose.createConnection(localUri);
  
  console.log("Connecting to Remote DB...", remoteUri);
  const remoteDb = mongoose.createConnection(remoteUri);

  // Wait for connections
  await Promise.all([
    new Promise(res => localDb.once('open', res)),
    new Promise(res => remoteDb.once('open', res))
  ]);

  console.log("Connections established.");

  const collections = ["profiles", "projects", "experiences", "skills", "messages"];

  try {
    for (const collName of collections) {
      console.log(`\nMigrating ${collName}...`);
      
      // Fetch all from local
      const docs = await localDb.db.collection(collName).find({}).toArray();
      console.log(`Found ${docs.length} documents in local DB.`);

      if (docs.length > 0) {
        // Clear remote
        await remoteDb.db.collection(collName).deleteMany({});
        console.log(`Cleared remote ${collName} collection.`);

        // Insert into remote
        await remoteDb.db.collection(collName).insertMany(docs);
        console.log(`Successfully migrated ${docs.length} ${collName}.`);
      } else {
        console.log(`No documents to migrate for ${collName}.`);
      }
    }

    console.log("\nMigration completed successfully!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    localDb.close();
    remoteDb.close();
    process.exit(0);
  }
};

migrate();
