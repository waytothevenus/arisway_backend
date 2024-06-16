import { Request, ResponseToolkit } from "@hapi/hapi";

import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

import {
  getPartnerSwagger,
  deletePartnerSwagger,
  createPartnerSwagger,
} from "../swagger/partner";
import {
  createPartnerSchema,
  deletePartnerSchema,
} from "../validation/partner";
import Partner from "../models/parter";
import Account from "../models/account";

dotenv.config();

const options = { abortEarly: false, stripUnknown: true };

export let parterRoute = [
  {
    method: "POST",
    path: "/",
    options: {
      auth: "jwt",
      description: "Create a Partner",
      plugins: createPartnerSwagger,
      tags: ["api", "bookingCall"],
      validate: {
        payload: createPartnerSchema,
        options,
        failAction: (request, h, error) => {
          const details = error.details.map((d) => {
            return { err: d.message, path: d.path };
          });
          return h.response(details).code(400).takeover();
        },
      },
    },
    handler: async (request: Request, response: ResponseToolkit) => {
      try {
        const account = Account.findOne({
          email: request.auth.credentials.email,
        });
        if (!account) {
          return response
            .response({ status: 404, message: "Not Found User Account." })
            .code(404);
        }
        const exitPartner = request.payload["_id"]
          ? await Partner.findById(request.payload["_id"])
          : null;
        if (exitPartner) {
          exitPartner.date = request.payload["date"];
          exitPartner.brandName = request.payload["brandName"];
          exitPartner.productName = request.payload["productName"];
          exitPartner.phoneNumber = request.payload["phoneNumber"];
          exitPartner.bankName = request.payload["bankName"];
          exitPartner.accountName = request.payload["accountName"];
          exitPartner.accountNumber = request.payload["accountNumber"];
          await exitPartner.save();
          return response
            .response({ status: "ok", data: exitPartner })
            .code(201);
        } else {
          const partner = new Partner({
            date: request.payload["date"],
            brandName: request.payload["brandName"],
            productName: request.payload["productName"],
            phoneNumber: request.payload["phoneNumber"],
            bankName: request.payload["bankName"],
            accountName: request.payload["accountName"],
            accountNumber: request.payload["accountNumber"],
          });
          await partner.save();
          return response.response({ status: "ok", data: partner }).code(201);
        }
      } catch (error) {
        console.log(error);
        return response.response(error).code(500);
      }
    },
  },
  {
    method: "GET",
    path: "/",
    options: {
      auth: "jwt",
      description: "Get All Parters",
      plugins: getPartnerSwagger,
      tags: ["api", "bookingCall"],
    },

    handler: async (request: Request, response: ResponseToolkit) => {
      try {
        const account = await Account.findOne({
          email: request.auth.credentials.email,
        });

        if (!account) {
          return response
            .response({ status: 404, message: "Not Found User Account." })
            .code(404);
        }
        const parters = await Partner.find()
        return response.response({ status: "ok", data: parters }).code(200);
      } catch (error) {
        console.log(error);
        return response.response(error).code(500);
      }
    },
  },

  {
    method: "DELETE",
    path: "/{partnerId}",
    options: {
      auth: "jwt",
      description: "Delete a partner",
      plugins: deletePartnerSwagger,
      tags: ["api", "bookingCall"],
    },

    handler: async (request: Request, response: ResponseToolkit) => {
      try {
        const account = await Account.findOne({
          email: request.auth.credentials.email,
        });

        const deletedPartner = await Partner.deleteOne({
          _id: request.params.partnerId,
        });
        console.log(deletedPartner.deletedCount);

        if (!deletedPartner.deletedCount) {
          return response
            .response({
              status: "err",
              err: "Parter not Found!",
            })
            .code(404);
        } else {
          return response
            .response({
              status: "ok",
              data: deletedPartner,
            })
            .code(200);
        }
      } catch (error) {
        return response.response(error).code(500);
      }
    },
  },
];
