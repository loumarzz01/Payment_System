// Connected Discord-Github, Discord Username: l.mrz, Roblox Username: loumarzzz00

import { useNavigate } from "react-router-dom"; //Used for page navigation

import { RiArrowGoBackFill } from "react-icons/ri"; //Used for the arrow icon

import { useState, useEffect } from "react"; //React hooks import

import { supabase } from './supabaseClient'; //imports the supabaseClient file which includes the supabaseurl and anon key


import "./styles.css"; //Imports the style css file for the cart





export default function Cart({ cart, setCart, count, setCount, total, setTotal}) { //This exports the cart function with the cart, setCart, count, setCount, total and setTotal parameters
    const navigate = useNavigate(); //When useNavigate is called, the function is stored in the navigate variable

    const [isVisible, setIsVisible] = useState(false); //The react useState hook creates the value 'isVisible' and 'setIsVisible' is a function that changes the value. The initial value is false


    
    const handleQuantityChange = (item, amount) => { //This is a function that either increases or decreases the amount of items in the cart through plus and minus buttons
        
        const updatedCart = cart.map((currentItem) => { //This is a function that goes through the items of the cart array using the 'currentItem' variable as a paramter

            if (currentItem.id === item.id) { //If the id of the item clicked is equal to the currentItem (this refers to the current item that the map is looping through)

                const newCount = currentItem.count + amount; //newCount takes the current item's count in the looping map and adds the integer amount parameter to it

                return {
                    ...currentItem, 
                    count: newCount //The newCount variable is then pushed to the current item 'count' property
                };
        
            } else {
                return currentItem; //If the id of the current item being checked is not equal to the passed item's id, then don't make any changes
            }
        })

        setCart(updatedCart); //the setCart function is then set to the new cart

        const finalCart = updatedCart.filter((currentItem) => { //This creates a new variable that checks each item in the updatedCart array and if the item is less than 0 is is removed from the array
            if (currentItem.count > 0) {
                return true;
            } else {
                return false;
            }
        })

        setCart(finalCart); //The setCart function is then updated again to have this filter


        const priceOfItem = Number(item.price); //this changes the item.price property to a number
        const priceChange = amount * priceOfItem; //The price change is equal to the amount multiplied by the price


        const newTotal = total + priceChange; //'total' is a parameter that is passed by another page, which represents the total price of the items in the cart. now this newTotal variable just adds the change made by the minus or plus button to the original total
        setTotal(newTotal); //the total function is then updated to hold the newTotal variable value


        const newCount = count + amount; //This makes it so that the quantity of the item visibly changes after it is clicked.
        setCount(newCount); //the setCount function is updated to hold the value of newCount
    }

    useEffect(() => { //useEffect means run once a component loads. in this case we use '[]' so it runs whenever the screen refreshes
        setIsVisible(true); //so when the screen refreshes the setIsVisible function is set to true
    }, []); 

    const handleCheckout = async () => {  //Runs when the checkout button is clicked
        try { //try is used incase the function fails
            const {data, error} = await supabase.functions.invoke("clever-processor", { //runs the function created in supabase. when it runs it will turn the data and any errors
                body: {
                    items: cart, //The cart is sent to supabase
                },
            })

            if (error) { //If there is any error, it will be shown in the console
                console.log(error)
                return;
            }

            if (data?.url) { //If the data exists, the user will be redirected to the payment link
                window.location.assign(data.url) //User is redirected to the new url
            }
        } catch (err) {
            console.log(err); //Any errors of the function will be shown in the console
        }
        
    }

    return (
        <div style={{
            opacity: isVisible ? 1 : 0, //If isVisible is true then set the opacity to 1, if false set it to 0
            transform: isVisible ? "translateY(0)" : "translateY(40px)", //If isVisible is false move it down 40px
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            flexDirection: "column", 
            padding: "0px 20px", 
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            display: "flex", 
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            }}>

                
            
            {/* Below I have added commentation above each html tag so you know what each of their roles are*/}
            

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
                                {/* Minus button which passes the parameters to the handleQuantity change function when clicked */}
                                <button onClick={() => handleQuantityChange(item, -1)}style={{ cursor: 'pointer', backgroundColor: '#ecececf1', border: 'none', borderRadius: '10px', width: '25px', height: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', textAlign: "center", fontSize: '14px', color: '#000000'}}>-</h2>
                                </button>

                                {/* Item count */}
                                <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', textAlign: "center", fontSize: '14px', color: '#000000'}}>{item.count}</h2>

                                {/* Add button passes parameters to the handleQuantity change function when clicked */}
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