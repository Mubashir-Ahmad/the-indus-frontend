import React, { useEffect } from 'react'
import './profile.css'
import Metatitle from '../title/title'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import Loading from '../loading/Loading';
import { useNavigate } from 'react-router-dom';
function Profile() {
    const navigate =useNavigate();
    const {isAuthenticated,error,user ,loading}=useSelector((state)=>state.user)
    useEffect(()=>{
        if(isAuthenticated===false){
            navigate('/login')
        }
    },[isAuthenticated])
  return (
    <>
    {
        loading ?(
            <Loading/>
        ):(
            <>
    <Metatitle title={`${user.user.name}'s Profile`}/>
    <div className="profile-container">
        <div>
            <h1>My Profile</h1>
            <img src={user.user.avatar.url} alt={user.user.name}/>
            <Link to='/me/update'>Edit Profile</Link>
        </div>
        <div>
            <div>
            <h4>Full Name</h4>
            <p>{user.user.name}</p>
            </div>
            <div>
                <h4>Email</h4>
                <p>{user.user.email}</p>
            </div>
            <div>
                <h4>Joined on</h4>
                <p>{String(user.user.createdAt).substring(0,10)}</p>
            </div>
            <div>
                {/* <Link to='/orders'>My Order</Link> */}
                <Link to='/password/update'>Change password</Link>
            </div>
            </div>
        </div>
    </>
        )
    }
    </>
  )
}

export default Profile