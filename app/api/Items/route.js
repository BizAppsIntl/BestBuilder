import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

import dbConnect from '@/app/api/mongoDB_conn'
// import { User } from '@/app/DbModels/UserModel'
import ModelItem from '@/app/DbModels/ModelItem'

// dbConnect()

export async function GET() {
  // const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/test');
  dbConnect()
  console.log(`\n\n**********************************************************************
               \n\Making GET Request for Tables from \nat: ${new Date().toLocaleString()}] \n`)

  try {
    const rows = await ModelItem.find()
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
              \n\Making POST Request for Tables from MONGOOSE \nat: ${new Date().toLocaleString()}] \n`)

  try {
    const body = await req.json()
    console.log('\nReceived Data: ', body)

    const rec = new ModelItem(body)
    rec.save()
    return NextResponse.json({ message: 'Rec Saved', rec: rec })

  }
  catch (error) {
    console.log('\nERRRRRRRRRROR ', error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

