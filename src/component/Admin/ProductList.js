import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  getAdminProduct,
  
} from "../../actions/productAction";
import { Link ,useNavigate} from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import Metatitle from '../title/title'
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { getproducts } from "../../actions/Action";
// import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import {deleteProduct} from "../../actions/productAction"
const ProductList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();
 const navigate = useNavigate();
  const { error, products } = useSelector((state) => state.adminproduct);
console.log(useSelector((state) => state.adminproduct))
  const {  isDeleted } = useSelector(
    (state) => state.updateproduct
  );
      console.log(useSelector(
        (state) => state.updateproduct
      ))
  const deleteProductHandler = (id) => {
    console.log('iddd',id)
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    console.log(isDeleted)
    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admindashbord");
      dispatch({ type: 'DELETE_PRODUCT_RESET' });
    }
    dispatch(getAdminProduct());
  }, [dispatch, alert, error, isDeleted,navigate]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, 
    // flex: 0.5
   },

    {
      field: "name",
      headerName: "Name",
      minWidth:150,
      // flex: 1,
    },
    {
      field: "active",
      headerName: "active",
      type: "boolean",
      minWidth: 200,
      // flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      // flex: 3,
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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
  // products &&
  // Object.keys(products).forEach((category) => {
  //   products[category].forEach((item) => {
  //     if (item.stock === 0) {
  //       // outOfStock += 1;
  //     }
  //   });
  // });
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        active: item.active,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <Metatitle title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList;
