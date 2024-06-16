import { Request, ResponseToolkit } from "@hapi/hapi";

import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

import {
  getOrderSwagger,
  deleteOrderSwagger,
  createOrderSwagger,
} from "../swagger/order";
import { createOrderSchema, deliverOrderSchema, updateOrderSchema } from "../validation/order";
import Order from "../models/parter";
import Account from "../models/account";

dotenv.config();

const options = { abortEarly: false, stripUnknown: true };

export let orderRoute = [
  {
    method: "POST",
    path: "/",
    options: {
      auth: "jwt",
      description: "Create a Order",
      plugins: createOrderSwagger,
      tags: ["api", "order"],
      validate: {
        payload: createOrderSchema,
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
        const existOrder = request.payload["_id"]
          ? await Order.findById(request.payload["_id"])
          : null;
        if (existOrder) {
          existOrder.date = request.payload["date"];
          existOrder.brandName = request.payload["brandName"];
          existOrder.productName = request.payload["productName"];
          existOrder.phoneNumber = request.payload["phoneNumber"];
          existOrder.bankName = request.payload["bankName"];
          existOrder.accountName = request.payload["accountName"];
          existOrder.accountNumber = request.payload["accountNumber"];
          await existOrder.save();
          return response
            .response({ status: "ok", data: existOrder })
            .code(201);
        } else {
          const order = new Order({
            date: request.payload["date"],
            brandName: request.payload["brandName"],
            productName: request.payload["productName"],
            phoneNumber: request.payload["phoneNumber"],
            bankName: request.payload["bankName"],
            accountName: request.payload["accountName"],
            accountNumber: request.payload["accountNumber"],
          });
          await order.save();
          return response.response({ status: "ok", data: order }).code(201);
        }
      } catch (error) {
        console.log(error);
        return response.response(error).code(500);
      }
    },
  },
  {
    method: "POST",
    path: "/deliver",
    options: {
      auth: "jwt",
      description: "Deliver a Order",
      plugins: createOrderSwagger,
      tags: ["api", "order"],
      validate: {
        payload: deliverOrderSchema,
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
        const existOrder = request.payload["_id"]
          ? await Order.findById(request.payload["_id"])
          : null;
        if(!existOrder) {
          return response.response({status: 404, messsage: "Order not found"}).code(404);
        }else{
          existOrder.status = request.payload["status"];
          await existOrder.save();
          return response.response({status: "ok", data: existOrder}).code(201);
        }
      } catch (error) {
        console.log(error);
        return response.response(error).code(500);
      }
    },
  },
  {
    method: "POST",
    path: "/update",
    options: {
      auth: "jwt",
      description: "Update a Order",
      plugins: createOrderSwagger,
      tags: ["api", "order"],
      validate: {
        payload: updateOrderSchema,
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
        const existOrder = request.payload["_id"]
          ? await Order.findById(request.payload["_id"])
          : null;
        if(!existOrder) {
          return response.response({status: 404, messsage: "Order not found"}).code(404);
        }else{
          existOrder.status = request.payload["status"];
          await existOrder.save();
          return response.response({status: "ok", data: existOrder}).code(201);
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
      plugins: getOrderSwagger,
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
        const parters = await Order.find();
        return response.response({ status: "ok", data: parters }).code(200);
      } catch (error) {
        console.log(error);
        return response.response(error).code(500);
      }
    },
  },

  {
    method: "DELETE",
    path: "/{orderId}",
    options: {
      auth: "jwt",
      description: "Delete a Order",
      plugins: deleteOrderSwagger,
      tags: ["api", "bookingCall"],
    },

    handler: async (request: Request, response: ResponseToolkit) => {
      try {
        const account = await Account.findOne({
          email: request.auth.credentials.email,
        });

        const deletedOrder = await Order.deleteOne({
          _id: request.params.orderId,
        });
        console.log(deletedOrder.deletedCount);

        if (!deletedOrder.deletedCount) {
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
              data: deletedOrder,
            })
            .code(200);
        }
      } catch (error) {
        return response.response(error).code(500);
      }
    },
  },
];
