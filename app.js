const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const userRouter = require("./Routers/UserRouter");
const eventRouter = require("./Routers/EventRouter");
const authenticationMiddleware = require("./Middleware/AuthenticationMiddleware");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

