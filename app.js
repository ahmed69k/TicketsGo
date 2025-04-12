const express = require("express");
const mongoose = require("mongoose");
const cookieParser=require('cookie-parser')
const cors = require("cors");

const app = express();

const BookingRouter = require("./Routers/BookingRouter");
const EventRouter = require("./Routers/EventRouter");
const UserRouter = require("./Routers/UserRouter");
const AuthRouter = require("./Routers/AuthRouter");
const RegisterRouter = require("./Routers/RegisterRouter");
const UpdatePasswordRouter = require("./Routers/UpdatePasswordRouter");
const AuthenticationMiddleware = require("./Middleware/AuthenticationMiddleware");
const AuthorizationMiddleware = require("./Middleware/AuthorizationMiddleware");

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(AuthenticationMiddleware);
app.use("/api/v1/register", RegisterRouter);
app.use("/api/v1/login", AuthRouter);
app.use("/api/v1/forgetPassword", UpdatePasswordRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/bookings", BookingRouter);
app.use("/api/v1/events", EventRouter);

const db_name = process.env.DB_NAME;
const db_url = `${process.env.DB_URL}/${db_name}`;
// ^ connect our database, get the name and URL then change it here and uncomment
/*const connectionOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};*/ //not sure of this part

mongoose
  .connect(db_url)
  .then(() => console.log("mongoDB connected"))
  .catch((e) => {
    console.log(e);
  });

app.use(function (req, res, next) {
  return res.status(404).send("404");
});
app.listen(process.env.PORT, () => console.log("server started"));