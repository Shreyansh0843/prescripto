import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {AppContext} from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const {docId} = useParams()
  const {doctors, currencySybmol, backendUrl, token, getDoctorsData} = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () =>{
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = () =>{
    // Guard: don't run until docInfo exists
    if (!docInfo) return;

    setDocSlots([])

    // ensure slots_booked exists
    const slotsBooked = docInfo.slots_booked || {}

    const today = new Date()

    for(let i  = 0; i < 7; i++){
      // clone and shift date
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      // end time for day
      let endTime = new Date(today)
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21,0,0,0)

      // starting hour logic correctly using getHours()
      if(today.getDate() === currentDate.getDate()){
        const h = currentDate.getHours()
        currentDate.setHours(h > 10 ? h + 1 : 10, currentDate.getMinutes() > 30 ? 30 : 0, 0, 0)
      }else{
        currentDate.setHours(10,0,0,0)
      }

      let timeSlots = []

      while(currentDate < endTime){
        let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = `${day}_${month}_${year}`
        const slotTimeStr = formattedTime

        const isBooked = (slotsBooked[slotDate] || []).includes(slotTimeStr)
        if(!isBooked){
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime
          })
        }

        // increment current time by 30 minutes
        currentDate = new Date(currentDate.getTime() + 30 * 60 * 1000)
      }
      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  const bookAppointment = async () => {

    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    try {
      // ensure docSlots and chosen index exist
      if (!docSlots[slotIndex] || docSlots[slotIndex].length === 0 || !slotTime) {
        toast.warn("Please select a valid slot");
        return;
      }

      const date = docSlots[slotIndex][0].dateTime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() =>{
    fetchDocInfo()
  },[doctors,docId])

  // run only when docInfo becomes available
  useEffect(()=>{
    if (docInfo) getAvailableSlots()
  },[docInfo])

  useEffect(()=>{
    console.log(docSlots)
  },[docSlots])

  // render only when docInfo is ready
  if (!docInfo) return null

  return (
    <div>
      {/* ---- Doctor Details ------ */}
      <div className='flex flex-col sm:flex-row  gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-grey-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* --- Doc info: name, degree, experience */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>
          {/* ---- Doctor About */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 mex-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySybmol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* ----- Booking Slots ---- */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length > 0 && docSlots.map((item, index) =>(
              <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                <p>{item[0] && item[0].dateTime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            (docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].length > 0) ? 
            docSlots[slotIndex].map((item, index)=> (
              <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key = {index}>
                {item.time.toLowerCase()}
              </p>
            )) : <p className='text-sm text-gray-400'>No slots available</p>
          }
        </div>

        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
      </div>

      {/* --- Listing Related Dcotors */}
      <RelatedDoctors docId={docId} speciality = {docInfo.speciality} />
    </div>
  )
}

export default Appointment
