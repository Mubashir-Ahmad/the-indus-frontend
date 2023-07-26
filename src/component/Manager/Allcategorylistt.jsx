import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link,useNavigate} from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/styles";
import Metatitle from "../title/title";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {clearError,} from "../../actions/OrderAction";
import {deletecategory, getcategory} from "../../actions/categoryAction"
// import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = ({ history }) => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const alert = useAlert();

  const { data } = useSelector((state) => state.getcategory);
 

  const { isdeleted } = useSelector((state) => state.deletecategory);
  console.log(useSelector((state) => state.deletecategory))
  const deleteProductHandler = (id) => {
    dispatch(deletecategory(id));
  };

  useEffect(() => {
    
    if (isdeleted) {
      alert.success("Category Deleted Successfully");
      navigate("/admin/category");
      dispatch({ type: 'DELETE_CATEGORY_RESET' });
    }

    dispatch(getcategory());
  }, [dispatch,alert,isdeleted]);

  const columns = [
    { field: "id", headerName: "Category ID", minWidth: 300, 
    // flex: 0.4 
  },
    {
      field: "name",
      headerName: "Name",
      type: "text",
      minWidth: 300,
      // flex: 0.4,
    },
    {
      field: "active",
      headerName: "Active",
      type: "text",
      minWidth: 150,
      // flex: 0.4,
      cellClassName: (params) => {

        return params.getValue(params.id, "active") === false ? "greenColor" : "redColor";
      },
    },
    
    {
      field: "sorting",
      headerName: "Sorting",
      type: "number",
      minWidth: 200,
      // flex: 0.4,
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
            <Link to={`/manager/update/category/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  data &&
    data.forEach((item) => {
      console.log(item)
      rows.push({
        
        id: item._id,
        name:item.Category_name,
        active: item.active,
        sorting: item.sorting,
      });
    });

  return (
    <Fragment>
      <Metatitle title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL CATEGORY</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
