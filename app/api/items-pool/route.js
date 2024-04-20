import pool from "../mysql";
// import  MySQL_Conn from "../mysql_conn";
import { NextResponse } from "next/server";

export async function GET(){
  console.log('\n\n\n\Trying to send GET Request for Items: \n', 
  `Host: ${process.env.NEXT_PUBLIC_HOST},\n  User: ${process.env.NEXT_PUBLIC_USER},\n  DB: ${process.env.NEXT_PUBLIC_DB},\n  PW: ${process.env.NEXT_PUBLIC_PW} \n`)

  try {
    const conn = await pool.getConnection();
    console.log('\n\n\n\Connected to the Database', conn)
    // const [rows] = await conn.query('SHOW TABLES FROM `bizapps_db`;')
    //MySQL_Conn.query('select 1 + 2 as three;', (err, results)=>{

    // const [rows] = await conn.query('SELECT * FROM `bb-items`;')
    const [rows] = await conn.query('SHOW TABLES FROM `defaultdb`;')

    // const [rows] = await conn.query('SELECT * FROM bb-items;')
    // const [rows] = await conn.query("SELECT * FROM bizapps_db.bb-items;")
    console.log('\nFetched Data: ', rows)

    conn.release()
    return rows;
    return NextResponse.json(results)
  }
  catch (error) {
    console.log('\n\n\n\nERRRRRRRRROR in Fetching: ', error)
    throw error
    NextResponse.json({message: error.message}, {status:500})
  }
}

