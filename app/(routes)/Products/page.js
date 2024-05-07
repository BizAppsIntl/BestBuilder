"use client";
import { useEffect, useState } from "react"

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

import axios from "axios"
// import ToastContainerWrapper from '@/app/components/ToastContainerWrapper'
import { toast } from 'react-toastify';

// import EntryFormProduct from './EntryFormProductMyTextInput'
import EntryFormProduct from './EntryFormProduct'
import { FaUserEdit, FaUserPlus } from "react-icons/fa"
import { HiFire, HiOutlineExclamationCircle } from "react-icons/hi";
import { AlertConfirm, AlertRec } from "@/app/Lib/StdLib"
// import StandardInputPage from "./StandardInputPage";

//import {GET} from '@app/api/items-pool/route.js'
// fetch('@/api/items-pool')
// .then(data => {console.log('\n\n\n\n\n\n\nRECEIVED DATA IN ITS PLACE', data)})
// .catch(error => {console.log('\n\n\n\n\n\n\nERROR IN RECEIVED DATA FOR ITS PLACE', error)})
// fetch(process.env.REACT_APP_API_URL + `Doctors`, { method: 'GET' })

// fetch('@api/items-pool', { method: 'GET' })
//   .then(res => res.json())
//   // .then(data => { setRecAll(data) })
//   .then(data => { console.log('\n\n\n\n\n\n\nRECEIVED DATA IN ITS PLACE', res) })


const REC_DEFAULT = { _id: '', ID: '', IDx: '', Title: '', Cat: '', Desc: '', Rem: '', Unit: '', PPrice: '', SPrice: '', ImageURL: '', ImageFile: null }


