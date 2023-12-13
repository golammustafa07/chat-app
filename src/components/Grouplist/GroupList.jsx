import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { CiSearch } from "react-icons/ci";
import friendsreunion from '../../assets/friendsreunion.png'
import friendsforever from '../../assets/friendsforever.png'
import crazycousins from '../../assets/crazycousins.png'

const GroupList = () => {
  return (
    <div className='ml-[43px] h-[450px]'>
        <div className='shadow shadow-box rounded-[20px]'>
            <div className='flex'>
                <CiSearch className='text-[30px] mt-[20px] ml-[20px]'/>
                <input type="text" placeholder='Search' className='font-pops text-[16px] pt-[20px] pb-[20px] pl-[40px] pr-[100px] outline-none' />
                <BsThreeDotsVertical className='text-[20px] text-[#5F35F5] mt-[20px] ml-[35px]'/>
            </div>

            <div className='flex justify-between pl-[20px] pb-[10px] pt-[13px] mt-[35px]'>
                <h3 className='text-black font-pops font-semibold text-[20px]'>GroupList</h3>
                <BsThreeDotsVertical className='text-[20px] text-[#5F35F5] mr-[10px]'/>
            </div>

            <div className='mx-[20px]'>
                <div className='flex items-center pb-[15px] mt-[17px] border-b border-black border-opacity-[0.25]'>
                    <img src={friendsreunion} alt="" />

                    <div className='pl-[15px]'>
                        <h3 className='font-pops font-semibold text-[18px] text-[#000]'>Friends Reunion</h3>
                        <p className='font-pops font-medium text-[14px] text-#4d4d4d] opacity-[0.75]'>Hi Guys, Wassup!</p>
                    </div>

                     <button className='font-pops font-semibold px-[22px] bg-[#5f35f5] rounded-[20px] text-white text-[20px] ml-[85px]'>Join</button> 
                </div>
            </div>
            
            <div className='mx-[20px]'>
                <div className='flex items-center pb-[15px] mt-[17px] border-b border-black border-opacity-[0.25]'>
                    <img src={friendsforever} alt="" />

                    <div className='pl-[15px]'>
                        <h3 className='font-pops font-semibold text-[18px] text-[#000]'>Friends Forever</h3>
                        <p className='font-pops font-medium text-[14px] text-#4d4d4d] opacity-[0.75]'>Good to see you</p>
                    </div>

                     <button className='font-pops font-semibold px-[22px] bg-[#5f35f5] rounded-[20px] text-white text-[20px] ml-[90px]'>Join</button> 
                </div>
            </div>
            
            <div className='mx-[20px]'>
                <div className='flex items-center pb-[15px] mt-[17px]'>
                    <img src={crazycousins} alt="" />

                    <div className='pl-[15px]'>
                        <h3 className='font-pops font-semibold text-[18px] text-[#000]'>Crazy Cousins</h3>
                        <p className='font-pops font-medium text-[14px] text-#4d4d4d] opacity-[0.75]'>What plans today?</p>
                    </div>

                     <button className='font-pops font-semibold px-[22px] bg-[#5f35f5] rounded-[20px] text-white text-[20px] ml-[95px]'>Join</button> 
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default GroupList