const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const busRoutes = require("./routes/busRoute");
const passangerRoute = require("./routes/passangerRoute");
const busRoot = require("./routes/busrootRoute");
const busBookRoute = require("./routes/bookingRoute");
const paymentDRoute = require("./routes/paymetDRoute");

require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));



app.use(
    cors()
);

app.use(express.json());
mongoose.set("strictQuery", true);

app.use("/bus", busRoutes);
app.use("/passanger", passangerRoute);
app.use("/busroot", busRoot);
app.use("/busbook", busBookRoute);
app.use("/paymentDetails", paymentDRoute);



mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to the database and listening on port", process.env.PORT);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });