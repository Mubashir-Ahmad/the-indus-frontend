import React, { Fragment, useEffect, useState } from "react";
import Metatitle from "../title/title";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getsingleorder,
  clearError,
  updateOrder,
} from "../../actions/OrderAction";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../loading/Loading";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
// import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";

const ProcessOrder = ({ history, match }) => {
  const id = useParams()
  const { order, error, loading } = useSelector((state) => state.singleorder);
  console.log(useSelector((state) => state.singleorder))
  const { error: updateError, isUpdated } = useSelector((state) => state.updateorder);
  
  const navigate = useNavigate();
  console.log(id)
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id.id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearError());
    // }
    // if (updateError) {
    //   alert.error(updateError);
    //   dispatch(clearError());
    // }
    // if (isUpdated) {
    //   alert.success("Order Updated Successfully");
    //   navigate('/admin/orders')
    //   dispatch({ type: 'UPDATE_ORDER_RESET' });
    // }

    dispatch(getsingleorder(id.id));
  }, [dispatch]);

  return (
    <Fragment>
      <Metatitle title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loading />
          ) : (
            <>
            { order &&
              order.map((item)=>(
            <div
              className="confirmOrderPage"
              style={{
                display: item.orderStatus === "Delivered" ? "block" : "grid",               
              }}              
          >
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="itemDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{item.user && item.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {item.shippingInfo && item.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {item.shippingInfo &&
                          `${item.shippingInfo.address}`}
                      </span>
                    </div>
                  </div>

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          item.paymentInfo &&
                          item.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {item.paymentInfo &&
                        item.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div className="payment">
                      <p>Amount:</p>
                      <span>{item.totalPrice && item.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          item.orderStatus && item.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {item.orderStatus && item.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography> Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {item.orderItem &&
                      item.orderItem.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}` } className="link">
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X {item.price} ={" "}
                            <b>{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: item.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {item.orderStatus === "Processing" && (
                        <option value="Delivered">Delivered</option>
                      )}

                      {item.orderStatus === "Delivered" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
              ))
            }
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
