
const ProductList = ({ product, addToCart, cart, removeFromCart }) => {
    const inCart = cart.some(item => item.id === product.id)

    return (
        <>
            <div className="w-80 border rounded-lg bg-teal-100 shadow-sm shadow-black shadow-slate-300 hover:shadow-md hover:shadow-slate-400 text-gray-600 font-semibold text-center overflow-hidden m-5">
                <img src={product.image} alt={product.title} className="w-full h-80"></img>
                <div className="p-5">
                    <h2 className="mb-4">{product.title}</h2>
                    <p className="mb-4">$ {product.price}</p>
                    <p className="mb-4">Description : <span className="font-normal overflow-hidden"> {product.description} </span></p>
                    {
                        inCart ? (
                            <button onClick={() => removeFromCart(product.id)} className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-4">Remove From Cart</button>
                        ) : (
                            <button onClick={() => addToCart(product)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-4">Add To Cart</button>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default ProductList