require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const protect = require("./middleware/auth");
const errorMiddleware = require("./middleware/error");
const sendResponse = require("./utils/response"); // make sure path is correct

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gallery Application Server API",
      version: "1.0.0",
      description:
        "API for managing albums and images with Clerk authentication",
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Test Route
app.get("/api/test-auth", protect, (req, res) => {
  sendResponse(
    res,
    200,
    { userId: req.user?.id },
    "Authenticated successfully"
  );
});

// DB connection
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Error Handling
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
