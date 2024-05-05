"use client"

import React, { useEffect, useState } from 'react'
import axios from "axios"

import { AlertRec, AlertConfirm } from '@/app/Lib/StdLib'


import NF from 'react-number-format'
import Moment from 'moment'
import ReactDatePicker from 'react-datepicker'

import Image from 'next/image'
import { Input } from 'postcss'
import InputByAdaamText from '@/app/components/MyInputFloatingLabel/InputByAdaamText'
import InputByAdaamNumber from '@/app/components/MyInputFloatingLabel/InputByAdaamNumber'
import InputByAdaamDate from '@/app/components/MyInputFloatingLabel/InputByAdaamDate'
import InputByAdaamSelect from '@/app/components/MyInputFloatingLabel/InputByAdaamSelect'
import { TbWiperWash } from 'react-icons/tb'
import { VscSaveAs } from 'react-icons/vsc'
import { CgCloseO } from 'react-icons/cg'


// const REC = { ID: '', IDx: '', Title: '', Cat: '', Des: '', Rem: '', Unit: '', PPrice: '', SPrice: '', PicURL: '', ImageFile: null }

export default function Page(props) {
  // const { VoucherMode, CrntRec, Categories, HandleInputs, HandleInputsMode, HandleBtnVoucherMode} = props
  // const { VoucherMode, CrntRec, Categories, HandleBtnVoucherMode } = props
  const { VoucherMode, CrntRec, Categories, HandleBtnClickedMode } = props

  // const [Rec, setRec] = useState({ REC })

  const [OrderSheet, setOrderSheet] = useState(CrntRec ? CrntRec : '')
  const [Need2Refresh, setNeed2Refresh] = useState(false);
  const [ABCDEF, setABCDEF] = useState(false);


  useEffect(() => {
    // if (!VoucherMode ) { alert('Empty VoucherMode- trying to return'); return }
    // console.log('Rcvd CrntRec', CrntRec)
    // DispRecInAlert(CrntRec,'Rcvd CrntRec')

    // if (CrntRec) {    AlertRec (CrntRec, 'crntRec');setOrderSheet(CrntRec)}
    setOrderSheet(VoucherMode == 'Add' ? { ...CrntRec, ID: '', PicURL: '' } : CrntRec)
    // document.getElementById('SelectPhoto').focus();
  }, [Need2Refresh]);


  // ==============================================================
  //CLEAR Rec is clicked
  //   const HandleBtnClear = () => { alert('Clear pressed'); setRec4M(RecDefault4M) }
  const HandleBtnReset = () => { setNeed2Refresh(p => !p) }

  // ==============================================================
  //CANCEL changes is clicked
  //   const HandleBtnCancel = () => { alert('Cancelled pressed'); setBtnEditClicked(false); setBtnAddnewClicked(false); setInputReadOnly(true); setRec4M(RecDefault4M) }
  const HandleBtnCancel = (Flag2Refresh) => {
    // HandleBtnVoucherMode(VoucherMode, false, Flag2Refresh);
    HandleBtnClickedMode(VoucherMode, false, Flag2Refresh);
  }

  // ==============================================================
  //SAVE changes is clicked
  const HandleBtnSave = (e) => {
    e.preventDefault();

    // AlertRec(OrderSheet, 'Saving Data is Triggered :' + VoucherMode);
    switch (VoucherMode) {
      //case 'Edit': CallDotAPI2SaveUpdate(); break;
      case 'Add':
      case 'Edit': CallNextAPI2SaveAddNew(); break;
      case 'Del': CallNextAPI2Delete(); break;

      default: break;
    }
  }


  // -.-.-.-.[ Handle INPUTs ]  -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-
  const HandleInputs = (key, value) => {
    // console.log('******************** e: ', e)
    // alert('Received for : '+e.target.name+ ' value: '+e.target.value)
    setOrderSheet({ ...OrderSheet, [key]: value })
  }

  const HandleInputsNumberFormat = (field, value) => {
    // console.log('******************** field: ', field, ' value: ', value)
    // alert('Received for : '+e.target.name+ ' value: '+e.target.value)
    setOrderSheet({ ...OrderSheet, [field]: value })
  }

  const HandleInputsDatePicker = (field, date) => {
    // console.log('******************** field: ', field, ' date: ', date)
    // alert('Received for field: ' + field + ' date: ' + date)
    setOrderSheet({ ...OrderSheet, [field]: date })
  }

  const HandleInputsSelect = (field, e) => {
    // console.log('******************** field: ', field, ' Object-e: ', e)
    //  alert('Received for field: '+field+ ' value: '+e.value)

    // let key = '', value = '';
    //  console.log('\n\n\nInput Done: obj:', obj, ' e: ', e)
    // console.log('\n\n\nInput Done: obj:', obj, ' e: ', e,' e.label: ', e.label, ' e.value: ', e.value, " e.label.indexOf(';'): ", e.label.indexOf(';'));
    // if (e) console.log( 'e is ok')     //e is null
    // else console.log( 'e is not ok')

    switch (field) {
      case 'IDx':
        if (e) setOrderSheet({ ...OrderSheet, [field]: e.value })
        else setOrderSheet({ ...OrderSheet, [field]: '' })
        break;

      default:    //Title, Phone, City
        if (e) {
          if (e.label.indexOf(';') >= 0)
            setOrderSheet({ ...OrderSheet, [field]: e.label.substr(0, e.label.indexOf(';')) });
          else
            setOrderSheet({ ...OrderSheet, [field]: e.label });
        }

        else setOrderSheet({ ...OrderSheet, [field]: '' })
    }

  }

  // -.-.-.-.[ Handle INPUTs ]  -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-



  const HandleBtnDelImg = () => {
    // setSelectedImgInURL('')
    // setSelectedImgFile(null)
    setOrderSheet({ ...OrderSheet, PicURL: '', ImageFile: null })
  }

  const HandleOnChangeFileBrowser = async (e) => {

    // alert('setting file in Page')
    // const FilesList = e.target.files
    const Files = [...e.target.files]
    const data = new FormData()

    for (const file of Files) {
      data.append('file', file)
    }

    // setSelectedImgInURL(URL.createObjectURL(Files[0]))
    // setSelectedImgFile(Files[0])
    setOrderSheet({ ...OrderSheet, PicURL: URL.createObjectURL(Files[0]), ImageFile: Files[0] })

  }

  // =======================================================================
  // ==================[  Fns: DATABASE/ API Handling ]=====================
  // =======================================================================
  // --------------------------------------------------------------------------------------------------------------------
  // ------------- AddNew/Create RECORD ----------------
  // --------------------------------------------------------------------------------------------------------------------

  const CallNextAPI2SaveAddNew = async () => {
    // AlertRec(OrderSheet, 'Data Ready to Send')
    // const { Code, RecStatus, CatCode, Title, TitleU, TCode, Priority, Pic, PicURL, Unit, QtyDef, QtyInc, QtyStep, Price, Desc, Rem,  CrntBal, QtyMin, QtyMax } = OrderSheet
    // const { Id, Code, Title, CatCode, Desc, Rem, Pic, PicURL, PicURL4Edit, Unit, ShareRef, ShareDoc, Price, Price2, QtyDef, QtyInc, QtyStep, QtyMin, QtyMax, CrntBal, RecType, RecStatus, Priority, EntryBy, EntryDte } = OrderSheet

    // if (!(Code)) {
    //   alert('CODE is invalid. \nPlz Check CODE entered.'); return
    // }

    // if (!Categories.find(s => s.Code === CatCode)) {
    //   //alert('Supplier is invalid. \nPlz check voucher entry. ' + [TId]); return
    //   toast.error('Category is invalid. \nPlz Reset Category entry. [ ' + CatCode + ' ]', { theme: 'colored', autoClose: ToastWaitTime, })
    //   return
    // }

    // if (!(Code)) {
    //   toast.error('Code is invalid. \nPlz Check Code entry.', { theme: 'colored', autoClose: ToastWaitTime, })
    //   return
    // }
    if (!(OrderSheet.Title)) {
      // toast.error('Title is invalid. \nPlz Check Title entry.', { theme: 'colored', autoClose: ToastWaitTime, })
      setABCDEF(true);
      alert('Empty Title')
      // <button type="button" onClick={() => handleShowAlert('error', 'Error', 'Showing error tailwind alert')}>Show Alert Error</button><br />      
      // showAlert(type, title, message)
      return
    }
    // if (!Categories.find(s => s.Code === CatCode)) {
    //   //alert('Supplier is invalid. \nPlz check voucher entry. ' + [TId]); return
    //   toast.error('Category is invalid. \nPlz Reset Category entry. [ ' + CatCode + ' ]', { theme: 'colored', autoClose: ToastWaitTime, })
    //   return
    // }


    const Data2SendInDatabase = {
      "ID": OrderSheet.ID,

      // "RecType": RecType.substr(0, 10),         //RecType.Substring(0, Math.min(RecType.Length, 10)) ,
      // "RecStatus": RecStatus.substr(0, 10),
      // "Priority": Priority.substr(0, 10),

      // "Code": Code.substr(0, 5),
      "Title": OrderSheet.Title.substr(0, 50),
      "Des": OrderSheet.Des.substr(0, 50),
      "Rem": OrderSheet.Rem.substr(0, 50),
      "Unit": OrderSheet.Unit.substr(0, 10),

      // "CatCode": CatCode,

      // "TId": Number(TId),
      // "Pic": Pic,
      // "PicURL": (Pic ? Title.trim().substr(0, Math.min(Title.trim().length, 10)) + DateTimeStamp() + '.png': ''),      

      "PicURL": (OrderSheet.Pic ? OrderSheet.Title.replace(/ /g, '').substr(0, 10) + DateTimeStamp() + '.png' : ''),

      "Unit": OrderSheet.Unit.substr(0, 10),
      // "QtyDef": Number(QtyDef),
      // "QtyInc": Number(QtyInc),
      // "QtyStep": Number(QtyStep),
      // "QtyMin": Number(QtyMin),
      // "QtyMax": Number(QtyMax),
      // "ShareRef": Number(ShareRef),
      // "ShareDoc": Number(ShareDoc),
      "PPrice": Number(OrderSheet.PPrice),
      "SPrice": Number(OrderSheet.SPrice),

      "CBal": Number(0),
      "PBal": Number(0),

      // "EntryBy": "xUSERx",
      // "EntryDte": new Date()
    }

    // if (!AlertConfirm (Data2SendInDatabase, 'Add New Record ?')) return

    // DispAPIInAlert(Data2SendInDatabase, 'Data2SendInDatabase')
    // formData.append('username', 'Chris');
    // formData.append('userpic', myFileInput.files[0], 'chris1.jpg');
    // formData.append('userpic', myFileInput.files[1], 'chris2.jpg');

    //=*=*=*=*=*=*=*=*=*=*=*=[ Get New Next Available Code ]=*=*=*=*=*=*=*=*=*=*=*=
    const VNO_NEW = 'VNO' //SetPadLeftZero((await (await fetch(`/api/VNoTrack/${VCat}`, { method: 'GET' })).json()).VNo, 3)
    // alert('VNoTrack.VNo VNO_NEW: ' + SetPadLeftZero(VNO_NEW,3))
    //=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=


    let res = ''
    //=====[   READY to send data in Database   ]========  
    // alert('Trying to Save :' + OrderSheet.ID)
    if (OrderSheet.ID <= 0) {
      // ADD NEW-------------------------------------------------------
      // alert('Add New')
      res = await axios.post(process.env.NEXT_PUBLIC_API_URL + `Products/${0}`,
        { Data: Data2SendInDatabase }
      )
    }
    else {
      // UPDATE-------------------------------------------------------
      // alert('Update')
      res = await axios.put(process.env.NEXT_PUBLIC_API_URL + `Products/${OrderSheet.ID}`,
        { Data: Data2SendInDatabase }
      )
    }

    console.log('\n\n\n\n\n\n\n\n\n\nres.data: ', res.data)
    AlertRec(res.data, 'SAVED SUCCESSFULLY\nRcvd_Data from POST REPLY: res.data')
    // setRecsAll(res.data)
    // setData2Rpt(res.data)
    // return (res.data)

    HandleBtnCancel(true)
  }

  // --------------------------------------------------------------------------------------------------------------------
  // ------------- Delete  RECORD ----------------
  // --------------------------------------------------------------------------------------------------------------------

  const CallNextAPI2Delete = async () => {
    alert('Now Deleting Data from Database Section ID: ' + OrderSheet.ID)


    // try {

    // const res = 
    await axios.delete(process.env.NEXT_PUBLIC_API_URL + `Products/${OrderSheet.ID}`)
      .then(res => {
        console.log('User deleted successfully:', res);
        alert('Deleted Data from Database Section ID: '+ OrderSheet.ID+'\n'  +res.data.message)

      })
      .catch(error => {
        console.error('Error deleting user:', error);
        alert('ERRRRRRRRRRRRRRRRRRRRRRRRRRRR')
      });

    // } 
    //  catch (error) {
    //   console.error(error);
    //   alert('ERRORRRRRRRRRRRRRRRRR')
    //   throw error;
    // }




    // const { Id, Title, PicURL, PicURL4Edit } = OrderSheet

    // // const res = await axios.delete(process.env.NEXT_PUBLIC_API_URL + `Products/${OrderSheet.ID}`  )
    // const res = await axios.delete(process.env.NEXT_PUBLIC_API_URL + `Products/${OrderSheet.ID}`  )
    //   alert ('Record is DELETED from Database')









    // // const res = await axios.delete(process.env.NEXT_PUBLIC_API_URL + `Products/${id}`    )
    // axios.delete(process.env.NEXT_PUBLIC_API_URL + `Products/${OrderSheet.ID}`)
    //   .then(response => {
    //     AlertRec(response, 'Record is DELETED from Database')
    //     // alert('Record is DELETED from Database')
    //   })
    //   .catch(error => {
    //     // setErrorMessage(error.message);
    //     console.error('There was an error! in Deleting : ', error);
    //   });
    // // toast.warn('Record Deleted Successfully: [' + Title + ']', { theme: 'colored', autoClose: ToastWaitTime, })


    HandleBtnCancel(true)

  }




  return (
    <>
      {/* bg-teal-700 */}
      <div className="w-full md:w-1/2 mx-auto mt-1 mb-4 md:my-10 flex flex-col justify-center  rounded-lg shadow-lg bg-white ">
        <div className='flex'>
          <span className='text-3xl mx-auto my-2'>Product Detail</span>
          <span onClick={() => HandleBtnCancel(false)}> <CgCloseO className=' text-3xl text-red-600 ms-auto me-2 mt-2' /></span>
        </div>


        {/* Header- Close button part */}
        <div>
          {/* <ImEnter className='fs-3  text-danger ' onClick={() => HandleCloseWindow(true)} /> */}
          {/* <SlClose className='fs-3 ms-auto text-danger '  /> */}
        </div>

        <div className="w-md mb-2 rounded shadow-lg grid grid-cols-1 md:grid-cols-2 ">

          {/* START: Left Panel ------------------------------------------*/}
          <div className=' my-4 px-10 flex flex-col items-center'>


            {/* Input Descriptions  */}
            <div className='mt-7 mx-auto w-1/2 '>
              <InputByAdaamText Label='Item ID' Name='ID' ReadOnly={true} Val={OrderSheet?.ID} setVal={HandleInputs} />
            </div>

            {/* Divider Line */}
            <div className="mx-auto my-4 w-[90%] border-t border-teal-400" ></div>
            {/* ------------------------------------------------------------------------- */}


            <div className=' w-full '>

              {/* Input Descriptions  */}
              <div className='mt-7   '>
                <InputByAdaamText Label='Title' Name='Title' Val={OrderSheet?.Title} setVal={HandleInputs} />
              </div>


              {/* Input Code/ID  */}
              <div className='mt-7 '>
                <InputByAdaamText Label='Category' Name='Cat' Val={OrderSheet?.Cat} setVal={HandleInputs} />
                {/* <InputByAdaamSelect Options={BizType} TextKey='BizType' ValueKey='Value' /> */}
              </div>

              {/* Input Descriptions  */}
              <div className='mt-7'>
                <InputByAdaamText Label='Des' Name='Des' Val={OrderSheet?.Des} setVal={HandleInputs} />
              </div>

              {/* Input Descriptions  */}
              <div className='mt-7 '>
                <InputByAdaamText Label='Rem' Name='Rem' Val={OrderSheet?.Rem} setVal={HandleInputs} />
              </div>

              {/* Input Unit  */}
              <div className='mt-7 '>
                <InputByAdaamText Label='Unit' Name='Unit' Val={OrderSheet?.Unit} setVal={HandleInputs} />
              </div>

              {/* Input Sale Price  */}
              <div className='mt-7 '>
                <InputByAdaamNumber Label='Purchase Price' Name='PPrice' Val={OrderSheet?.PPrice} setVal={HandleInputs} />
              </div>

              {/* Input Sale Price  */}
              {/* <div className='mt-7 w-full px-4'> */}
              <div className='mt-7 '>
                <InputByAdaamNumber Label='Sale Price' Name='SPrice' Val={OrderSheet?.SPrice} setVal={HandleInputsNumberFormat} />
              </div>

            </div>

          </div>
          {/* END:   Left Panel ------------------------------------------*/}

          {/* START: RIGHT Panel ------------------------------------------*/}
          {/* Right Panel: ****************** Image Section */}
          <div className=' my-4 px-4 flex flex-col items-center'>


            <label className=' cursor-pointer'>
              <span>Select Image</span>
              <input type="file" className="hidden" onChange={(e) => HandleOnChangeFileBrowser(e)} />
            </label>

            <div className='mt-4 border relative'>

              {!OrderSheet.PicURL ? '' :
                <button className='absolute -top-3 -right-3  p-1 bg-red-400 rounded-md'
                  onClick={() => HandleBtnDelImg()}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              }

              {/* <img src={window.location.origin + '/yourPathHere.jpg'} /> */}
              <Image src={OrderSheet.PicURL ? OrderSheet.PicURL : '/SiteImages/NoImage.jpg'}
                alt='img'
                height={0} width={0}
                //width="100%" height="100%" 
                layout="responsive"     //'fill'
                objectFit='cover'       //'contain'          
              />
            </div>


            <br />
            <br />

          </div>
          {/* END: RIGHT Panel ------------------------------------------*/}

        </div>

        <div className='mx-auto my-2 py-2'>
          <div className='flex gap-4'>
            <button className='w-36 h-12 flex gap-2 items-center justify-center rounded-lg border border-gray-400 bg-gray-300  hover:bg-gray-300 hover:text-xl' onClick={HandleBtnReset} > <TbWiperWash size={24} /> Reset </button>
            {/* <button className= 'w-36 h-12 flex gap-2 items-center justify-center rounded-lg border border-green-500 bg-green-500  hover:bg-green-500 hover:text-xl'  onClick={HandleBtnSave} > <VscSaveAs size={24} /> Save </button> */}
            <button className={'w-36 h-12 flex gap-2 items-center justify-center rounded-lg border border-green-500  hover:text-xl' + (VoucherMode === 'Del' ? ' bg-red-500  hover:bg-red-700 ' : ' bg-green-500  hover:bg-green-500 ')} onClick={HandleBtnSave} > <VscSaveAs size={24} /> {VoucherMode === 'Del' ? 'Delete' : 'Save'} </button>
          </div>
        </div>
      </div >


    </>
  )
}
