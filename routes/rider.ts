import { Request, ResponseToolkit } from "@hapi/hapi";

import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

import {
  getRiderSwagger,
  deleteRiderSwagger,
  createRiderSwagger,
} from "../swagger/rider";
import { createRiderSchema, deleteRiderSchema } from "../validation/rider";
import Rider from "../models/rider";
import Account from "../models/account";

dotenv.config();

const options = { abortEarly: false, stripUnknown: true };

export let riderRoute = [
  {
    method: "POST",
    path: "/",
    options: {
      auth: "jwt",
      description: "Create a Rider",
      plugins: createRiderSwagger,
      tags: ["api", "rider"],
      validate: {
        payload: createRiderSchema,
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
        const exitRider = request.payload["_id"]
          ? await Rider.findById(request.payload["_id"])
          : null;
        if (exitRider) {
          exitRider.date = request.payload["date"];
          exitRider.name = request.payload["name"];
          exitRider.referrencedBy = request.payload["referrencedBy"];
          exitRider.phoneNumber = request.payload["phoneNumber"];
          exitRider.bankName = request.payload["bankName"];
          exitRider.accountName = request.payload["accountName"];
          exitRider.accountNumber = request.payload["accountNumber"];
          await exitRider.save();
          return response.response({ status: "ok", data: exitRider }).code(201);
        } else {
          const rider = new Rider({
            date: request.payload["date"],
            name: request.payload["name"],
            referrencedBy: request.payload["referrencedBy"],
            phoneNumber: request.payload["phoneNumber"],
            bankName: request.payload["bankName"],
            accountName: request.payload["accountName"],
            accountNumber: request.payload["accountNumber"],
          });
          await rider.save();
          return response.response({ status: "ok", data: rider }).code(201);
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
      description: "Get All Riders",
      plugins: getRiderSwagger,
      tags: ["api", "rider"],
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
        const riders = await Rider.find();
        return response.response({ status: "ok", data: riders }).code(200);
      } catch (error) {
        console.log(error);
        return response.response(error).code(500);
      }
    },
  },

  {
    method: "DELETE",
    path: "/{riderId}",
    options: {
      auth: "jwt",
      description: "Delete a Rider",
      plugins: deleteRiderSwagger,
      tags: ["api", "rider"],
    },

    handler: async (request: Request, response: ResponseToolkit) => {
      try {
        const account = await Account.findOne({
          email: request.auth.credentials.email,
        });

        const deletedRider = await Rider.deleteOne({
          _id: request.params.riderId,
        });
        console.log(deletedRider.deletedCount);

        if (!deletedRider.deletedCount) {
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
              data: deletedRider,
            })
            .code(200);
        }
      } catch (error) {
        return response.response(error).code(500);
      }
    },
  },
];
