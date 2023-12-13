import React, { useState,createRef } from 'react'
import profile from '../../assets/profile.png'
import { AiOutlineHome,AiFillMessage } from "react-icons/ai";
import { IoMdNotificationsOutline} from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { IoCloudUpload } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginInfo } from '../../Slices/userSlice';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getStorage, ref, uploadString,getDownloadURL } from "firebase/storage";



const Sidebar = () => {
    const data = useSelector(state=>state.userLoginInfo.userInfo)
    const [image, setImage] = useState('');
    const [cropData, setCropData] = useState("");
    const cropperRef = createRef();
    const [profilephoto,setprofilephoto] = useState('');
    //cropper image

    const onChange = (e) => {
        console.log(e.target.files[0]);
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
          setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
          const storage = getStorage();
          const storageRef = ref(storage, auth.currentUser.uid);
          const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
          uploadString(storageRef, message4, 'data_url').then((snapshot) => {
          console.log('Uploaded a data_url string!');
          getDownloadURL(storageRef).then((downloadURL) => {
            // setprofilephoto(downloadURL)
            console.log(downloadURL , 'downloadURL');
            updateProfile(auth.currentUser, {
                photoURL: downloadURL,
            }).then(()=>{
                SetProfileModal(false)
                setImage('')
                setCropData('')
            })
          });
        });
        }
    };


    const [ProfileModal,SetProfileModal] = useState(false)
    const dispatch = useDispatch()
    const auth = getAuth();
    const navigate = useNavigate();

    const handleProfileModal = ()=>{
        SetProfileModal(true)
    }
    console.log(ProfileModal);

    const handleLogOut = ()=>{
        signOut(auth).then(() => {
            dispatch(userLoginInfo(null));
            localStorage.removeItem("userLoginInfo")
            console.log('LogOut done');
            setTimeout(()=>{
                navigate('/login')
            })
          }).catch((error) => {
            // An error happened.
          });
          
    }
  return (
    <>
        <div className='h-screen bg-[#5F35F5] rounded-lg pt-[38px]'>

        <div className='w-[96px] h-[96px] mx-auto rounded-full relative overflow-hidden group'>
            <img className='mx-auto w-full h-full' src={data?.photoURL} alt="" />
            

            <div onClick={handleProfileModal} className='w-0 group-hover:w-full bg-[rgba(0,0,0,.2)] h-full absolute top-0 left-0 flex justify-center items-center'>
                <IoCloudUpload className='text-3xl text-white' />
            </div>

        </div>

        <h2 className='text-white  font-sans font-bold text-[20px] text-center'>{data?.displayName}</h2>

        <div className='mt-[80px] relative before:absolute before:h-full before:rounded-l-lg before:w-[8px] before:bg-[#5f35f5] before:content[""] before:top-0 before:right-0 py-[20px] after:absolute after:content[""] after:bg-white after:top-0 after:left-[25px] overflow-hidden after:rounded-l-lg after:w-full after:h-full after:z-[-1] z-[1]'>
            <AiOutlineHome className='text-5xl mx-auto text-[#5f35f5]'/>
        </div>
        
        <div className='mt-[80px]'>
            <AiFillMessage className='text-5xl mx-auto text-[#bad1ff]'/>
        </div>
       
        <div className='mt-[80px]'>
            <IoMdNotificationsOutline className='text-5xl mx-auto text-[#bad1ff]'/>
        </div>
        
        <div className='mt-[80px]'>
            <IoMdSettings className='text-5xl mx-auto text-[#bad1ff]'/>
        </div>

        <div className=' mt-[190px]'>
            <TbLogout onClick={handleLogOut} className='text-5xl mx-auto text-[#bad1ff]'/>
        </div>
        </div>

        {
            ProfileModal && 
            <div className='w-full h-screen bg-red-500 absolute flex justify-center items-center top-0 left-0 z-[1]'>
            
                <div className='w-[500px] bg-white rounded-2xl text-center p-10'>
                    <h2 className='text-2xl font-bold font-pops mt-4'>Upload your profile photo</h2>
                         
                    {
                        image ?
                        <div className='w-[200px] h-[200px] rounded-full overflow-hidden mx-auto mb-[15px]'>
                            <div
                                className="img-preview"
                                style={{ width: "100%", float: "left", height: "300px" }}
                            />
                        </div>
                        :
                        <div className='w-[300px] h-[300px] rounded-full overflow-hidden mx-auto mb-[15px]'>
                            <div
                                className="img-preview"
                                style={{ width: "100%", float: "left", height: "300px" }}
                            />
                        </div>
                    }
                    
                    {/* <div className='w-[400px] h-[300px] overflow-hidden mx-auto mb-10'> */}
                        {
                            image &&
                            <Cropper
                                ref={cropperRef}
                                style={{ height: 400, width: "100%" }}
                                zoomTo={0.5}
                                initialAspectRatio={1}
                                preview=".img-preview"
                                src={image}
                                viewMode={1}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                                guides={true}
                            />
                        }
                        <input onChange={onChange} type="file" className='mt-4 block mx-auto mb-4'/>
                    {/* </div> */}

                    <button onClick={getCropData} className='bg-violet-500 p-3 rounded-lg text-white font-nun'>Upload</button>
                    <button onClick={()=>SetProfileModal(false)} className='bg-red-500 p-3 rounded-lg text-white font-nun ml-[10px]'>Cancel</button>
                </div>
            </div>
        }
    </>
    
  )
}

export default Sidebar