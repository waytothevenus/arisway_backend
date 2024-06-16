import Joi from "joi";

export const createRiderSchema = Joi.object({
  _id: Joi.string().optional().allow("").messages({
    "any.required": "Please provide _id",
  }),
  date: Joi.string().required().messages({
    "any.required": "Please provide Date",
  }),

  name: Joi.string().required().messages({
    "any.required": "Please provie Brand Name",
  }),

  phoneNumber: Joi.string().optional().messages({
    "any.required": "Please provide Phone Number",
  }),
  referrencedBy: Joi.string().optional().messages({
    "any.required": "Please provide Refferenced By",
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

export const deleteRiderSchema = Joi.object({
  riderId: Joi.string().required().messages({
    "any.required": "Please provide Rider Id",
  }),
});
