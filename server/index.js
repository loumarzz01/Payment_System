// Connected Discord-Github, Discord Username: l.mrz, Roblox Username: loumarzzz00

require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express= require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

app.post('/checkout', async (request, response) => { 
    try {

        const { items } = request.body;

        const lineItems = items.map((item) => ({ 
            //This maps the cart items in the Stripe line item format.
            price_data: {
                currency: 'gbp',
                product_data: {
                    name: item.name, 
                },
                unit_amount: Math.round(Number(item.price) * 100), 
                //Stripe expects the 'unit_amount' in the smallest currency unit (pence in this case for GBP), so we multiply the price by 100 and round it.
            },
            quantity: item.count, 
        }));

        const session = await stripe.checkout.sessions.create({ 
            //Creates a new stripe checkout session. The payment method is by card, the items from the cart are used as the 'lineItems'. 
            // The mode is 'payment' instead of 'subscription'.
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cart',
        });

        response.json({ url: session.url });

    } catch (error) { 
        //The console will display an error if any come up.

        console.log(error);

        response.status(500).json({
            error: error.message
        });
    }
});
    

app.listen(4242, () => {
    console.log('Office is open on port 4242'); 
});