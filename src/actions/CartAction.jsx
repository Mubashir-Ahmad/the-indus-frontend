import axios from 'axios'

const addItem_tocart =(id,quantity) => async (dispatch,getState)=>{        
        const {data}= await axios.get(`http://localhost:4000/api/v1/product/${id}`)

            console.log('rsssssses',data)
            dispatch({
            type:'ADD_TO_CART',
            payload:{
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].url,
            stock:data.product.stock,
            quantity,
            }
        })
        localStorage.setItem('cartitem',JSON.stringify(getState().cart.cartitems));
}
const removeitemfromcart =(id)=>async(dispatch,getState)=>{
        dispatch({
            type:'DELETE_TO_CART',
            payload:id
        })
        localStorage.setItem('cartitem',JSON.stringify(getState().cart.cartitems));
}
const shippingInfo =(data)=>async(dispatch)=>{
    dispatch({
        type:'SAVE_SHIPPING_INFO',
        payload:data
    })
    localStorage.setItem('shippinginfo',JSON.stringify(data));
}
export {addItem_tocart , removeitemfromcart,shippingInfo}