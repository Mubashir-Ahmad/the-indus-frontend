import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/styles";
import Metatitle from "../title/title";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {deleteOrder,getAllOrders,clearError,} from "../../actions/OrderAction";
// import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, orders ,user } = useSelector((state) => state.allOrders);
 
console.log('orrrr',orders)
const userObject = orders && orders.length > 0 ? orders[0].User : null;

const userName = userObject ? userObject.name : "No User Found"; // Default value when userObject is null

console.log(userName);
  const {  isdeleted } = useSelector((state) => state.deleteorder);
    console.log(useSelector((state) => state.deleteorder))
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {

    if (isdeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: 'DELETE_ORDER_RESET' });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert,  isdeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, 
    // flex: 0.4 
  },
    {
      field: "user",
      headerName: "user",
      type: "number",
      minWidth: 300,
      // flex: 0.4,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      // flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 200,
      // flex: 0.4,
    },
   

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      console.log(item.user.name)
      rows.push({
        
        id: item._id,
        user:item.user.name,
        itemsQty: item.orderItem.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <Metatitle title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>
          { orders&& (
  <table className="productListTable" style={({width:'90%'})}>
    <tbody>
      <tr className="tableheading">
        <th style={({width:'26%'})}><h5>Product Id</h5></th>
        <td><h5>Order Id</h5></td>
        <td><h5>User</h5></td>
        <td><h5>Status</h5></td>
        <td><h5>itmQty</h5></td>
        <td><h5>Amount</h5></td>
        <td><h5>Action</h5></td>
      </tr>
      { orders.map((item) => (
        <tr key={item._id}>
          <td className="tablecell">{item._id}</td>
          <td className="tablecell">{item.user.name}</td>
          <td className="tablecell">{item.orderItem.length}</td>
          <td className="tablecell">{item.totalPrice}</td>
          <td className="tablecell">{item.orderStatus}</td>
          <td className="tablecell">
            <Link to={`/manager/product/${item._id}`}>
              <EditIcon />
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}
          {/* <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          /> */}
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
