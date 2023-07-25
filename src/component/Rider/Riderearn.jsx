import React, { useState, useEffect, useRef } from 'react';
import './riderearn.css';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Metatitle from '../title/title';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';
import Sidebar from '../Rider/Sidebar.js';
import { useAlert } from 'react-alert';
import { riderearn } from '../../actions/OrderAction';
import Chart from 'chart.js/auto';

// Chart.register(CategoryScale);
function Riderearn() {
  const navigate = useNavigate();
  const { message, orders, totalEarnings, totalOrders } = useSelector((state) => state.riderearn);
  const { user } = useSelector((state) => state.user);
  console.log(useSelector((state) => state.riderearn));
  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(riderearn());
  }, [dispatch]);

  const lineState = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'TOTAL AMOUNT',
        backgroundColor: ['tomato'],
        hoverBackgroundColor: ['rgb(197, 72, 49)'],
        data: [0, totalEarnings],
      },
    ],
  };

  

  const doughnutState = {
    labels: ['Total Order','Earning'],
    datasets: [
      {
        backgroundColor: ['#00A6B4', '#6800B4'],
        hoverBackgroundColor: ['#4B5000', '#35014F'],
        data: [totalOrders, totalOrders * 100 ],
      },
    ],
  };
  
  return (
    <>
      <Metatitle title="Confirm order" />
      <div className="dashboard">
        <Sidebar />
        <div className='earnn'>
          <Typography>{user.user.name} Earning</Typography>
          <div className="rider-earn">
            <div>
              <i class="fa-sharp fa-solid fa-dollar-sign"></i>
              <p>Total earning</p>
              <p>{totalOrders} * 100 = {totalEarnings}</p>
            </div>
            <div>
            <i class="fa-solid fa-city"></i>
              <p>Total order</p>
              <p>You take Total = {totalOrders}</p>
            </div>
          </div>
          <div className="graph">
          <div className="lineChart">
          <Line data={lineState}  className='graph-01'/>
          <div className='graph-1'>
            <p>You are growing by 14% in month</p>
        </div>
        </div>
       
</div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} className='graph-01'/>
        </div>
        </div>
      </div>
    </>
  );
}

export default Riderearn;

{/* <div className="orderr-page">
            <div className="order-area">
       
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
   
    </div> */}