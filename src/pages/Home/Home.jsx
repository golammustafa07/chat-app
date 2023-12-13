import { getAuth,onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { userLoginInfo } from '../../Slices/userSlice'
import GroupList from '../../components/Grouplist/GroupList'
import FriendRequest from '../../components/FriendRequest/FriendRequest'
import Friends from '../../components/Friends/Friends'
import MyGroups from '../../components/MyGroups/MyGroups'
import UserList from '../../components/UserList/UserList'
import BlockedUsers from '../../components/BlockedUsers/BlockedUsers'

const Home = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const [verify,setverify] = useState(false)
  const navigate = useNavigate();
  const data = useSelector( state=>state.userLoginInfo.userInfo)
  console.log(data, 'data');
  
  useEffect(()=>{
    if (!data) {
      navigate('/login')
    }
  },[])
  
  onAuthStateChanged(auth, (user) => {
    console.log(user, 'userrrrr');
    if (user.emailVerified) {
      setverify(true);
      dispatch(userLoginInfo(user))
      localStorage.setItem('userLoginInfo',JSON.stringify((user)))
    }
  });
  


  return (
    <div>
      {
        verify ? 
        <div className='flex'>

          <div className='w-[186px]'>
            <Sidebar/>
          </div>

          <div className='w-[500px]'>
            <GroupList/>
            <FriendRequest/>
          </div>

          <div className='w-[500px]'>
            <Friends/>
            <MyGroups/>
          </div>

          <div className='w-[550px]'>
            <UserList/>
            <BlockedUsers/>
          </div>
        </div>
        :
        <div className='h-screen w-full bg-[#5F35F5] flex justify-center items-center'>
          <div className='bg-white w-[700px] rounded p-20'>
            <h1 className='text-[#11175D] text-[34px] font-bold font-nun'>Please Verify your email</h1>
            <Link to='/login'><button to='/login' className='bg-red-500'>Back to Login</button></Link> 
          </div>
        </div>
      }
    </div>
  )
}

export default Home