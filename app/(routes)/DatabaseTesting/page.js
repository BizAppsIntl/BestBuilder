"use client";
import { useEffect, useState } from "react"

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

import axios from "axios"
import { toast } from 'react-toastify';

// import EntryFormProduct from './EntryFormProductMyTextInput'
import { FaUserEdit, FaUserPlus } from "react-icons/fa"
import { HiFire, HiOutlineExclamationCircle } from "react-icons/hi";
import { AlertConfirm } from "@/app/Lib/StdLib"

//import {GET} from '@app/api/items-pool/route.js'
// fetch('@/api/items-pool')
// .then(data => {console.log('\n\n\n\n\n\n\nRECEIVED DATA IN ITS PLACE', data)})
// .catch(error => {console.log('\n\n\n\n\n\n\nERROR IN RECEIVED DATA FOR ITS PLACE', error)})
// fetch(process.env.REACT_APP_API_URL + `Doctors`, { method: 'GET' })

// fetch('@api/items-pool', { method: 'GET' })
//   .then(res => res.json())
//   // .then(data => { setRecAll(data) })
//   .then(data => { console.log('\n\n\n\n\n\n\nRECEIVED DATA IN ITS PLACE', res) })


export default function Page() {
  const [Recs, setRecs] = useState([])
  const [Loading, setLoading] = useState(false)


  useEffect(() => {
    GetData()

  }, [])

  // ; toast.success("Success Notification !", {position: "top-center"      }) 


  const GetData = async () => {
    setLoading(true)
    // alert('Welcome in Fetching [GetData]')
    // const result = await axios.get(process.env.REACT_APP_API_URL + `Procedure/GetAll`)
    // const result = await axios.get(process.env.NEXT_PUBLIC_API_URL + 'GetTablesInDatabase')
    // const result = await axios.get(process.env.NEXT_PUBLIC_API_URL + 'GetTablesInDB4mConn')
    const result = await axios.get(process.env.NEXT_PUBLIC_API_URL + 'Users')
    console.log(`***************** ${process.env.NEXT_PUBLIC_API_URL} result: `, result)
    setLoading(false)
    // alert(result.data)

    setRecs(result.data)

  }


  return (
    <div>

      <div className="flex items-center" >
        <div className="flex  h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
          <HiFire className="h-5 w-5" />
        </div>
        <div className="ml-3 font-normal">Database Testing Page</div>
      </div>

      <h2> Table Detail</h2>
      <Button onClick={GetData}>Get Tables from Database  {Loading && <HiFire className="h-5 w-5 animate-pulse" />}</Button>



      <div>Record Count: {Recs.length} </div>
      {/* <span> &nbsp; <img src={"/Icons/icon-edit.jpg"} alt="TEMP" height={36} /></span> */}


      {Recs.length > 0 &&
        <table >
          <tr >
            <th style={{border:'1px solid'}}>Row#</th>
            {Object.keys(Recs[0]).map((r, i) => <th key={i} style={{border:'1px solid'}}>{r}</th>)}

          </tr>

          {Recs?.map((E, I) => {
            return (
              <tr key={I}>
                <td>            #{I}</td>
                {Object.values(E).map((r, i) => <td key={i}>{r}</td>)}

              </tr>
            )

          })}
        </table>
      }
      <pre>RecCount={Recs.length}<br />{JSON.stringify({ RecordsReceived: Recs }, null, 2)}</pre>


    </div>
  )
}





