import Link from "next/link";
import TopNav from "./components/Nav/TopNav";

// // import pool from "../../mysql";
// import PoolConn from "../../mysql";

// const fetchDataFromDB = async () => {
//   console.log('\n\n\n\[          HOMEPAGE---          ]\nTrying to create Pool for GET Request for Items-Pool: \n', 
//   `Host: ${process.env.NEXT_PUBLIC_HOST}\n,  User: ${process.env.NEXT_PUBLIC_USER}\n,  DB: ${process.env.NEXT_PUBLIC_DB}\n,  PW: ${process.env.NEXT_PUBLIC_PW} \n`)

//   try {
//     // const conn = await pool.getConnection();
//     console.log('\nConnected to the Database\n========================')

//     // const [rows] = await conn.query('SHOW TABLES FROM `bizapps_db`;')
//     // const [rows] = await conn.query(`SHOW TABLES FROM ${'bizapps_db'};`)

//     // const [rows] = await conn.query(`SELECT * FROM ${'bb_items'};`)
//     // conn.release()

//     const [rows] = await PoolConn.query(`SELECT * FROM ${'bb_items'};`)
//     // const [rows] = await conn.query("SELECT * FROM bizapps_db.bb-items;")
//     console.log('\nFetched Data: ', rows)

//     return rows;
//   }
//   catch (error) {
//     console.log('\n\n\n\nERRRRRRRRROR in Fetching: ', error)
//     throw error
//   }
// }




export default function Home() {

  // fetchDataFromDB()
  // .then(data => {console.log('\n\n\n\n\n\n\nRECEIVED DATA IN ITS PLACE', data)})
  // .catch(error => {console.log('\n\n\n\n\n\n\nERROR IN RECEIVED DATA FOR ITS PLACE', error)})


  return (
    // <main className="px-4 md:xl:px-16  min-h-screen   flex flex-col justify-between border border-red-600">
    <main style={{ '--image-url': `url(${'/SiteImages/Default/UC-5.png'})`, '--image-url2': `url(${'/SiteImages/Default/UC-4.png'})` }}
      className={"bg-[image:var(--image-url)] bg-no-repeat bg-top bg-auto h-screen "
        // + " hover:bg-[image: var(--image-url)]  focus:bg-[image:var(--image-url)] hover:bg-top hover:z-50 hover:bg-auto" 
      } >

      {/* className='hover:bg-[image:var(--image-url)] focus:bg-[image:var(--image-url)] ...' */}

      {/* //////// SAMPLES */}
      {/* <div class="bg-[url('/img/hero-pattern.svg')]">
  <!-- ... -->
</div> */}
      {/* style={{backgroundImage: `url(${fetchedImgSrc})`}} */}
      {/* //////// This application of custom properties can be used for implementing dynamic values with tailwind like colors fetched from an API. */}
      {/* <div
  style={{'--color': fetchedColor}} 
  className='text-[color:var(--color)]'>
    <!-- ... -->
</div> */}


      host:{process.env.NEXT_PUBLIC_HOST},
      user:{process.env.NEXT_PUBLIC_USER},
      password:{process.env.NEXT_PUBLIC_PW},
      database:{process.env.NEXT_PUBLIC_DB},

      <p className="block">Mobile Screen</p>
      <p className="hidden sm:block">sm- small screen</p>
      <p className="hidden md:block">md- medium screen</p>
      <p className="hidden lg:block">lg- large screen</p>
      <p className="hidden xl:block">xl- extra large</p>
      <p className="hidden 2xl:block">2xl</p>

      <br />
      <br />

      <ul>
        <li><Link href='/About'>About</Link></li>
        <li><Link href='/Contact'>Contact Us</Link></li>
      </ul>

      <br />
      App Used by:
      <img src={"/Users/User2015-11-19.jpg"} alt="User" className='rounded-full md:w-[50px] md:h-[50px]' />

      {/* <TopNav /> */}


    </main>
  )
}
