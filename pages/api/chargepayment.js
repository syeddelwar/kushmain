import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function chargepayment(req, res) {
  try {
    if (req.method != "POST") return res.status(400);
    // payment details
    const { amount } = req.body;
    // crate a customer

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: amount * 100,
      payment_method_types: ["card"],
    });

    // send back the client secret
    res.send({
      message: "success",
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
