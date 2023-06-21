import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import './product.css'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import pic1 from '../../image/116.jpg'
import { useSelector, useDispatch } from 'react-redux';
import { addItem_tocart } from '../../actions/CartAction';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert'
function Product({ product, isPopupActive }) {
    // console.log('jkokj',product)
    const alert = useAlert();
    const [quantity, setquantity] = useState(1); 
    const [tre, settre] = useState(false);
    const [tree, settree] = useState(true);
    // const { id } = product._id;
    // console.log('id',product._id)
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const increasequality = () => {
        if (5 <= quantity) return
        const qty = quantity + 1;
        setquantity(qty)
    }
    const decreasequality = () => {
        if (1 >= quantity) return
        const qty = quantity - 1;
        setquantity(qty)
    }
    const increasequalityy = () => {
        if (5 <= quantity) {
            settre(true)
            return
        }
        settre(true)
        settree(false)
        const qty = quantity + 1;
        setquantity(qty)
        dispatch(addItem_tocart(product._id, quantity))
        alert.success("Item Added to cart")
    }
    const decreasequalityy = () => {
        if (1>= quantity){
            settre(false)
            settree(true)
            return
        }
        const qty = quantity - 1;
        setquantity(qty)
        dispatch(addItem_tocart(product._id, quantity))
        alert.success("Item Added to cart")
    }
    const Additemcart = (id) => {
        dispatch(addItem_tocart(id, quantity))
        alert.success("Item Added to cart")
    }
    const Additemcartt = (id) => {
        console.log('iddd',id)
        // settre(true)
        const qty = quantity + 1;
        setquantity(qty)
        dispatch(addItem_tocart(id, quantity))
        alert.success("Item Added to cart")
        // settree(false)
    }
    const options = {
        edit: false,
        color: "rgba(20,20,20,0,1)", 
        activeColor: "tomato",
        value: product.ratings,
        isHalf: true,
        size: 15
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    return (
//         <>
//         <div className='itemss'>
//          <h2>{product.categoryName}</h2>
//         {product.products.map((item) => (
//             <div className={`productCard box-1 ${isOpen ? 'disabled' : ''}`} to={`/product/${product._id}`} >
//                   {/* {console.log('tyuioiuytrtyui',item)} */}
//                 <button className='text-cont' variant="outlined" color="primary" onClick={handleClickOpen} >
//                     Quick view
//                 </button>
//                 <Dialog open={open} onClose={handleClose} className='MuiDialog'>
//                     <DialogTitle>
//                         The Indus Restaurant
//                     </DialogTitle>
//                     <DialogContent>
//                         <div className="dialogContentRow">
//                             <div className="img">
//                                 <img src={pic1} />
//                             </div>
//                             <div className="descriptionn">
//                                 <div className="cont">
//                                     <h1>{product.name}</h1>
//                                     <p>{product.description}</p>
//                                 </div>
//                                 <div className="instruction">
//                                     <h2>Special Instructions</h2>
//                                     <input type='text' />
//                                     <p>You may be charged for extras.</p>
//                                 </div>
//                                 <button onClick={decreasequality}>-</button>
//                                 <input readOnly value={quantity} type='number' className="quantity-input" />
//                                 <button onClick={increasequality}>+</button>
//                                 <button onClick={()=>Additemcart(item._id)}>Add to cart</button>
//                             </div>
//                         </div>
//                     </DialogContent>
//                     <DialogActions>
//                         <button onClick={handleClose} color="primary">
//                             Close
//                         </button>
//                     </DialogActions>
//                 </Dialog>
//         <div key={item.categoryName} className='itemss'>           
//             <div>
//               <div className="image">
//                 {item.images.map((image) => (
//                   <img key={image._id} src={image.url} alt={image.public_id} />
//                 ))}
//               </div>
//               <div className="description">
//                 <strong>{item.name}</strong>
//                 <p>{item.description}</p>
//                 <span>{item.price} PKR</span>
//                 {tre && (
//                   <>
//                     <button onClick={decreasequalityy}>-</button>
//                     <input readOnly value={quantity} type="number" className="quantity-input" />
//                     <button onClick={increasequalityy}>+</button>
//                   </>
//                 )}
//                 {tree && <button onClick={()=>Additemcartt(item._id)}>Add to cart</button>}
//               </div>
//             </div>
        
//         </div>
      
//             </div>
// ))}
// </div>
//         </>
<h3>heelo</h3>
    )
}

export default Product