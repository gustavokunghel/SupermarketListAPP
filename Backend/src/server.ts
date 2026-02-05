import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./routes/products";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Supermarket List API",
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
    },
  });
});

app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
