import express from "express"
import { cronRouter, externalclientRouter, externalOrder, reviewrouter, userRouter } from "./src/routes/externalroute.js"
import cors from "cors"
import "./src/cron/cron.js";

const app=express()
const port=5000

app.use(express.json())

app.use(
    cors({
          origin: "http://localhost:3000",
    credentials: true,

    })
)

app.use("/externalclient",externalclientRouter)
app.use("/externalorder",externalOrder)
app.use("/cron",cronRouter)
app.use("/user",userRouter)
app.use("/review",reviewrouter)


app.listen(port,()=>{
    console.log(`server started at port ${port}`)
})