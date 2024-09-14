import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar"
import ProductList from './Components/ProductList';
import Cart from './Components/Cart'


function App() {

    const [product, setProduct] = useState([]) // store fetched data product
    const [loading, setLoading] = useState(true) // if data is still being loaded
    const [error, setError] = useState(null) //error messages from failed data fetching.
    const [cart, setCart] = useState([]) // manages items added to the cart

    // fetch product data from an API once and It updates the products state and handles errors.
    useEffect(() => {
        // fetch the data
        const fetchProduct = async () => {
            try {
                const productResponse = await fetch("https://fakestoreapi.com/products")
                const productData = await productResponse.json();
                setProduct(productData)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, []);

    // condition if data loading
    if (loading)
        return <h1 className='text-4xl font-bold text-center p-4'>Data is loading please wait.........................</h1>
    // condition if error
    if (error)
        return <h1 className='text-2xl font-bold text-red-700'>Error: {error}</h1>;

    // add product into a cart
    const addToCart = (product) => {
        // Check if the item is already in the cart
        if (!cart.some(item => item.id === product.id)) {

            // Add the product with initial quantity of 1
            setCart([...cart, { ...product, quantity: 1 }])
        }
    }

    // To remove the product in cart
    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId))
    }

    // updates the quantity of a product in the cart 
    const updateQuntity = (productId, updateCart) => {
        setCart(cart.map(item => (
            // updateCart function return new quantity of item
            item.id === productId ? { ...item, quantity: updateCart(item) } : item
        )))
    }

    return (
        <div className='box-border m-0 p-0 font-serif'>
            <Router>
                <header className='sticky top-0'>
                    <Navbar />
                </header>

                <main>
                    <Routes>
                        <Route path='/' element={
                            <div>
                                <h1 className='text-4xl font-bold uppercase border-b-2 border-gray-300 mx-5 text-center p-5'>Products</h1>
                                <div className='flex flex-wrap gap-5 justify-center'>
                                    {product.map(products => (
                                        <ProductList
                                            key={products.id}
                                            cart={cart}
                                            product={products}
                                            addToCart={addToCart}
                                            removeFromCart={removeFromCart}
                                        />
                                    ))}
                                </div>
                            </div>
                        } />

                        <Route path='/cart' element={
                            <div >
                                <Cart
                                    cart={cart}
                                    removeFromCart={removeFromCart}
                                    updateQuantity={updateQuntity}
                                />
                            </div>
                        } />
                    </Routes>
                </main>
            </Router>
        </div>
    );
}

export default App;
