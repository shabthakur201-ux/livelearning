
// import { Prisma } from "@prisma/client"
import prisma from "../../lib/prisma.js";



export const Exterordercreate=async(req,res)=>{
    console.log(" order create hit")
    try {
console.log(req.body)

        const{pickup,
              pickupLatitude,
      pickupLongitude,
       dropoff,
      dropoffLatitude,
      dropoffLongitude,}=req.body

        if(!pickup||!dropoff){
            return res.status(400).json({
                message:"pickup and dropoff and  is required"
            })
        }


        const externalClientId = req.externalclient.id;

       

    const createOrder = await prisma.ExternalOrder.create({
    data: {
        pickup,
         pickupLatitude,
        pickupLongitude,

        dropoff,
        dropoffLatitude,
        dropoffLongitude,

        ExternalOrderId:Date.now().toString(),
        externalClientId
    }
})
        return res.status(201).json({
            message:"order placed sucessfully",
            data:{
                pickup,
                dropoff,
                 ExternalOrderId:Date.now().toString(),
        externalClientId

            }
        })


        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
        
    }
}