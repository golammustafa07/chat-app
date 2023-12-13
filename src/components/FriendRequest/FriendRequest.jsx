import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import raghav from '../../assets/raghav.png'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import { useSelector } from 'react-redux'


const FriendRequest = () => {
    const data = useSelector(state=>state.userLoginInfo.userInfo)
    console.log(data, 'daataa');
    const db = getDatabase();
    const [FriendRequests,SetFriendRequests] = useState([])

    useEffect(()=>{
        const FriendRequestRef = ref(db, 'friendrequests/');
        onValue(FriendRequestRef, (snapshot) => {
            let arr = []
            console.log(snapshot);
            snapshot.forEach((item)=>{
                if(item.val().receiverid == data.uid){
                    arr.push({...item.val(), id: item.key});
                }
            })
            SetFriendRequests(arr)
        });
    },[])
    console.log(FriendRequests);

    
    const AcceptFriendRequest = (item)=>{
        console.log('accepted', item);
        set(push(ref(db, 'friends/')),{
            ...item
        }).then(()=>{
            remove(ref(db, 'friendrequests/'))
        })
    }
  return (
    <div className='ml-[43px] h-[450px] mt-[45px]'>
        <div className='shadow shadow-box rounded-[20px]'>

            <div className='flex justify-between pl-[20px] pb-[10px] pt-[13px] mt-[35px]'>
                <h3 className='text-black font-pops font-semibold text-[20px]'>FriendRequest</h3>
                <BsThreeDotsVertical className='text-[20px] text-[#5F35F5] mr-[10px]'/>
            </div>

            <div className='mx-[20px]'>
                {
                    FriendRequests.map((item)=>(
                        <div className='flex items-center pb-[15px] mt-[17px] border-b border-black border-opacity-[0.25]'>
                            <img src={raghav} alt="" />

                            <div className='pl-[15px]'>
                                <h3 className='font-pops font-semibold text-[18px] text-[#000]'>{item.sendername}</h3>
                            </div>

                            <button onClick={()=>AcceptFriendRequest(item)} className='font-pops font-semibold px-[22px] bg-[#5f35f5] rounded-[20px] text-white text-[20px] ml-[140px]'>Accept</button> 
                        </div>
                    ))
                }
            </div>
            
            
            
            

        </div>
    </div>
  )
}

export default FriendRequest