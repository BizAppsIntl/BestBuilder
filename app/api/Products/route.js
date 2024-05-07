import { NextResponse } from 'next/server'
// import { useRouter } from 'next/router'
import mongoose from 'mongoose'

import dbConnect from '@/app/api/mongoDB_conn'
// import { User } from '@/app/DbModels/UserModel'
import ModelProduct from '@/app/DbModels/ModelProduct'

// dbConnect()

export async function GET() {
  // export const GET = async function (req, route) {
  // export const GET = async function (req, route) {
    // const router = useRouter()
    //   return <p>Post: {router.query.slug}</p>
    // console.log({ReceivedInGetRequest_route_params_id: req, route})
    //console.log({ReceivedInGetRequest_route_params_id: route.params.id, UseRouter_query_slug: router.query.slug})
    // return NextResponse.json({Req: req, route: route, router: router})
    // return NextResponse.json({Req: req,  route: route})

    
  // const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/test');
  dbConnect()
  console.log(`\n\n****(GET ALL Request)***[at: ${new Date().toLocaleString()}]**********************************************************`)
  console.log('\nMODEL: ', ModelProduct)

  try {
    const rows = await ModelProduct.find()
    // console.log('\nFetched Data: ', rows, ' DataLength: ', rows?.length, ' rows? true: false => ', rows.length > 0 ? 'true' : 'false')
    console.log('\nFetched Data Rows: ', 'rows', ' DataLength: ', rows?.length, ' rows? true: false => ', rows.length > 0 ? 'true' : 'false')
    return NextResponse.json(rows?.length > 0 ? rows : [])

  }
  catch (error) {
    console.log('\nERRRRRRRRRROR ', error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}




// ==============================================================
//-----------[        POST Request to Get Rec - By Text/Title        ]
// ==============================================================
export async function POST(req, param) {
  // const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/test');

  dbConnect()
  console.log(`\n\n****(POST Rec Request)***[at: ${new Date().toLocaleString()}]**********************************************************`)
  console.log('\nRecvd for Posting>> req: ', req)
  console.log('\nRecvd for Posting>> route: ', param)
  console.log('\nMODEL: ', ModelProduct)

  const body = await req.json()
  console.log('\nReceived Data for POSTING int DatabaseTable: ', body.Data)

  try {

    // const rec = new ModelProduct(body)
    // rec.save()
    const rec = await ModelProduct.create(body.Data)
    console.log('\nDB Response after SavingNewRecord: ', rec)

    return NextResponse.json({ message: 'Rec Saved', rec: rec })

  }
  catch (error) {
    console.log('\nERRRRRRRRRROR ', error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}



