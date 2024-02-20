require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
// import connectDB from "./config/connectDB";
import bodyParse from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

//config view engine
configViewEngine(app);

//config CORS
configCors(app);

//config bodyparse
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

//config cookieParser
app.use(cookieParser());

initWebRoutes(app);
initApiRoutes(app);
// connectDB.connect();

app.use((req, res) => {
  return res.send("404 not found");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("JWT BE is running on the port = " + PORT);
});
