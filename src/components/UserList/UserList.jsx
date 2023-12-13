import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import raghav from '../../assets/raghav.png'

import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';

const UserList = () => {
    const data = useSelector(state=>state.userLoginInfo.userInfo)
    console.log(data, 'dataa');
    // Read Data from Firebase
    const db = getDatabase();
    const [userlists,setuserlists] = useState([])
    useEffect(()=>{
        const userRef = ref(db, 'users/' );
        onValue(userRef, (snapshot) => {
            let arr = []
            console.log(snapshot.val(), 'snap'); 
            snapshot.forEach(item=>{
                if(item.key != data.uid){
                    arr.push({...item.val(), userid:item.key})
                }
                console.log(item.key, 'key');
                console.log(item.val() , 'item');
                
        })
           setuserlists(arr) 
    });
    },[])
    console.log(userlists);
    // Read Data from Firebase

    const [FriendRequestsLists,SetFriendRequestsLists] = useState([])
    useEffect(()=>{
        const FriendRequestRef = ref(db, 'friendrequests/');
        onValue(FriendRequestRef, (snapshot) => {
            let arr = []
            console.log(snapshot);
            snapshot.forEach((item)=>{
                console.log(item.val());
                arr.push(item.val().receiverid + item.val().senderid);
            })
            SetFriendRequestsLists(arr)
        });
    },[])
    console.log(FriendRequestsLists);

    const [friendlists,setfriendlists] = useState([]);
    useEffect(()=>{
        const FriendsRef = ref(db, 'friends/');
        onValue(FriendsRef, (snapshot) => {
            let arr = []
            console.log(snapshot);
            snapshot.forEach((item)=>{
                console.log(item.val());
                arr.push(item.val().receiverid + item.val().senderid);
            })
            setfriendlists(arr)
        });
    },[])

    const handleFriendRequest = (item)=>{
        console.log('Friend Request Sent' , item);
        set(push(ref(db, 'friendrequests/')), {
            sendername : data.displayName,
            senderid: data.uid,
            receivername : item.username,
            receiverid: item.userid
        });
    }

  return (
    <div className='ml-[43px] h-[450px]'>
        <div className='shadow shadow-box rounded-[20px]'>

            <div className='flex justify-between pl-[20px] pb-[10px] pt-[13px]'>
                <h3 className='text-black font-pops font-semibold text-[20px]'>UserList</h3>
                <BsThreeDotsVertical className='text-[20px] text-[#5F35F5] mr-[10px]'/>
            </div>

            <div className='mx-[20px]'>
                {
                    userlists.map((item)=>(
                        <div className='flex items-center pb-[15px] mt-[17px] border-b border-black border-opacity-[0.25]'>
                            <img src={raghav} alt="" />

                            <div className='pl-[15px]'>
                                <h3 className='font-pops font-semibold text-[18px] text-[#000]'>{item.username}</h3>
                                <p className='font-pops font-medium text-[14px] text-#4d4d4d] opacity-[0.75]'>{item.email}</p>
                            </div>
                            {
                                friendlists.includes(data.uid + item.userid) ||
                                friendlists.includes(item.userid + data.uid)
                                ?
                                <button className='font-pops font-semibold px-[22px] bg-[#5f35f5] rounded-[20px] text-white text-[20px] ml-[55px]'>Friends</button>
                                :
                                FriendRequestsLists.includes(data.uid + item.userid) ||
                                FriendRequestsLists.includes(item.userid + data.uid)
                                ?
                                <button className='font-pops font-semibold px-[22px] bg-[#5f35f5] rounded-[20px] text-white text-[20px] ml-[80px]'>Pending</button>
                                :
                                <button onClick={()=>handleFriendRequest(item)} className='font-pops font-semibold px-[22px] bg-[#5f35f5] rounded-[20px] text-white text-[20px] ml-[80px]'>+</button>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default UserList