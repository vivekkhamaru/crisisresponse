require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const Alert = mongoose.model("Alert", new mongoose.Schema({
  lat:Number,
  lng:Number,
  createdAt:{ type:Date, default:Date.now }
}));

io.on("connection",(socket)=>{
  console.log("Connected:", socket.id);

  socket.on("sendAlert", async(data)=>{
    await Alert.create(data);
    io.emit("receiveAlert", data);
  });
});

server.listen(process.env.PORT || 3000, ()=>{
  console.log("Server running");
});