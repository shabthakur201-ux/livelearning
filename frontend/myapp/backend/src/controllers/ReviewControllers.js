import prisma from "../../lib/prisma.js";



export const createReview=async(req,res)=>{

    console.log("hiiiiiiiiiiiiiiiiiittttt")

    try {
        const{name,rating,userId,email}=req.body
        console.log(name)
        console.log(rating)
        console.log(userId)
        console.log(email)



        if(!name||!rating){
            return res.status(400).json({
                message:"review and rating are required"
            })
        }
       


        const  createReview=await prisma.review.create({
            data:{

                name,
                rating,
                userId,
                email
               
            }
        })

        return res.status(201).json({
            message:"review submitted sucessfully",
            name:createReview.name,
            rating:createReview.rating
        })
        
        
        
        
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
        
    }
}


export const updateReview=async(req,res)=>{
    try {
        
        const {id}=req.params
       

        const{name,rating}=req.body


        if(!name||!rating){
            return res.status(400).json({
                message:"please provide name and rating"
            })
        }


        const updatedReview=await prisma.review.update({
            where :{
                id:Number(id)
            },
            data:{
                name,
                rating
            }
        })

        return res.status(200).json({
            message:"updates sucessfully",
            name:updatedReview.name,
            rating:updatedReview.rating
        })


    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
        
    }
}

export const deleteReview=async(req,res)=>{
    try {
        const {id}=req.params

        const review=await prisma.review.findFirst({
            where:{
                id:Number(id)
            }
        })

        if(!review){
            return res.status(404).json({
                message:"review not founf"
            })
        }

        const deleteReviwe=await prisma.review.delete({
            where:{
                id:Number(id)
            }
        })
        return res.status(200).json({
            message:"deleted sucessfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
        
    }
}


export const getAllreviews=async(req,res)=>{
    try {
        const allreviews=await prisma.review.findMany()

        if(!allreviews){
            return res.status(404).json({
                message:"not found"
            })
        }

        return res.status(200).json({
            allreviews,
            message:"fetched successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
        
    }
}