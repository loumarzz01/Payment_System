// Connected Discord-Github, Discord Username: l.mrz, Roblox Username: loumarzzz00


import { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import AddItem from "./assets/AddItem.png";

export default function Item({ name, price, image, onClick }) {

  const [isCupHovered, setIsCupHovered] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
      setIsVisible(true); //Runs when the component is first rendered, setting the isVisible state to true which triggers the animation to make the item fade in and slide up.
    }, []);

  const [icon, setIcon] = useState(<FaCartShopping size={20} style={{ color: '#ffffff'}} />);

  return (
         <div 
        onMouseEnter={() => setIsCupHovered(true)}
        onMouseLeave={() => setIsCupHovered(false)}
        style={{
        height: "500px", 
        width: "400px", 

        borderWidth: "1px",
        borderColor: "#dbdbdb",
        borderStyle: "solid",
        
        backgroundColor: "#ecececf1", 
        borderRadius: "25px", 
        position: "relative",

        alignItems: "center",

        justifyContent: "flex-end",
        flexDirection: "column",
        display: "flex",

        opacity: isVisible ? 1 : 0, //Fade in animation
        transform: isVisible ? "translateY(0)" : "translateY(40px)", //Float up animation
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out', //Animation transition
        }}>

        <img
          src={image} 
          alt={name} 
          style={{ 
          position: 'absolute', 
          transform: isCupHovered? "scale(1.05) rotate(1deg)" : "scale(1) rotate(0deg)", //When the cup is hovered over, it scales up and rotates slightly to give a sense of interactivity.
          transition: 'transform 0.5s ease',
          top: '0px', 
          left: '0px',
          width: '100%', 
            height: '100%',
          objectFit: 'contain',
          
          }} 
        />
        

        <div style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '15px', left: '15px', backgroundColor: '#e8d9ff', padding: "0px 20px", borderRadius: "15px", border: "none" }}>
          <h1 style={{ fontSize: '16px', color: '#6200ff', fontWeight: 'bold' }}>NEW</h1>
        </div>



        <div style={{ 
          position: 'relative', 
          bottom: "1px", 
          height: "27%", 
          width: "100%", 
          backgroundColor: "#ffffff", 
          borderTopLeftRadius: "0px", 
          borderTopRightRadius: "0px", 
          borderBottomLeftRadius: "25px", 
          borderBottomRightRadius: "25px",
         

          }}>
          <h1 //This is responsible for displaying the name of the item, it is positioned at the top left of the white box and has a larger font size than the price.
          style={{ position: 'absolute', top: '10px', left: '15px', fontSize: '16px', color: '#2e2e2e' }}>
            {name} 
            </h1> 
          
          <h1 //This is responsible for displaying the price of the item, it is positioned at the bottom left of the white box and has a smaller font size than the name.
          style={{ position: 'absolute', bottom: '38px', left: '15px', fontSize: '14px', color: '#c0c0c0', fontWeight: 'normal' }}>Price:</h1> 
          <h1 style={{ position: 'absolute', bottom: '10px', left: '15px', fontSize: '18px', color: '#2e2e2e',  }}>£{price}</h1>

          <button // This is the cart button, it scales up when hovered over and is responsible for adding the item to the cart.
            onClick={() => {
              setIsAdded(true)
              onClick()
              
            }} //When the button is clicked, the icon changes to a check mark to indicate that the item has been added to the cart.
            style={{ transition: 'transform 0.2s ease', transform: isCartHovered? "scale(1.1)" : "scale(1)", position: 'absolute', bottom: '15px', right: '15px', backgroundColor: '#6200ff', cursor: "pointer", padding: "20px 20px", borderRadius: "15px", border: "none" }}
            onMouseEnter={() => setIsCartHovered(true)}
            onMouseLeave={() => setIsCartHovered(false)}
          >

            {isAdded ? (
              <FaCheck size={20} style={{ color: '#ffffff'}} />  
              ) : (
              <FaCartShopping size={20} style={{ color: '#ffffff'}} />
              )}
          </button>

          {!isAdded && (
            <img src={AddItem} alt="Add Item" style={{ pointerEvents: 'none', opacity: isCartHovered ? 1 : 0, transition: 'opacity 0.3s ease', position: 'absolute', bottom: '-60px', right: '-35px', }} />
          )}
          
          
          


        </div>

        
        
      </div>
  )
}  