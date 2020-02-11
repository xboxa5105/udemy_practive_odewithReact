import express from "express";
import {default as authRoutes} from "./routes/authRoutes";
import mongoose from "mongoose";
import { default as keys } from "./config/keys";
import "./services/passport";
const app = express();
mongoose.connect(`mongodb+srv://${keys.mongodbUsername}:${keys.mongodbPassword}@cluster0-uha59.mongodb.net/test?retryWrites=true&w=majority`)

authRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
