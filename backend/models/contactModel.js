import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    secondaryEmail: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    secondaryPhone: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    qaProduct: [
      {
        q: { type: String },
        a: { type: String },
      },
    ],
    qaShipping: [
      {
        q: { type: String },
        a: { type: String },
      },
    ],
    qaPayments: [
      {
        q: { type: String },
        a: { type: String },
      },
    ],
    qaPromotions: [
      {
        q: { type: String },
        a: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
