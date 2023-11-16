export const socialOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "",
      version: "1.0.0",
      description: "Fake Social Media API"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./src/socialmedia/modules/**/*.routes.ts"]
};