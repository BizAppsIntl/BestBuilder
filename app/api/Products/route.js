import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

import dbConnect from '@/app/api/mongoDB_conn'
// import { User } from '@/app/DbModels/UserModel'
import ModelProduct from '@/app/DbModels/ModelProduct'

// dbConnect()

export async function GET() {
  // const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/test');
  dbConnect()
  console.log(`\n\n****(GET ALL Request)***[at: ${new Date().toLocaleString()}]**********************************************************`)
  console.log('\nMODEL: ', ModelProduct)

  try {
    const rows = await ModelProduct.find()
    console.log('\nFetched Data: ', rows, ' DataLength: ', rows?.length, ' rows? true: false => ', rows.length > 0 ? 'true' : 'false')
    return NextResponse.json(rows?.length > 0 ? rows : [])

  }
  catch (error) {
    console.log('\nERRRRRRRRRROR ', error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}





export async function POST(req, param) {
  // const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/test');

  dbConnect()
  console.log(`\n\n****(POST Rec Request)***[at: ${new Date().toLocaleString()}]**********************************************************`)
  console.log('\nRecvd for Posting>> req: ', req)
  console.log('\nRecvd for Posting>> route: ', param)
  console.log('\nMODEL: ', ModelProduct)

  const body = await req.json()
  console.log('\nReceived Data: ', body)

  try {

    const rec = new ModelProduct(body)
    rec.save()
    return NextResponse.json({ message: 'Rec Saved', rec: rec })

  }
  catch (error) {
    console.log('\nERRRRRRRRRROR ', error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}



