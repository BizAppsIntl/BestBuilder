import mongoose from 'mongoose'

const MongoDbConn ={}

export default async function dbConnect(){
  // execute: async () => {
    console.log('[\n\nStart Connecting]\nXXXXXXXXXXXXXXXXXXXXXXXXXXxxxxx')  
    console.log('\nMongoDB Connection String:\n', process.env.MONGO_URL)  
  
    let timeout = 25;
    while (mongoose.connection.readyState === 0) {
      if (timeout === 0) {
        console.log('timeout');
        throw new Error(
          'timeout occured with mongoose connection',
        );
      }
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      timeout--;
    }
    console.log(
      'Database connection status:',
      mongoose.connection.readyState,
    );
  // }  
}



export  async function dbConnectX(){
  if (MongoDbConn.IsConnected) return
  console.log('[\n\nStart Connecting]XXXXXXXXXXXXXXXXXXXXXXXXXXxxxxx')  
  console.log('\nMongoDB Connection String:\n', process.env.MONGO_URL)  




  // const db = await mongoose.connect(process.env.MONGO_URL)
  // console.log('\n\nMongoDB Connection Status:\n', db)  
  // MongoDbConn.IsConnected= db.connections[0].readyState
  // console.log('[END Connecting]XXXXXXXXXXXXXXXXXXXXXXXXXXxxxxx')  
 
  try {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,

        serverSelectionTimeoutMS: 5000
    });

    console.log('\n<x><x><x><x><x><x><x> Server connected to MongoDb!');
    MongoDbConn.IsConnected= db.connections[0].readyState
    console.log('[\nEND Connecting]XXXXXXXXXXXXXXXXXXXXXXXXXXxxxxx')  
  } 
  catch (err) {
    // throw new DbConnectionError();
    console.error('\nERRRRRRRRRROR ', err);

}



}

