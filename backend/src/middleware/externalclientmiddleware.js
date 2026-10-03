
import prisma from "../../lib/prisma.js";



export const auth = async(req, res, next) => {
    try {
        const domain = req.headers["domain"];
        const apiKey = req.headers["apikey"];

        if (!domain||!apiKey) {
            return res.status(400).json({
                message: "domain or key missing "
            })
        }
  

        if (apiKey !== process.env.EXTERNAL_API_KEY) {
        return res.status(401).json({
            message: "Invalid API key"
        });
    }

        const domainexists = await prisma.ExternalClients.findFirst({
            where: {
                allowedDomain: domain
            }
        })

        if (!domainexists) {
            return res.status(400).json({
                message: "invalid domain"
            })
        }
        console.log("CLIENT:", domainexists);


        req.externalclient=domainexists

                // console.log("CLIENT ID:", req.externalclient.id);

                


        next()

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}