export const createRiderSwagger = {
    "hapi-swagger": {
      responses: {
        201: {
          description: "Rider Created success!",
        },
        400: {
          description: "Input Fields Required.",
        },
        500: {
          description:
            "Sorry, something went wrong. Please refresh the page and try again.",
        },
      },
    },
  };
  export const getRiderSwagger = {
    "hapi-swagger": {
      responses: {
        200: {
          description: "Get booked call success",
        },
        404: {
          description: "Not found!",
        },
        500: {
          description:
            "Sorry, something went wrong. Please refresh the page and try again.",
        },
      },
    },
  };
  
  export const updateRiderSwagger = {
    "hapi-swagger": {
      responses: {
        200: {
          description: "Update booked call success",
        },
        400: {
          description: "Input Fields Required.",
        },
        404: {
          description: "Booked call not found!",
        },
        500: {
          description:
            "Sorry, something went wrong. Please refresh the page and try again.",
        },
      },
    },
  };
  
  export const deleteRiderSwagger = {
    "hapi-swagger": {
      responses: {
        200: {
          description: "Delete booked call success",
        },
        404: {
          description: "Booked call not found!",
        },
        500: {
          description:
            "Sorry, something went wrong. Please refresh the page and try again.",
        },
      },
    },
  };
  