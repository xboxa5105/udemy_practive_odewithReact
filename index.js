import express from "express";
import {default as authRoutes} from "./routes/authRoutes";
import "./services/passport";
const app = express();

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
