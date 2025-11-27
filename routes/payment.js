import express from "express";
import { createCheckoutSession, stripeWebhook } from "../controllers/stripe.controller.js";

const router = express.Router();

// POST /api/payment/create-checkout-session
router.post("/create-checkout-session", createCheckoutSession);

// Stripe webhook (must use raw body parser)
router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

export default router;
