// Connected Discord-Github, Discord Username: l.mrz, Roblox Username: loumarzzz00

import { useNavigate } from "react-router-dom";

import { RiArrowGoBackFill } from "react-icons/ri";

import { useState, useEffect } from "react";


import "./styles.css";



export default function Cart({ cart, setCart, count, setCount, total, setTotal}) {
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false);


    
    const handleQuantityChange = (item, amount) => { //This handles the incrementing and decrementing of the item counts.
        
        const updatedCart = cart.map((currentItem) => {

            if (currentItem.id === item.id) {

                const newCount = currentItem.count+amount;

                return {
                    ...currentItem,
                    count: newCount
                };
        
            } else {
                return currentItem;
            }
        })

        setCart(updatedCart);

        const finalCart = updatedCart.filter((currentItem) => { //After updating the count, we filter the cart to remove any items that have a count of 0 to ensure the UI stays clean and reflects only active purchases.
            if (currentItem.count > 0) {
                return true;
            } else {
                return false;
            }
        })

        setCart(finalCart);


        const priceOfItem = Number(item.price);
        const priceChange = amount * priceOfItem;


        const newTotal = total + priceChange;
        setTotal(newTotal);


        const newCount = count + amount;
        setCount(newCount);
    }

    useEffect(() => {
        setIsVisible(true); //Runs when the component is first rendered, setting the isVisible state to true which triggers the animation to make the item fade in and slide up.
    }, []);

    const handleCheckout = async () => { //Redirects the user to the checkout page
    try {

        const response = await fetch('http://localhost:4242/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: cart }),
        });

        const data = await response.json();

        console.log(data);

        if (data.url) {
            window.location.assign(data.url);
        }

    } catch (error) {
        console.log(error);
    }
};

    return (
        <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            flexDirection: "column", 
            padding: "0px 20px", 
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            display: "flex", 
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            }}>

                
            

            

            {/* Shopping cart box*/}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: 'white', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', padding: '20px 20px', borderRadius: '15px'}}>

            {/* Shopping cart title */}
            <h1 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', textAlign: "center", fontSize: '18px', alignSelf: 'flex-start'}}>Shopping cart</h1> 

            {/* Line breaker */}
            <div style={{height: '1px', backgroundColor: '#ecececf1',}}></div>


            {/* Items scrollview */}
            <scrollView className="cart-scroll-bar" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '240px', overflowY: 'auto',}}>

            
            {cart.length === 0 ? 
                <h1 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', textAlign: "center", fontSize: '16px', color: '#797979' }}>Your cart is empty.</h1>
             : 
                cart.map((item, index) => (
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '60px'}} key={index}>

                        {/* Item image */}
                        <div style={{width: '60px', height: '60px', borderRadius: '10px', overflow: 'hidden', borderStyle: 'solid', borderColor: '#ecececf1', borderWidth: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <img src={item.image} style={{height: '60px', objectFit: 'cover',  }} />
                        </div>

                        {/* Item name */}
                        <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', textAlign: "center", fontSize: '16px' }}>{item.name}</h2>

                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0px' }}>
                            {/* Item price */}
                            <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', textAlign: "center", fontSize: '16px' }}>£{item.price}</h2>

                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
                                {/* Minus button */}
                                <button onClick={() => handleQuantityChange(item, -1)}style={{ cursor: 'pointer', backgroundColor: '#ecececf1', border: 'none', borderRadius: '10px', width: '25px', height: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', textAlign: "center", fontSize: '14px', color: '#000000'}}>-</h2>
                                </button>

                                {/* Item count */}
                                <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', textAlign: "center", fontSize: '14px', color: '#000000'}}>{item.count}</h2>

                                {/* Add button */}
                                <button onClick={() => handleQuantityChange(item, 1)} style={{ cursor: 'pointer', backgroundColor: '#ecececf1', border: 'none', borderRadius: '10px', width: '25px', height: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', textAlign: "center", fontSize: '14px', color: '#000000'}}>+</h2>
                                </button>
                            </div>
                        </div>

                        
                        
                    </div>
            ))}
            </scrollView>


            {/* Line breaker */}
            <div style={{height: '1px', backgroundColor: '#ecececf1',}}></div>

            {/* Total price */}
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', textAlign: "center", fontSize: '16px' }}>Total</h2>
                <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', textAlign: "center", fontSize: '16px' }}>£{total.toFixed(2)}</h2>
            </div>

            {/* Checkout button */}
            <button onClick={handleCheckout} style={{ height: '45px', fontFamily: '"Plus Jakarta Sans", sans-serif', backgroundColor: '#6200ff', color: '#ffffff', border: 'none', borderRadius: '12px', cursor: 'pointer'}}> 
                <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '14px' }}>Checkout</h2>
            </button>

            {/* Go back link */}
            <div style={{ gap: '5px', flexDirection: 'row', display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} onClick={() => navigate("/")}>
                <h1 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', textAlign: "center", fontSize: "16px", color: '#6200ff'}}>Continue shopping</h1>
                <RiArrowGoBackFill style={{color: '#6200ff'}}/>
            </div>
            
            </div>

            
            

            
        </div>
    )   
}    