import { NextResponse } from 'next/server'


export async function GET() {
  console.log(`\n\n**********************************************************************\nTEST API CALLED`)
  console.log(`\nat: ${new Date().toLocaleString()}] \n*************************************************************************************************`)


  return NextResponse.json({message:`Welcome in the Wonderful World of Music [at: ${new Date().toLocaleString()}]`})

}