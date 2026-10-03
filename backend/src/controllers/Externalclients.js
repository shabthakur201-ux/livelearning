import prisma from "../../lib/prisma.js";

export const externalClients = async (req, res) => {
    console.log("routyyyyyyyyy hiyt")
    try {

        const { companyName, allowedDomain, status } = req.body

        // console.log("reqqqqqqqqqqqqqq",req.body)

        // console.log( "companyName",companyName   )
        // console.log("allowedDomain",allowedDomain)
        // console.log("status",status)


        if (!companyName || !allowedDomain) {
            return res.status(400).json({
                message: "all fields are required"
            })
        }

        const existingclient = await prisma.ExternalClients.findFirst({
            where: {
               
                companyName: req.body.companyName,
            }

        })
        const existingDomain = await prisma.ExternalClients.findFirst({
    where: {
         allowedDomain: req.body.allowedDomain,
    }
})


if(existingDomain){
     return res.status(409).json({
                message: "domain  already exists"
            })

}

        console.log( req.body.allowedDomain)
        console.log(req.body.companyName)
        if (existingclient) {
            return res.status(409).json({
                message: "companyname already exists"
            })
        }

        const client = await prisma.ExternalClients.create({


            data: {
                allowedDomain,
                companyName,
                status,
            },


        });

        // console.log("client", client)
        // console.log(`client created sucessfully ${client.allowedDomain}`)

        return res.status(200).json({
            message: "ckient create dsucessfully",
            data: {
                allowedDomain,
                companyName,
                status,

            }
        })



    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}
export const getAllexternalclients = async (req, res) => {
    console.log(req.headers);
    // console.log("get route hit")
    try {

        const data = await prisma.ExternalClients.findMany()

        // console.log("Fetched Data:", data);
        return res.status(200).json({
            data,
            message: "fetch sucessfully"
        })




    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}


export const getoneclient = async (req, res) => {

    try {
        const { id } = req.params


        if (!id) {
            return res.status(404).json({
                message: "please provide id"
            })
        }

        const client = await prisma.ExternalClients.findUnique({
            where: { id: parseInt(id) }
        })

        if (!client) {
            return res.status(404).json({
                message: "client not found"
            })
        }


        return res.status(200).json({
         client,
            message: "fetch sucessfully "
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}

export const updateEXternalclient=async(req,res)=>{
    // console.log("hityyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
    const {allowedDomain,companyName,status}=req.body
    try {
        const {id}=req.params
        if(!allowedDomain||!companyName){
            return res.status(400).json({
                message:"please provide details"
            })
        }
const existingDomain = await prisma.ExternalClients.findFirst({
    where: {
        allowedDomain
    }
})

if (existingDomain && existingDomain.id !== parseInt(id)) {
    return res.status(409).json({
        message: "please try different name, this domain already exists"
    })
}


        const client=await prisma.ExternalClients.findUnique({
            where:{id:parseInt(id)}
        })

        if(!client){
            return res.status(404).json({
                message:"client not found"
            })
        }

        const updateClient=await prisma.ExternalClients.update({
            where:{id:parseInt(id)},
            data:{
                companyName,
                allowedDomain,
                status
            }
        })
        return res.status(200).json({
            updateClient,
            message:"updated sucessfully"
        })


        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
        
    }
}


export const deleteClient=async(req,res)=>{
    try {
        const {id}=req.params

          const client = await prisma.ExternalClients.findUnique({
            where:{
                id:parseInt(id)
            }
        })

        if(!client){
            return res.status(404).json({
                message:"client not found"
            })
        }

      await prisma.ExternalClients.delete({
            where:{id:parseInt(id)}
        })

    

        return res.status(200).json({
            message:"delted sucessfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
        
    }

}