import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import Metatitle from "../title/title";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);
  console.log(useSelector((state) => state.newProduct));
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [discount_price, setdiscount_price] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [category, setcategory] = useState("");
  const [filedata, setFileData] = useState();
  const [imagesPreview, setImagesPreview] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState()

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admindashbord");
      dispatch({ type: 'NEW_PRODUCT_RESET' });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("price", price);
    myForm.append("description", description);
    myForm.append("discount_price", discount_price);
    myForm.append("active", checkbox);
    myForm.append("category", category);
    myForm.append("avatar", filedata);

    // images.forEach((image) => {
    //   myForm.append("avatar", image);
    // });
    dispatch(createProduct(myForm));
  };
  const handleClick = () => {
    setCheckbox((prevCheckbox) => !prevCheckbox);
  };
  const registerdatechange = (e) => {
    setFileData(e.target.files[0]);
  };
  const categories = [
    "Chicken",
    "biryani"
  ];
  return (
    <Fragment>
      <Metatitle title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              {/* <SpellcheckIcon /> */}
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              {/* <AttachMoneyIcon /> */}
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              {/* <DescriptionIcon /> */}

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              {/* <AccountTreeIcon /> */}
              <select
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              {/* <AccountTreeIcon /> */}
              <textarea
                placeholder="discount_price"
                value={discount_price}
                onChange={(e) => setdiscount_price(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <label>
                <input type="checkbox" onClick={handleClick} checked={checkbox} />
                Active
              </label>
              <p>Checkbox value: {checkbox ? 'true' : 'false'}</p>
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerdatechange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
