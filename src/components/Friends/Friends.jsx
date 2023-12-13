import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import raghav from '../../assets/raghav.png'
import { useSelector } from 'react-redux'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'

const Friends = () => {
    const db = getDatabase();
    const data = useSelector(state=>state.userLoginInfo.userInfo)
    const [friend,setfriend] = useState([]);
    useEffect(()=>{
        const FriendsRef = ref(db, 'friends/');
        onValue(FriendsRef, (snapshot) => {
            let arr = []
            console.log(snapshot);
            snapshot.forEach((item)=>{
                console.log(item.val());
                if (item.val().receiverid == data.uid || item.val().senderid == data.uid) {
                    arr.push({...item.val(),key:item.key})   
                }
            })
            setfriend(arr)
        });
    },[])
    console.log(friend);

    const handleBlock = (item)=>{
        console.log(item);
        if (data.uid == item.senderid) {
            set(push(ref(db, 'block/')),{
                block: item.receivername,
                blockid: item.receiverid,
                blockby: item.sendername,
                blockbyid: item.senderid
            }).then(()=>{
                remove(ref(db, 'friends/' + item.key))
            })
        }else{
            set(push(ref(db, 'block/')),{
                block: item.sendername,
                blockid: item.senderid,
                blockby: item.receivername,
                blockbyid: item.receiverid
            }).then(()=>{
                remove(ref(db, 'friends/' + item.key))
            })
        }
    }

  return (
    <div className='ml-[43px] h-[450px]'>
        <div className='shadow shadow-box rounded-[20px]'>

            <div className='flex justify-between pl-[20px] pb-[10px] pt-[13px]'>
                <h3 className='text-black font-pops font-semibold text-[20px]'>Friends</h3>
                <BsThreeDotsVertical className='text-[20px] text-[#5F35F5] mr-[10px]'/>
            </div>

            <div className='mx-[20px]'>
                {
                    friend.map((item)=>(
                        <div className='flex items-center pb-[15px] mt-[17px] border-b border-black border-opacity-[0.25]'>
                            <img src={raghav} alt="" />

                            <div className='pl-[15px]'>
                                <h3 className='font-pops font-semibold text-[18px] text-[#000]'>
                                    {
                                        item.receiverid == data.uid ? item.sendername : item.receivername
                                    }
                                </h3>
                            </div>
                            
                            <button onClick={()=>handleBlock(item)} className='font-pops font-semibold px-[22px] bg-[#5f35f5] rounded-[20px] text-white text-[20px] ml-[140px]'>Block</button> 
                        </div>
                    ))
                }
                
            </div>
        </div>
    </div>
  )
}

export default Friends