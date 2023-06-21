import React ,{useState} from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom'
import {SpeedDial , SpeedDialAction} from '@material-ui/lab'
import DasboardIcon from "@material-ui/icons/Dashboard"
import PersonIcon from "@material-ui/icons/Person"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import ListAltIcon from "@material-ui/icons/ListAlt"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { useAlert } from 'react-alert'
import { useDispatch , Selector, useSelector} from 'react-redux'
import { logout_user } from '../../actions/UserAction'
import  Backdrop  from '@material-ui/core/Backdrop'
function Useroption({user}) {
    // console.log('user',user)
    const navigate =useNavigate();
    const dispatch =useDispatch();
    const {cartitems} = useSelector((state)=>state.cart)
    const {isAuthenticated} = useSelector((state)=>state.user)
    // console.log(useSelector((state)=>state.user))
    const alert = useAlert();
    const [open, setopen] =useState(false);
    const option =[
        {icon: <ListAltIcon/>,name :"Orders",function:order},
        {icon: <PersonIcon/>,name :"Profile",function:account},
        {icon: <ShoppingCartIcon style={{color:cartitems.length>0 ?'tomato' : 'unset'}}/>,name :`Cart(${cartitems.length})`,function:cart},
        {icon: <ExitToAppIcon/>,name :"Logout",function:logoutUser},
    ];
    if(user.user.role=== 'admin'){
        option.unshift({
            icon:<DasboardIcon/>,
            name:"Dashboad",
            function:dashboard
        })
    }
    function order(){
            navigate('/admin/orders')
    }
    function account(){
        navigate('/account')
    }
    function cart(){
        navigate('/cart')
    }
    function logoutUser() {
        // document.cookie = 'token=; Max-Age=-99999999;';
        dispatch(logout_user());
          alert.success("Logout successfully");
      }
      
    function dashboard(){
    navigate('/admindashbord')
    }
  return (
    <>
    <Backdrop open={open} style={{zIndex:'10'}}/>
    < SpeedDial className='speedDial' ariaLabel='SpeedDial tooltip example' direction='down' 
    style={{zIndex:'11'}} onClose={()=> setopen(false)} onOpen={()=>setopen(true)} open={open} icon={
        <img className='speedDialIcon' src={user.user.avatar.url ? user.user.avatar.url :"/Profile.png"} alt="Profile"/>
    }>
        {
            option.map((item)=>(
                <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.function} tooltipOpen />
            ))
            }
    </SpeedDial>
    </>
  )
}

export default Useroption