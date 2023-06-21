import React,{useState , useEffect ,useRef} from 'react'
import './riderearn.css'
import { Typography } from '@material-ui/core'
import {Link} from 'react-router-dom'
import Metatitle from "../title/title"
import { useSelector ,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios'
import VpnKeyIcon from '@material-ui/icons/VpnKey'

import { useAlert } from 'react-alert'
import { riderearn } from '../../actions/OrderAction'
function Riderearn() {
    const navigate = useNavigate();
    // const {shippinginfo, cartitems}= useSelector((state)=>state.cart)
    const {message ,orders , totalEarnings ,totalOrders}= useSelector((state)=>state.riderearn)
    const {user} =useSelector((state)=>state.user)
console.log(useSelector((state)=>state.riderearn))
    const alert = useAlert();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(riderearn());
        
      }, [dispatch]);
  return (
    <>
    <Metatitle title="Confirm order"/>
    {/* <CheckoutSteps activestep={1}/> */}
    <div className="orderr-page">
            <div className="order-area">
            <Typography>{user.user.name} Earning</Typography>
        <div className="order-box">
        <div>
            <p>Name:</p>
            <span>{user.user.name}</span>
        </div>
        <div>
            <p>Email:</p>
            <span>{user.user.email}</span>
        </div>
        </div>
        <Typography>Pick Order</Typography>
        <div>
            {orders && orders.map((item)=>(
                <div key={item._id}>
                    <div className='od'>
                        <div className='address'>
                        <h5>Address</h5>
                        {item.shippingInfo.address}
                        </div>
                        {item.orderItem.map((order)=>(
                            <div key={order._id} className='od-1'>
                                <h2>Order Items</h2>
                                <div className='orders'>
                                    <h5>Name:</h5>
                                    <p>{order.name}</p>
                                    <h5>Price:</h5>
                                    <p>{order.price}</p>
                                    <h5>Quantity:</h5>
                                    <p>{order.quantity}</p>
                                    <h5>Special Instruction:</h5>
                                    <p>{order.special_ins}</p>
                                </div>
                                </div>
                        ))}
                    </div>
                    </div>
            ))}
        </div>
        </div>
        <div className='confirmitem'>
        <Typography>Earnings</Typography>
    <div className='confirm-container'>
    <div>
            <p>Total Order:</p>
            <span>{totalOrders}</span>
        </div>
    <div>
            <p>Total Earning:</p>
            <span>{totalOrders} * 100 ={totalEarnings}</span>
        </div>
    </div>
    </div>
   
    </div>
    </>    
  )
}

export default Riderearn