// Connected Discord-Github, Discord Username: l.mrz, Roblox Username: loumarzzz00

import { useState, useEffect} from "react";


import { FaArrowRight } from "react-icons/fa";

import Item from "./Item.jsx";
import Cart from "./Cart.jsx";

import BronzeCup from "./assets/bronze cup.png";
import SilverCup from "./assets/silver cup.png";
import GoldCup from "./assets/gold cup.png";

import { Routes, Route, useNavigate } from "react-router-dom";




export default function App() {

  const navigate = useNavigate();

  const [ total, setTotal ] = useState(0.0);

  /**
 Logic for adding items to the cart. 
 * Instead of just pushing to an array, we check if the item already exists.
 * This prevents duplicate rows in the cart UI and follows standard e-commerce logic.
 */

  const handleAddToCart = (item) => {
  

  const existingItem = cart.find((cartItem) => {
    return cartItem.id === item.id;
  });

  if (existingItem) {

    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, count: cartItem.count + 1 };
      }
      return cartItem;
    });
    setCart(updatedCart);
  } else {

    const newItem = { ...item, count: 1 };
    setCart([...cart, newItem]);
  }


  const itemPrice = Number(item.price);
  setTotal(total + itemPrice);
  setCount(count + 1);
  };



  const [ Items ] = useState([ //Items array
    {id: 1, name: "Bronze Coffee", price: "1.00", count: 0, image: BronzeCup}, 
    {id: 2, name: "Silver Coffee", price: "2.00", count: 0, image: SilverCup},
    {id: 3, name: "Gold Coffee", price: "3.00", count: 0, image: GoldCup},
    
  ]);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); //Runs when the component is first rendered, setting the isVisible state to true which triggers the animation to make the item fade in and slide up.
  }, )

  


  const [count, setCount] = useState(0);




  const [cart, setCart] = useState([]); //This is the state that holds the items that have been added to the cart.


  const [isCartHovered, setIsCartHovered] = useState(false); //This state is used to determine whether the cart button is being hovered over or not, which is used to scale the button up when hovered over.





  return (
    <Routes>
      <Route path="/" element={
    <div style={{ flexDirection: "column", padding: "0px 20px", fontFamily: '"Plus Jakarta Sans", sans-serif',display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      

      
        

      <div style={{ display: "flex", gap: "50px", flexDirection: "row" }}>
      {Items.map((item) => ( //Displays each item in the Items array, passing the name, price and image as props to the Item component. Also passes an onClick function that adds the item to the cart when the cart button is clicked.
        
        <Item 
            key={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            onClick={() => handleAddToCart(item)}
         
        />
        
      ))}
      </div>

      <div style={{ opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out', }}> 
      <button 
          onClick={() => navigate("/cart")}
          style={{ transform: isCartHovered ? "scale(1.1)" : "scale(1)", transition: 'transform 0.2s ease', marginTop: 70, border: "none", backgroundColor: '#6200ff', borderRadius: "15px", padding: '0px 15px', flexDirection: 'row',alignItems: "center", justifyContent: "center", display: "flex", gap: "10px", cursor: "pointer" }}
          onMouseEnter={() => setIsCartHovered(true)}
          onMouseLeave={() => setIsCartHovered(false)}
        >
          <h2 style={{color: '#ffffff', fontSize: '17px', fontWeight: '500'}}>View cart </h2>
          <FaArrowRight style={{color: '#ffffff'}} />

        
        </button>
      </div>

    </div>
      } 
      />
      <Route path="/cart" element={<Cart setCart={setCart} cart={cart} setTotal={setTotal} total={total} count={count} setCount={setCount} />} /> 

    </Routes>
  )
}