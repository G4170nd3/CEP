const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")
const otpVerification = require("./routes/otp")
const advertisements = require("./routes/ads")

const app = express();

app.use(express.json());
app.use(cors());

// statusCode index:

// auth.js: 500
// 500 - reg succesful
// 501 - same email while reg
// 502 - unauthorized access (no email for the token found)
// 503 - token found and sent
// 504 - login succesful
// 505 - login info doesn't match any records

// users.js: 400
// 400 - user not found while fetching data
// 401 - user found while fetching data
// 402 - null value(s) present while updating data
// 403 - user data updated succesfully

// otp.js: 300
// 300 - success otp sent/otp updated
// 301 - been less than a minute
// 302 - wrong email sent in request body, not possible

// ads.js: 200
// 200 - ad with same title alreayd present
// 201 - new ad created
// 202 - all ads of all users fetched
// 203 - all active ads of all users minus ads of that user fetched
// 204 - all ads of that user fetched.
// 205 - all active ads of the user fetched
// 206 - unauthorized acces while editing ad
// 207 - no change in title/desc/photo while editing ad
// 208 - ad updated
// 209 - ad deleted

app.use("/api", authRoutes)
app.use("/api/user", userRoutes)
app.use("/otp", otpVerification)
app.use("/ads", advertisements)

app.listen(3001, () => {
    console.log("running srverrrrrr");
});