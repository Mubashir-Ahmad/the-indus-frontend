import React, { Fragment, useEffect, useState } from "react";
import Metatitle from "../title/title";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/styles";
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
import { Button } from "@mui/styles";
// import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";

const ProcessOrder = ({ history, match }) => {
  const id = useParams();
  const { order, error, loading, shippingInfo } = useSelector(
    (state) => state.singleorder
  );
  console.log(useSelector((state) => state.singleorder));
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.updateorder
  );

  const navigate = useNavigate();
  console.log(id);
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
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      navigate('/manger/order')
      dispatch({ type: 'UPDATE_ORDER_RESET' });
    }

    dispatch(getsingleorder(id.id));
  }, [dispatch,isUpdated,navigate]);

  return (
    <Fragment>
      <Metatitle title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainerr">
          {loading ? (
            <Loading />
          ) : (
            <>
              <Typography>Shipping Info</Typography>
              <div className="shipingaddress">
                {shippingInfo &&
                  Object.keys(shippingInfo).map((key) => (
                    <div key={key}>
                      <h2>
                        {key}: {shippingInfo[key]}
                      </h2>
                    </div>
                  ))}
              </div>
              {order &&
                order.map((items) => (
                  <div
                    className="confirmOrderPage"
                    style={{
                      display:
                        items.orderStatus === "Delivered" ? "block" : "grid",
                    }}
                  >
                    <div>
                      <div className="confirmCartItems">
                        <Typography> Cart Items:</Typography>
                        <div className="confirmCartItemsContainer">
                          {items.orderItem &&
                            items.orderItem.map((item) => (
                              <div key={item.product}>
                                <img src={item.image} alt="Product" />
                                <div className="linkss">
                                  <Link
                                  to={`/product/${item.product}`}
                                  className="link"
                                >
                                  {item.name}
                                </Link>{" "}
                                <span>
                                  {item.quantity} X {item.price} =
                                  <b>{item.price * item.quantity}</b>
                                </span>
                                <p
                              className={
                                items.paymentInfo &&
                                items.paymentInfo.status === "succeeded"
                                  ? "greenColor"
                                  : "redColor"
                              }
                            >
                              {items.paymentInfo &&
                              items.paymentInfo.status === "succeeded"
                                ? "PAID"
                                : "NOT PAID"}
                            </p>
                                </div>
                               <p>Order Status : </p> 
                                <p
                              className={
                                items.orderStatus &&
                                items.orderStatus === "Delivered"
                                  ? "greenColor"
                                  : "redColor"
                              }
                            >
                              {items.orderStatus && items.orderStatus}
                            </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    {/*  */}
                    <div
                      style={{
                        display:
                          items.orderStatus === "Delivered" ? "none" : "block",
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
                            <option value="">Choose Status</option>
                            {items.orderStatus === "Placed" && (
                               <option value="Processing">Processing</option>
                            )}
                            {items.orderStatus === "Processing" && (
                              <option value="Dispatched">Dispatched</option>
                            )}
                            {items.orderStatus === "Dispatched" && (
                             <option value="Delivered">Delivered</option>
                            )}

                            {/* {items.orderStatus === "Delivered" && (
                              <option value="Delivered">Delivered</option>
                            )} */}
                          </select>
                        </div>

                        <Button
                          id="createProductBtn"
                          type="submit"
                          disabled={
                            loading
                              ? true
                              : false || status === ""
                              ? true
                              : false
                          }
                        >
                          Process
                        </Button>
                      </form>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;


