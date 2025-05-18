const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const userRouter = require("./Routers/UserRouter");
const eventRouter = require("./Routers/EventRouter");
const bookingRouter = require("./Routers/BookingRouter");
const authenticationMiddleware = require("./Middleware/AuthenticationMiddleware");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use('/api/v1/', userRouter);
app.use(authenticationMiddleware);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/bookings", bookingRouter);

const db_name = process.env.DB_NAME;
const db_url = `mongodb+srv://SE_Fel_Geib:${encodeURIComponent(process.env.DB_PASS)}@se-clouddb.rdyygqc.mongodb.net/?retryWrites=true&w=majority&appName=SE-CloudDB`;
try{mongoose.connect(db_url);
    console.log("Connection to mongo successful!")
}
catch(e){
    console.log("MongoDB COnnection Failed!")
}


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
