import React, { useState, useEffect } from 'react'
import './home.css'
import { Link, NavLink } from 'react-router-dom'
import pic1 from '../../image/116.jpg'
import { getproducts, clearError } from '../../actions/Action';
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import Product from '../product/Product';
function Home() {
    const [showInfo, setShowInfo] = useState(false);

    const handleClick = () => {
        setShowInfo(!showInfo); // Toggle the state value
    };

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products, productCount } = useSelector(
        (state) => state.productts
    )
    console.log(useSelector((state) => state.productts))
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        dispatch(getproducts());
    }, [dispatch, error, alert])
    return (
        <>
            <div className="container-fluid">
                <div className="row row-1 mt-3">
                    <div className="hotel-name">
                        <h2>The Indus</h2>
                    </div>
                    {/* <div className="names">
                        <p>Indian . $$$ . </p>
                        <NavLink to='/' className='navlinks'> More Info</NavLink>
                    </div> */}
                </div>
            </div>
            <h2 className='homeheading'>Feacture Product</h2>
            <div className="container" id='container'>
                {/* {products && Object.keys(products).map((pro) => <Product product={pro} />)} */}
                {/* {products && Object.keys(products).map(category => (
                    // console.log(category),
                    products[category].map(product => (
                        <Product key={product.id} product={product} />
                    ))
                ))} */}
                {products && products.map((item=>
                    <Product product= {item} />
                    ))}
            </div>
        </>
    )
}

export default Home