import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import Metatitle from "../title/title";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearError, deleteUser } from "../../actions/UserAction";
import { useNavigate } from "react-router-dom";

const UsersList = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, users } = useSelector((state) => state.alluser);
// console.log('hello',useSelector((state) => state.alluser))
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);
  console.log(useSelector((state) => state.profile))
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      alert.success("Delete user successfully");
      navigate("/admin/users");
      dispatch({ type: 'delete_user_reset'});
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, history, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
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
            <Link to={`/admin/update/user/${params.getValue(params.id, "id")}`}>
            <i class="fa-solid fa-gears"></i>
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
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

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <Metatitle title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
          {  users&& (
  <table className="productListTable" style={({width:'90%'})}>
    <tbody>
      <tr className="tableheading">
        <th style={({width:'26%'})}><h5>Product Id</h5></th>
        <td><h5>User Id</h5></td>
        <td><h5>Name</h5></td>
        <td><h5>email</h5></td>
        <td><h5>Role</h5></td>
        <td><h5>Action</h5></td>
      </tr>
      {  users.map((item) => (
        <tr key={item._id}>
          <td className="tablecell">{item._id}</td>
          <td className="tablecell">{item.name}</td>
          <td className="tablecell">{item.email}</td>
          <td className="tablecell">{item.role}</td>
          <td className="tablecell">
            <Link to={`/manager/product/${item._id}`}>
            <i class="fa-solid fa-gears"></i>
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

export default UsersList;
