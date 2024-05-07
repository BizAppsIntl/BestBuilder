import { NextResponse } from 'next/server'
import mongoose from 'mongoose'

import dbConnect from '@/app/api/mongoDB_conn'
// import { User } from '@/app/DbModels/UserModel'
import ModelProduct from '@/app/DbModels/ModelProduct'

import { useRouter } from 'next/router'
 
// export default function Page() {
//   const router = useRouter()
//   return <p>Post: {router.query.slug}</p>
// }


// ==============================================================
//-----------[        GET Request to Get Rec - By Text/Title        ]
// ==============================================================
// router.get('/DB-Rec/:id', async (req, res) => {
//  export async function GET(req, route) {   //  route.params.id

// export async function GET(req, route) {   //  route.params.id
// export const GetByTxt = async function (req, res) {

export const GET = async function (req, route) {
  const router = useRouter()
  //   return <p>Post: {router.query.slug}</p>
  console.log({ReceivedInGetRequest_route_params_id: route.params.id, UseRouter_query_slug: router.query.slug})
  return NextResponse.json({Req: req, route: route, router: router})

dbConnect()
console.log(`\n\n****(GET Request)***[at: ${new Date().toLocaleString()}]**********************************************************`)
console.log('\nMODEL: ', ModelProduct)

console.log('-------[GET REC ] req:', req)
console.log('-------[GET REC ] route.params.id:', route.params.id)

// console.log('-------[GET REC ]------------------------params', req.params)
// console.log('GetAll- post request Body: ', req.body);


  // const keyword = req.body.Txt
  //   ? {
  //     $or: [
  //       {
  //         Name: {
  //           $regex: req.body.Txt,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         FName: {
  //           $regex: req.body.Txt,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   }
  //   : {}
  // console.log('Keyword: ', keyword);

  try {
    //  $options: 'i' is used for Case insensitivity 
    // const tempRec = await recTranD.find({
    //   $or: [
    //     { VCat: { $regex: req.body.VCat, $options: 'i' } },
    //     { FName: { $regex: req.body.Txt, $options: 'i' } }
    //   ]
    // })

    // const rows = await ModelProduct.findOne({ ID: route.params.id  })
    const rows = await ModelProduct.find({ ID: route.params.id  })
    console.log('\nFetched Data: ', rows, ' DataLength: ', rows?.length, ' rows? true: false => ', rows.length > 0 ? 'true' : 'false')
    return NextResponse.json(rows?.length > 0 ? rows : [])

    // res.status(201).send(Recs);
  }
  catch (e) {
    // res.status(400).send(e);
    console.log('\nERRRRRRRRRROR ', e)
    return NextResponse.json({ message: e.message }, { status: 500 })
    }
}

// *=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=**=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*
// -----------[        UPDATE /EDIT  - By ID        ]
// *=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=**=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*
export const PUT = async function (req, route) {

  dbConnect()
  console.log(`\n\n****(UPDATE/PUT Request)***[at: ${new Date().toLocaleString()}]**********************************************************`)
  console.log('\nMODEL: ', ModelProduct)
  
  console.log('-------[UPDATE REC ] req:', req)
  console.log('-------[UPDATE REC ] route.params.id:', route.params.id)
  
  // console.log('-------[GET REC ]------------------------params', req.params)
  const body = await req.json()
  console.log('\nReceived Data for UPDATE: ', body)
  
  try {
    // const rows = await ModelProduct.findOne({ ID: route.params.id  })
    // const rows = await ModelProduct.find({ ID: route.params.id  })

    // let Rec = await ModelProduct.findOneAndUpdate({ Code: req.params.Code }, req.body)
    let Rec = await ModelProduct.updateOne({ ID: route.params.id }, body.Data)
    console.log('-----Updated Record: ', Rec)
    return NextResponse.json({Message: 'Updated  Successfully', Rec:Rec})

    // res.status(201).send(Recs);
  }
  catch (e) {
    // res.status(400).send(e);
    console.log('\nERRRRRRRRRROR ', e)
    return NextResponse.json({ Message: e.message }, { status: 500 })
    }
}

// *=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=**=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*
//-----------[        DELETE  - By ID        ]
// *=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=**=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*
export const DELETE = async function (req, route) {

  dbConnect()
  console.log(`\n\n****(DELETE Request)***[at: ${new Date().toLocaleString()}]**********************************************************`)
  console.log('\nMODEL: ', ModelProduct)
  
  console.log('-------[GET REC ] req:', req)
  console.log('-------[GET REC ] route.params.id:', route.params.id)
  
  // console.log('-------[GET REC ]------------------------params', req.params)
  // const body = await req.json()
  // console.log('\nReceived Data for UPDATE: ', body)
  
  try {
    // const rows = await ModelProduct.findOne({ ID: route.params.id  })
    // const rows = await ModelProduct.find({ ID: route.params.id  })

    // const Rec = await recItems.findOneAndDelete({ Code: req.params.Code });
    // const Rec = await recTranM.findOneAndDelete({ _id:  req.params.id });
    // const RecM = await recItems.deleteOne({ _id: ID });
    // const Rec = await recItems.deleteMany({ Cat: req.params.Cat });
    //------------------------------------------------------

    // let Rec = await ModelProduct.findOneAndUpdate({ Code: req.params.Code }, req.body)
    let Res = await ModelProduct.deleteOne({ ID: route.params.id })
    console.log('-----Deleted Record: ', Res)
    return NextResponse.json({Message: 'Deleted  Successfully', Res:Res})

    // res.status(201).send(Recs);
  }
  catch (e) {
    // res.status(400).send(e);
    console.log('\nERRRRRRRRRROR ', e)
    return NextResponse.json({ Message: e.message }, { status: 500 })
    }
}


