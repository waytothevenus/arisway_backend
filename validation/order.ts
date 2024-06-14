import Joi from "joi";

export const createOrderSchema = Joi.object({
  _id: Joi.string().required().messages({
    "any.required": "Please provide Date",
  }),

  partnerName: Joi.string().required().messages({
    "any.required": "Please provie Partner Name",
  }),

  customerName: Joi.string().required().messages({
    "any.required": "Please provie Customer Name",
  }),
  productName: Joi.array().allow(null).messages({
    "any.requried": "Please provide Product Name",
  }),

  amount: Joi.string().optional().messages({
    "any.required": "Please provide amount",
  }),
  location: Joi.string().optional().messages({
    "any.required": "Please provide location",
  }),
  assign: Joi.string().required().messages({
    "any.required": "Please provide assignment",
  }),
});
export const searchOrderSchema = Joi.object({
  partnerName: Joi.string().optional().messages({
    "any.required": "Please provie Partner Name",
  }),

  customerName: Joi.string().optional().messages({
    "any.required": "Please provie Customer Name",
  }),
  productName: Joi.array().allow(null).messages({
    "any.requried": "Please provide Product Name",
  }),

  amount: Joi.string().optional().messages({
    "any.required": "Please provide amount",
  }),
  location: Joi.string().optional().messages({
    "any.required": "Please provide location",
  }),
  assign: Joi.string().optional().messages({
    "any.required": "Please provide assignment",
  }),
});

export const deletePartnerSchema = Joi.object({
  orderId: Joi.string().required().messages({
    "any.required": "Please provide Order Id",
  }),
});

export const deliverOrderSchema = Joi.object({
  orderId: Joi.string().required().messages({
    "any.required": "Please provide Order Id",
  }),
  status: Joi.string().required().messages({
    "any.required": "Please provide Order Status",
  }),
});

export const updateOrderSchema = Joi.object({
    orderId: Joi.string().required().messages({
      "any.required": "Please provide Order Id",
    }),
    status: Joi.string().required().messages({
      "any.required": "Please provide Order Status",
    }),
  });
