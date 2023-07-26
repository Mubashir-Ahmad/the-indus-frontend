import { Step, StepLabel, Stepper, Typography } from '@mui/styles'
import React from 'react'
import  LocalShippingIcon from "@material-ui/icons/LocalShipping"
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAdd'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import './checkout.css'
function CheckoutSteps ({activestep}) {
  const steps= [
          {
            label: <Typography>Shipping order</Typography>,
            icon:<LocalShippingIcon />
          },
          {
            label: <Typography>Confirm order</Typography>,
            icon:<LibraryAddCheckIcon />
          },
          {
            label: <Typography>Payment</Typography>,
            icon:<AccountBalanceIcon />
          },
  ];
  const stepstyle={
    boxSizing: "border-box",
  }
  return (
    <>
        <Stepper alternativeLabel activeStep={activestep} style={stepstyle}> 
          { 
            steps.map((item,index)=>(
              <Step key={index}
                active={activestep == index ? true : false} completed={activestep>=index ? true :false}
              >
                <StepLabel style={{
                  color:activestep>= index ? "tomato" : "rgba(0,0,0,0.649)"
                }} icon={item.icon}>{item.label}</StepLabel>
              </Step>
            ))
          }
        </Stepper>
    </>
  )
}

export default CheckoutSteps 