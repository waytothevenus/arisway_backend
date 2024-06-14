import Joi from "joi";

export const createPartnerSchema = Joi.object({
  _id: Joi.string().optional().allow("").messages({
    "any.required": "Please provide _id",
  }),
  date: Joi.string().required().messages({
    "any.required": "Please provide Date",
  }),

  brandName: Joi.string().required().messages({
    "any.required": "Please provie Brand Name",
  }),

  productName: Joi.array().allow(null).messages({
    "any.requried": "Please provide Product Name",
  }),

  phoneNumber: Joi.string().optional().messages({
    "any.required": "Please provide Phone Number",
  }),
  bankName: Joi.string().optional().messages({
    "any.required": "Please provide Bank Name",
  }),
  accountName: Joi.string().required().messages({
    "any.required": "Please provide Account Name",
  }),
  accountNumber: Joi.string().required().messages({
    "any.required": "Please provide Account Number",
  }),
});

export const deletePartnerSchema = Joi.object({
  partnerId: Joi.string().required().messages({
    "any.required": "Please provide Partner Id",
  }),
});
