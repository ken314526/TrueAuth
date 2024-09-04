import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export async function connect() {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI!);
    connection.isConnected = db.connections[0].readyState;

    const connectionDB = mongoose.connection;

    connectionDB.on("connected", () => {
      console.log("MongoDB Connected");
    });

    connectionDB.on("error", (err) => {
      console.log("MongoDB Connection Error");
      console.log(err);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong while connectinig to DB");
    console.log(error);
  }
}
