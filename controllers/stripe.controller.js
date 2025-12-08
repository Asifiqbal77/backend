import Stripe from "stripe";
import dotenv from "dotenv";
import Booking from "../model/booking.model.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// --- Helper: Convert PKR to USD (approx) ---
function convertPKRtoUSDCents(pkrAmount) {
  const rate = 0.0036; // 1 PKR = 0.0036 USD (approx)
  const usd = pkrAmount * rate;
  return Math.round(usd * 100); // convert to cents
}

// POST /api/payment/create-checkout-session
export const createCheckoutSession = async (req, res) => {
  try {
    const {
      amountCents,     // This is actually PKR
      currency = "usd",
      tourId,
      tourName,
      customerName,
      customerEmail,
      description,
    } = req.body;

    if (!amountCents || !tourId || !tourName || !customerName || !customerEmail) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 💵 Convert PKR → USD →
    const finalAmountForStripe = convertPKRtoUSDCents(Number(amountCents));

    // ✔ Save booking in DB as PKR
    const booking = await Booking.create({
      tourId,
      tourName,
      customerName,
      customerEmail,
      amount: Number(amountCents),  // save actual PKR amount
      currency: "pkr",
      status: "pending"
    });

    // ✔ Create stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",   // Stripe will charge in USD
            product_data: { name: tourName, description: description || "" },
            unit_amount: finalAmountForStripe,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/payment-cancel`,
      customer_email: customerEmail,
      metadata: {
        bookingId: booking._id.toString(),
        tourId,
        tourName,
      },
    });

    booking.stripeSessionId = session.id;
    await booking.save();

    return res.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error("createCheckoutSession error:", err);
    return res.status(500).json({ message: "Failed to create checkout session" });
  }
};

// STRIPE WEBHOOK
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, secret);
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const bookingId = session.metadata?.bookingId;
      if (bookingId) {
        const booking = await Booking.findById(bookingId);
        if (booking) {
          booking.status = "paid";
          booking.stripeSessionId = session.id;
          await booking.save();
          console.log("Booking marked as paid:", bookingId);
        }
      }
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  }

  res.json({ received: true });
};










//original code 

// import Stripe from "stripe";
// import dotenv from "dotenv";
// import Booking from "../model/booking.model.js"; //i things this will give error

// dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // POST /api/payment/create-checkout-session
// export const createCheckoutSession = async (req, res) => {
//   try {
//     const {
//       amountCents,
//       currency = "usd",
//       tourId,
//       tourName,
//       customerName,
//       customerEmail,
//       description,
//     } = req.body;

//     if (!amountCents || !tourId || !tourName || !customerName || !customerEmail) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // 1) create a pending booking in DB
//     const booking = await Booking.create({
//       tourId,
//       tourName,
//       customerName,
//       customerEmail,
//       amount: Number(amountCents),
//       currency,
//       status: "pending"
//     });

//     // 2) create stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: [
//         {
//           price_data: {
//             currency,
//             product_data: { name: tourName, description: description || "" },
//             unit_amount: Number(amountCents),
//           },
//           quantity: 1,
//         },
//       ],
//       success_url: `${process.env.DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.DOMAIN}/payment-cancel`,
//       customer_email: customerEmail,
//       metadata: {
//         bookingId: booking._id.toString(),
//         tourId: tourId,
//         tourName: tourName,
//       },
//     });

//     // Save stripe session id to booking for lookup
//     booking.stripeSessionId = session.id;
//     await booking.save();

//     // Return checkout URL
//     return res.json({ url: session.url, id: session.id });
//   } catch (err) {
//     console.error("createCheckoutSession error:", err);
//     return res.status(500).json({ message: "Failed to create checkout session" });
//   }
// };

// // Webhook handler: POST /api/payment/webhook
// export const stripeWebhook = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
//   } catch (err) {
//     console.error("Webhook signature verification failed.", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle the checkout.session.completed event
//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;

//     try {
//       const bookingId = session.metadata?.bookingId;
//       if (bookingId) {
//         const booking = await Booking.findById(bookingId);
//         if (booking) {
//           booking.status = "paid";
//           booking.stripeSessionId = session.id;
//           await booking.save();
//           console.log("Booking marked as paid:", bookingId);
//         } else {
//           console.warn("Booking not found for webhook bookingId:", bookingId);
//         }
//       }
//     } catch (err) {
//       console.error("Error updating booking after webhook:", err);
//     }
//   }

//   // Respond to Stripe quickly
//   res.json({ received: true });
// };