export default function Page() {
  const [Recs, setRecs] = useState([])
  const [Rec, setRec] = useState(REC_DEFAULT);

  const [BtnAddnewClicked, setBtnAddnewClicked] = useState(false)
  const [BtnEditClicked, setBtnEditClicked] = useState(false)
  const [BtnClicked, setBtnClicked] = useState('') //''for None, 'A', 'D', 'E'

  const [Need2Refresh, setNeed2Refresh] = useState(false);

  const [OpenModal, setOpenModal] = useState(false);
  const [OpenModal4Del, setOpenModal4Del] = useState(false);
  const [OpenModal4Product, setOpenModal4Product] = useState(false);


  useEffect(() => {
    GetData()

  }, [Need2Refresh])

  // ; toast.success("Success Notification !", {position: "top-center"      }) 


  const GetData = async () => {
    alert('Get Data is Pressed with btnStatus: '+btnStatus)

    // fetch('api/Products', { method: 'GET' })
    //   .then(res => {
    //     res.json();
    //     console.log(`\n\n\n\n\n\n\nRECEIVED RAW ${Date.now} IN Page`, res);
    //   }
    // )
    //   .then(res => {
    //     console.log(`\n\n\n\n\n\n\nRECEIVED DATA ${Date.now} IN Page`, res);
    //     setRecs(res)
    //   })


    // const result = await axios.get(process.env.REACT_APP_API_URL + `Procedure/GetAll`)
    const result = await axios.get(process.env.NEXT_PUBLIC_API_URL + 'Products')
    // console.log(`***************** ${process.env.NEXT_PUBLIC_API_URL} result: `, result); alert(result.data)

    AlertRec(result.data)
    setRecs(result.data)

  }

  // -.-.-.-.[ Handle Buttons ]  -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-
  //AddNew is clicked
  const HandleBtnAddnew = (btnStatus) => {
    // alert('Add button with: '+btnStatus)

    // alert('Add New Clicked with: '+btnStatus)
    if (btnStatus) setBtnEditClicked(false);
    // if (btnStatus) setBtnDeleteClicked(false);

    setBtnAddnewClicked(btnStatus);
  }

  // -.-.-.-.-.-.-.-.-.-.-.
  //EDIT is clicked
  const HandleBtnEdit = (btnStatus) => {
    // alert('Edit button with: '+btnStatus)
    if (btnStatus) setBtnAddnewClicked(false)
    // if (btnStatus) setBtnDeleteClicked(false)

    setBtnEditClicked(btnStatus);
    // setInputReadOnly(false)
  }

  // -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-
  const HandleBtnVoucherMode = (Mode, BtnStatus, Flag2Refresh = false) => {
    // if (Flag2Refresh) setNeed2Refresh(!Need2Refresh)
    setNeed2Refresh(p => !p)

    switch (Mode) {
      case 'Add': HandleBtnAddnew(BtnStatus); break;
      case 'Edit': HandleBtnEdit(BtnStatus); break;
      case 'Del': HandleBtnEdit(BtnStatus); break;

      default: break;
    }
  }
  const HandleBtnClickedMode = (Mode, BtnStatus, Flag2Refresh = false) => {
    // if (Flag2Refresh) setNeed2Refresh(!Need2Refresh)
    setNeed2Refresh(p => !p)

    if (BtnStatus) {
      // setBtnClicked] = useState('') //''for None, 'A', 'D', 'E'
      switch (Mode) {
        case 'Add': setBtnClicked('Add'); setOpenModal4Product(true); break;
        case 'Edit': setBtnClicked('Edit'); setOpenModal4Product(true); break;
        case 'Del': setBtnClicked('Del'); setOpenModal4Product(true); break;
        default: setBtnClicked(''); setOpenModal4Product(false); break;
      }
    }
    else {
      setBtnClicked('')
      setOpenModal4Product(false);
    }
  }

  //-----------------------------------
  const HandleSelected4Del = (rec) => {
    // if (!AlertConfirm(rec, `rec: DELETION is Requested` )) return

    // if (rec.ID > 0) CallNextAPI2Delete(rec.ID)

  }

  //-----------------------------------
  const HandleSelected4Edit = (rec) => {
    setRec(rec)
    HandleBtnEdit(true)
  }


  // --------------------------------------------------------------------------------------------------------------------
  // ------------- Delete  RECORD ----------------
  // --------------------------------------------------------------------------------------------------------------------

  const CallNextAPI2Delete = async (id) => {
    // alert('Now Deleting Data from Database Section val:' + id)

    // const { Id, Title, PicURL, PicURL4Edit } = OrderSheet


    // const res = await axios.delete(process.env.NEXT_PUBLIC_API_URL + `Products/${id}`    )
    axios.delete(process.env.NEXT_PUBLIC_API_URL + `Products/${id}`)
      .then(response => AlertRec(response))
      .catch(error => {
        // setErrorMessage(error.message);
        console.error('There was an error! in Deleting : ', error);
      });
    // toast.warn('Record Deleted Successfully: [' + Title + ']', { theme: 'colored', autoClose: ToastWaitTime, })

    // alert('Record is DELETED from Database')
    setNeed2Refresh(p => !p)

  }


  const notify = () => {
    toast("Default Notification !");

    toast.success("Success Notification !", {
      position: "top-center"
    });

    toast.error("Error Notification !", {
      position: "top-left"
    });

    toast.warn("Warning Notification !", {
      position: "bottom-left"
    });

    toast.info("Info Notification !", {
      position: "bottom-center"
    });

    toast("Custom Style Notification with css class!", {
      position: "bottom-right",
      className: 'foo-bar'
    });
  };

  return (
    <div>
      {/* <pre>RecCount={Recs.length}<br /> {JSON.stringify({ RecordsReceived: Recs }, null, 2)}</pre> */}
      process.env.NEXT_PUBLIC_API_URL: {process.env.NEXT_PUBLIC_API_URL}

      <button onClick={notify}>Notify</button>
      <div>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
          <HiFire className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">Set yourself free.</div>
      </div>

      <h1>Products Page</h1>
      <h2> Detail</h2>

      <div className="flex flex-wrap items-start gap-2">

        {/* Display BUTTON ADD-NEW & CLEAR */}
        {/* {(!(BtnEditClicked || BtnAddnewClicked) && Rec.ID > 0) &&
          <button type="button" className=" btn-primary"
            // onClick={() => { HandleBtnEdit(true) }}>
            onClick={() => { HandleBtnClickedMode('Edit', true) }}>
            Update <FaUserEdit className='mb-1' style={{ width: '20px', height: '20px' }} />
          </button>
        } */}

        {!(BtnEditClicked || BtnAddnewClicked) &&
          <Button className="flex flex-col gap-2" size="xs" onClick={() => { HandleBtnClickedMode('Add', true) }}         >
            <FaUserPlus className='h-5 w-5' />
            <span>Add New Product</span>
          </Button>
        }

        <button className='w-36 h-12 flex gap-2 items-center justify-center rounded-lg border border-gray-400 bg-gray-300  hover:bg-gray-300 hover:text-xl' onClick={() => { HandleBtnClickedMode('Add', true) }}>
          <FaUserPlus size={24} /> Reset
        </button>

        {!(BtnEditClicked || BtnAddnewClicked) &&
          <Button size="" onClick={GetData}> <FaUserPlus className='mr-2 h-5 w-5' />GetRecs</Button>
        }
        {!(BtnEditClicked || BtnAddnewClicked) &&
          <Button size="sm" onClick={GetData}> <FaUserPlus className='mr-2 h-5 w-5' />Refresh Page</Button>
        }

      </div>

      {/* Only if ADD-NEW/Update is Clicked */}
      {/* {((BtnAddnewClicked || BtnEditClicked)) && */}
      {(BtnClicked) && false &&
        < EntryFormProduct

          //Only for Recs transfer in Database Dev purpose
          // CrntRec={BtnAddnewClicked ? REC_DEFAULT : Rec}
          CrntRec={BtnClicked === 'Add' ? REC_DEFAULT : Rec}




          // CrntRec={BtnAddnewClicked ? SetupDBArray ? Rec : RecDefault : Rec}
          //Set empty if AddNew otherwise populate Recs
          //CrntRec={BtnAddnewClicked ? RecDefault : Rec}

          // Suppliers={Suppliers}
          // Categories={DataCategories}
          // Suppliers={Traders}
          Categories={'Cats'}

          // VoucherMode={BtnAddnewClicked ? 'Add' : BtnEditClicked ? 'Edit' :  BtnDeleteClicked ? 'Del':''}
          // VoucherMode={BtnAddnewClicked ? 'Add' : BtnEditClicked ? 'Edit' : ''}
          VoucherMode={BtnClicked}

          // HandleInputs={HandleInputs}
          // HandleInputsMode={HandleInputsMode}

          // HandleBtnVoucherMode={HandleBtnVoucherMode}
          HandleBtnClickedMode={HandleBtnClickedMode}


        // setNeed2Refresh={setNeed2Refresh}
        // Need2Refresh={Need2Refresh}
        />
      }



      <div>Record Count: {Recs.length} </div>
      {/* <span> &nbsp; <img src={"/Icons/icon-edit.jpg"} alt="TEMP" height={36} /></span> */}

      <table style={{ width: '100%' }}>
        <thead>
          <tr className="text-left">
            <th>ID </th>
            <th>Title </th>
            <th>Desc </th>
            <th>Rem </th>
            <th>Unit </th>
            <th>PPrice </th>
            <th>SPrice </th>
            <th>Actions </th>
          </tr>
        </thead>
        <tbody>
          {Recs && Recs?.map((E, I) => {
            return (
              <tr key={I}>
                <td>{E.ID} </td>
                <td>{E.Title} </td>
                <td>{E.Desc} </td>
                <td>{E.Rem} </td>
                <td>{E.Unit} </td>
                <td>{E.PPrice} </td>
                <td>{E.SPrice} </td>
                <td className="flex gap-3 " style={{ width: '100px', textAlign: 'center', verticalAlign: 'middle' }}>
                  {/* EDIT */}
                  {/* <span> &nbsp;  */}
                  {/* <img src={"/Icons/icon-edit.jpg"} alt="E" style={{height:'16px'}}  onClick={() => HandleSelected4Edit(E)} /> */}
                  <img src={"/Icons/icon-edit.jpg"} alt="E" style={{ height: '16px' }} onClick={() => { setRec(E); HandleBtnClickedMode('Edit', true) }} />

                  {/* DELETE Trash */}
                  {/* <img src={"/Icons/TrashBin.png"} alt="D"  style={{height:'20px'}}  onClick={() => HandleSelected4Del(E) } /> */}
                  <img src={"/Icons/TrashBin.png"} alt="D" style={{ height: '20px' }} onClick={() => { setRec(E); HandleBtnClickedMode('Del', true) }} />
                </td>


              </tr>
            )
          })}
        </tbody>
      </table>



      <br />
      <br />
      <br />
      <br />

      <div >
        Button Samples
        <div>
          <div className="flex ">

            {/* me-2 mb-2 py-2.5  px-5 py-2*/}
            <button type="button"
              className="
          flex gap-2 items-center justify-center
                    text-white 
                    text-sm  hover:text-xl
                     h-10 w-32
                    font-medium 
                    rounded-lg 
                    bg-teal-600 hover:bg-teal-800 
                    focus:ring-4 focus:ring-teal-300 
                    focus:outline-none 

                  ">
              <FaUserPlus className='h-6 w-6' />
              CustomSize
            </button>

            <button type="button"
              className=" flex gap-2 items-center justify-center   text-white 
                    text-sm  hover:text-xl
                     h-10 w-32
                    font-medium 
                    rounded-lg 
                    bg-blue-600 hover:bg-blue-700 
                    focus:ring-4 focus:ring-blue-300 
                    focus:outline-none 
                    ">
              <FaUserPlus className='h-6 w-6' />
              CSS controled
            </button>
          </div>
          <div>
            <Button size="md" onClick={() => setOpenModal(true)}>Toggle Standard modal</Button>
            <Button size="lg" onClick={() => setOpenModal4Product(true)}>Product modal</Button>

          </div>
        </div>

      </div>


      {/* START *************     STANDARD MODAL ********************************/}
      {/* <Modal dismissible show={OpenModal} size="xl" popup onClose={() => setOpenModal(false)} > */}
      <Modal show={OpenModal} size="xl" popup onClose={() => setOpenModal(false)} >
        <Modal.Header>Small modal</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput id="email" placeholder="name@company.com" required />
            </div>

            <label for="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
              <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>


            {/* <label for="small_filled" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label> */}
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                {/* <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg> */}
                <FaUserPlus className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </div>
              {/* <input type="search" id="search"     className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required /> */}
              <input type="text" id="small_filled" className="block text-end rounded-t-lg ps-10  pb-1 pt-4 w-full text-md text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              {/* <input type="text" id="small_filled" className="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " /> */}
              <label for="small_filled" className="absolute ps-10 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Small filled</label>
              {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
            </div>




            <label for="ID" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search ID</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                {/* <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg> */}
                <FaUserPlus className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </div>
              {/* <input type="search" id="search"     className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required /> */}
              <input type="text" id="ID" className="block text-end rounded-t-lg ps-10  pb-1 pt-4 w-full text-md text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                Name='ID' readOnly={false}
              />
              {/* <input type="text" id="small_filled" className="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " /> */}
              <label for="ID" className="absolute ps-10 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                Item ID
              </label>
              {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
            </div>

            <div className="relative">
              <input type="text" id="small_filled" className="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="small_filled" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Small filled</label>
            </div>

            <label for="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </span>
              <input type="text" id="website-admin" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="elonmusk" />
            </div>


            <label for="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <div className="flex relative">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </span>
              {/* <input type="text" id="website-admin" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="elonmusk"/> */}

              <input type="text" id="small_filled" className="block rounded-t-lg px-2.5 pb-1.5 pt-4 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="small_filled" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Small filled</label>

            </div>



            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                Lost Password?
              </a>
            </div>
            <div className="w-full">
              <Button>Log in to your account</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
                Create account
              </a>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>            Decline          </Button>

          <Button onClick={() => setOpenModal4Del(true)}>Toggle modal</Button>
        </Modal.Footer>

      </Modal>
      {/* END *************     STANDARD MODAL ********************************/}



      {/* START *************     PRODUCT MODAL ********************************/}
      {/* <Modal dismissible show={OpenModal4Product} size="xl" popup onClose={() => setOpenModal4Product(false)} > */}
      <Modal show={OpenModal4Product} size="3xl" popup onClose={() => { setOpenModal4Product(false) }} >

        <Modal.Header>Product Detail</Modal.Header>
        <Modal.Body>
          {/* <StandardInputPage /> */}
          {/* <EntryFormProduct /> */}
          < EntryFormProduct

            //Only for Recs transfer in Database Dev purpose
            // CrntRec={BtnAddnewClicked ? REC_DEFAULT : Rec}
            CrntRec={BtnClicked === 'Add' ? REC_DEFAULT : Rec}

            Categories={'Cats'}

            // VoucherMode={BtnAddnewClicked ? 'Add' : BtnEditClicked ? 'Edit' :  BtnDeleteClicked ? 'Del':''}
            // VoucherMode={BtnAddnewClicked ? 'Add' : BtnEditClicked ? 'Edit' : ''}
            VoucherMode={BtnClicked}

            // HandleBtnVoucherMode={HandleBtnVoucherMode}
            HandleBtnClickedMode={HandleBtnClickedMode}
          />





        </Modal.Body>

        {/* <Modal.Footer>
          <Button onClick={() => setOpenModal4Product(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal4Product(false)}>            Decline          </Button>

          <Button onClick={() => setOpenModal4Del(true)}>Toggle modal</Button>
        </Modal.Footer> */}

      </Modal>
      {/* END *************     PRODUCT MODAL ********************************/}



      <Modal show={OpenModal4Del} size="md" onClose={() => setOpenModal4Del(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal4Del(false)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal4Del(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>




    </div>
  )
}





