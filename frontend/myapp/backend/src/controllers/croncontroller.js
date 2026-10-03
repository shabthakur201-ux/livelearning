import prisma from "../../lib/prisma.js";
import { lastrun } from "../cron/cron.js";


export const getCronData=async(req,res)=>{
    // console.log("roiugfdgudy" )
    try {




        return res.status(200).json({
            message:"last run fetched sucessfully",
            data:{
                lastrun
            }
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


