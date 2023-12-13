import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import raghav from '../../assets/raghav.png'
import swathi from '../../assets/swathi.png'
import kiran from '../../assets/kiran.png'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import { useSelector } from 'react-redux'

const BlockedUsers = () => {
    const db = getDatabase();
    const data = useSelector(state=>state.userLoginInfo.userInfo)
    const [blocklists,setblocklists] = useState([]);
    useEffect(()=>{
        const BlockRef = ref(db, 'block/');
        onValue(BlockRef, (snapshot) => {
            let arr = []
            console.log(snapshot);
            snapshot.forEach((item)=>{
                console.log(item.val());
                if (item.val().blockbyid == data.uid) {
                    arr.push({
                        id: item.key,
                        block: item.val().block,
                        blockid: item.val().blockid
                    })
                }else{
                    arr.push({
                        id: item.key,
                        blockby: item.val().blockby,
                        blockbyid: item.val().blockbyid
                    })
                }
            })
            setblocklists(arr)
        });
    },[])
    console.log(blocklists);

    const handleUnblock = (item)=>{
        console.log(item, 'unblock');
        set(push(ref(db, 'friends/')),{
            sendername : item.block,
            senderid : item.blockid,
            receivername : data.displayName,
            receiverid : data.uid
        }).then(()=>{
            remove(ref(db, 'block/' + item.id))
        })
    }

  return (
    <div className='ml-[43px] h-[450px]'>
        <div className='shadow shadow-box rounded-[20px]'>

            <div className='flex justify-between pl-[20px] pb-[10px] pt-[13px] mt-[35px]'>
                <h3 className='text-black font-pops font-semibold text-[20px]'>Blocked Users</h3>
                <BsThreeDotsVertical className='text-[20px] text-[#5F35F5] mr-[10px]'/>
            </div>

            <div className='mx-[20px]'>
                {
                    blocklists.map((item)=>(
                        <div className='flex items-center pb-[15px] mt-[17px] border-b border-black border-opacity-[0.25]'>
                            <img src={raghav} alt="" />

                            <div className='pl-[15px]'>
                                <h3 className='font-pops font-semibold text-[18px] text-[#000]'>{item.block}</h3>
                                <h3 className='font-pops font-semibold text-[18px] text-[#000]'>{item.blockbyid}</h3>
                                
                            </div>

                            {
                                item.blockbyid &&
                                <button onClick={()=>handleUnblock(item)} className='font-pops font-semibold px-[22px] bg-[#5f35f5] rounded-[20px] text-white text-[20px] ml-[140px]'>Unblock</button>
                            } 
                        </div>
                    ))
                }
                
            </div>
        </div>
    </div>
  )
}

export default BlockedUsers