import React from 'react'
import './Ordersuccess.css'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { Typography } from '@mui/styles'
import { Link } from 'react-router-dom'
function Ordersuccess() {
  return (
    <>
    <div className="ordersuccess">
        <CheckCircleIcon />
        <Typography>Your Order has been Placed succeefully</Typography>
        {/* <Link to='/order/me'>View Order</Link> */}
    </div>
    </>
  )
}

export default Ordersuccess