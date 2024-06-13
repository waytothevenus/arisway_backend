import Joi from "joi";
const custom = Joi.extend({
  type: "object",
  base: Joi.object(),
  coerce: {
    from: "string",
    method(value, helpers) {
      if (
        typeof value !== "string" ||
        (value[0] !== "{" && !/^\s*\[/.test(value))
      ) {
        return;
      }

      try {
        return { value: JSON.parse(value) };
      } catch (ignoreErr) {}
    },
  },
});

export const ProfileSchema = Joi.object({
  mentor_profile: custom
    .object({
      avatar: Joi.string(),

      country: Joi.string().required().messages({
        "any.required": "Please provide country",
      }),
    
      state: Joi.string().allow(null).allow(""),
    
      city: Joi.string().allow(null).allow(""),
    
      address: Joi.string().required().messages({
        "any.required": "Please provide address.",
      }),
    
      languages: Joi.array<Object>().required().messages({
        "any.required": "Please provide languages",
      }),
    
      summary: Joi.string().required().messages({
        "any.required": "Please provide summary",
      }),
    
      social_media: Joi.object(),
    
      payment_verify: Joi.boolean(),
      payment_info: Joi.object(),
    
      professional_info: Joi.object().required().messages({
        "any.required": "Please provide professional information",
      }),
    })
    .required()
    .messages({
      "any.required": "Please provide mentor profile data",
    }),
  file: Joi.array()
    .allow(null)
    .allow("")
    .meta({ swaggerType: "file" }),
});

export const updateSummarySchema = Joi.object({
  summary: Joi.string().required().messages({
    "any.required": "Please provide summary",
  }),
});

export const updateAvatarSchema = Joi.object({
  avatar: Joi.string().required().messages({
    "any.required": "Please provide avatar",
  }),
});
export const updatePersonalInfoSchema = Joi.object({
  country: Joi.string().required().messages({
    "any.required": "Please provide country",
  }),
  state: Joi.string().allow(null).allow(""),
  city: Joi.string().allow(null).allow(""),
  address: Joi.string().required().messages({
    "any.required": "Please provide address",
  }),
  languages: Joi.array<Object>().required().messages({
    "any.required": "Please provide languages",
  }),
});

export const updateSocialMediaSchema = Joi.object({
  social_media: Joi.object().required().messages({
    "any.required": "Please provide social media",
  }),
});

export const updatePaymentInfoSchema = Joi.object({
  payment_info: Joi.object().required().messages({
    "any.required": "Please provide payment information",
  }),
});
export const updateProfessionalInfoSchema = Joi.object({
  professional_info: Joi.object().required().messages({
    "any.required": "Please provide professional information",
  }),
});
