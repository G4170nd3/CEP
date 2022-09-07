const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")
const otpVerification = require("./routes/otp")

const app = express();

app.use(express.json());
app.use(cors());

// statusCode index:
// 500 - reg succesful
// 501 - same email while reg
// 502 - login info doesn't match any records
// 550 - login succesful
// 404 - user not found while fetching data
// 300 - user ofund while fetching data

app.use("/api", authRoutes)
app.use("/api/user", userRoutes)
app.use("/otp", otpVerification)

app.listen(3001, () => {
    console.log("running srverrrrrr");
});