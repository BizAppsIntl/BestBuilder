import { NextResponse } from 'next/server'

import dbConnect from '@/app/api/mongoDB_conn'
import { User } from '@/app/DbModels/UserModel'
import mongoose from 'mongoose'

// dbConnect()

export async function GET() {
  // const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/test');
  dbConnect()
  console.log(`\n\n**********************************************************************
               \n\Making GET Request for Tables from \nat: ${new Date().toLocaleString()}] \n`)

            //    try {
            //     await mongoose.connect(process.env.MONGO_URL, {
            //         useNewUrlParser: true,
            //         useUnifiedTopology: true,
            //         useCreateIndex: true,
            
            //         serverSelectionTimeoutMS: 5000
            //     });
            
            //     console.log('\n<x><x><x><x><x><x><x> Server connected to MongoDb!');
            //   } 
            //   catch (err) {
            //     // throw new DbConnectionError();
            //     console.error('\nERRRRRRRRRROR in Connection', err);
            
            // }
            

               try {
    // const rows = await prisma.items.findMany()
    // await mongoose.connect('mongodb+srv://Muffi:ugKoucNpkiv626qf@clusterx.yag3axg.mongodb.net/?retryWrites=true&w=majority')
      
    const rows = await User.find()
    console.log('\nFetched Data: ', rows, ' DataLength: ', rows?.length, ' rows? true: false => ', rows.length > 0 ? 'true' : 'false')
    return NextResponse.json(rows?.length > 0 ? rows : [])

  }
  catch (error) {
    console.log('\nERRRRRRRRRROR ', error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}





export async function POST(req) {
  // const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/test');

  console.log(`\n\n**********************************************************************
\n\Making POST Request for Tables from PRISMA \nat: ${new Date().toLocaleString()}] \n`)

  try {
    const body = await req.json()
    console.log('\nReceived Data: ', body)

    const rec = new User(body)
    rec.save()
    return NextResponse.json({ message: 'Rec Saved' })

  }
  catch (error) {
    console.log('\nERRRRRRRRRROR ', error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

