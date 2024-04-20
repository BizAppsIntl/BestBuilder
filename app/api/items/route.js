// import pool from "../mysql";
import  MySQL_Conn from "../mysql_conn";
import { NextResponse } from "next/server";

export async function GET(){
  console.log('\n\n\n\Trying to send GET Request for Items: \n', 
  `Host: ${process.env.NEXT_PUBLIC_HOST}\n,  User: ${process.env.NEXT_PUBLIC_USER}\n,  DB: ${process.env.NEXT_PUBLIC_DB}\n,  PW: ${process.env.NEXT_PUBLIC_PW} \n`)

  try {
    const results = await new Promise ((resolve, reject)=>{
      // MySQL_Conn.query('SELECT * FROM `bb-items`;', (err, results)=>{
      // MySQL_Conn.query('SELECT * FROM `BB-Items`;', (err, results)=>{
      MySQL_Conn.query('select 1 + 2 as three;', (err, results)=>{
        if (err){reject(err)}
        else {resolve(results)}
      })    

    });
    console.log('\n\n\n\Fetched Results', results)
    
    return NextResponse.json(results)
  }
  catch (error) {
    console.log('\n\n\n\nERRRRRRRRROR in Fetching: ', error)
    throw error
    NextResponse.json({message: error.message}, {status:500})
  }
}
