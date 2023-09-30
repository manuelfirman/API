export const storeOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "",
      version: "1.0.0",
      description: "Fake Store API"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./src/store/modules/**/*.ts"]
};