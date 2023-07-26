import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  updateProduct,
  productdetail,
} from "../../actions/productAction";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/styles";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
// import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import Metatitle from "../title/title";
import { useNavigate } from "react-router-dom";
const UpdateProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()
  const { error, product } = useSelector((state) => state.productdetail);
  const { isUpdated, products } = useSelector((state) => state.updateproduct);
  console.log(useSelector((state) => state.updateproduct))
  // const {
  //   loading,
  //   error: updateError,
  //   isUpdated,
  // } = useSelector((state) => state.products);
// console.log(useSelector((state) => state.products))
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [discount_price, setdiscount_price] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [avatar, setAvatar] = useState('');
  const[avatarPreview,setAvatarPreview]=useState()
  const categories = [
    "Chicken",
    "Biryani"
  ];

  const productId =  useParams();
  console.log(productId.id)
  useEffect(() => {
    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({
        type:'UPDATE_PRODUCT_RESET'
    });
    }
  }, [dispatch,alert,error,isUpdated,productId,product]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("price", price);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("stock", Stock);
    myForm.append("discount_price", discount_price);
    myForm.append("avatar", avatar);
    dispatch(updateProduct(productId.id, myForm));
  };

  const registerdatechange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } 
  };

  return (
    <Fragment>
      <Metatitle title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
              <AccountTreeIcon />
              <textarea
                placeholder="discount_price"
                value={discount_price}
                onChange={(e) => setdiscount_price(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
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
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              // disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
