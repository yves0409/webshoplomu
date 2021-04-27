import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";

//Route : GET /api/contacts
//What it does: fetching contactinfo
//Who : Public
const getContact = asyncHandler(async (req, res) => {
  const contactinfo = await Contact.find({});

  res.json(contactinfo);
});

export { getContact };
