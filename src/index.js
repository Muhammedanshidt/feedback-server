import express from "express"
import http from "http"
import connectDB from "./config/db.js";
import apiRouter from './routes/index.js'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from 'cors'

dotenv.config();

const app = express()
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT, // your frontend URL
    credentials: true,               // 🔥 REQUIRED for cookies
  })
);


app.use("/api",apiRouter)

const server = http.createServer(app);
connectDB().then(() => {
  console.log('Associations applied successfully.');
});

const port = process.env.PORT

server.listen(port,async () => {
console.log(`server running on ${port}`)
})