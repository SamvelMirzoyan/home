import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Categories from "./Categories";
import Items from "./Items";
import { useState } from "react";
import { Context } from "./Context";


function App() {
  const cart = useSelector(state => state.cart)
  const Dispatch = useDispatch()
  const [currentPage,setCurrentPage] = useState(1)
  const properties = {
    currentPage,setCurrentPage
  }

  return (
    <Context.Provider value={properties}>
    <div className="App">
       <Categories/>
       <Items/>
       <div className="shop_cart_container">
        <h2>Your Cart</h2>
       <div className="shop_cart">
        {cart.map(item =>{
          return <div className='item' key={Math.random()}>
          <div className='items_img' style={{background:`url(${item.picture}) no-repeat center center /cover`}}></div>
          <h2>{item.name}</h2>
          <p>{item.price}$</p>
          <button onClick={() =>Dispatch({type:'REMOVE_CART',payload:item})}>Remove Cart</button>
          </div>
        })}
       </div>
       
       </div>
    </div>
    </Context.Provider>
  );
}

export default App;
