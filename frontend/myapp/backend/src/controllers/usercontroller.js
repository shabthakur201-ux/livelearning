import prisma from "../../lib/prisma.js";
import bcrypt from "bcrypt"


export const registerUser = async (req, res) => {
    // console.log("hittttttttttttttttttttttttttttttttttt")
    try {

        const { email, password, name } = req.body
        // console.log("email",email)
        // console.log("password",password)
        // console.log("name",name)

        if (!email || !password |!name) {
            return res.status(400).json({
                message: "email and password is required"
            })
        }
      if (name.trim().length < 2) {
    return res.status(400).json({
        message: "Name must be at least 2 characters"
    });
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


if (!emailRegex.test(email)) {
    return res.status(400).json({
        message: "Please enter a valid email"
    });
}
if(password.length<6){
    return res.status(400).json({
        message: "Password must be at least 6 characters"
    });
}
        const existingUser = await prisma.User.findUnique({
            where: { email }
        })


        if (existingUser) {
            return res.status(409).json({
                message: "user already exists"
            })
        }

        const hashpass = await bcrypt.hash(password, 10)
        console.log("hashpass",hashpass)

        const user = await prisma.User.create({
            data: {
                email,
                password: hashpass,
                name

            }


        })

        console.log("user",user)

        return res.status(201).json({
            message: "user regitser sucessfully",
            name:user.name,
            email:user.email,
            id:user.id

        })


    } catch (error) {
        // console.log("hhhhh",error.message)
        return res.status(500).json({
            message: error.message,
        })

    }
}


export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email)
        console.log(password)
        if (!email || !password) {
            return res.status(400).json({
                message: "emaillllll and passssss is required"
            })
        }

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


if (!emailRegex.test(email)) {
    return res.status(400).json({
        message: "Please enter a valid email"
    });
}

        const existingUser = await prisma.User.findUnique({
            where: { email }
        })
        if (!existingUser) {
            return res.status(404).json({
                message: "plesse register first"
            })
        }

        const comparepass = await bcrypt.compare(password, existingUser.password)
        if (!comparepass) {
            return res.status(400).json({
                message: "incorrct password"
            })
        }

        return res.status(200).json({
            message: "login sucessfully",
            name: existingUser.name,
            email: existingUser.email,

        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getUsers = async (req, res) => {
    try {

        const user = await prisma.User.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        })

        return res.status(200).json({
            user,


            message: "fetch sucessfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }
}


export const updateUser=async(req,res)=>{
    console.log("route hit")
    try {
        const{id}=req.params
        console.log("id",id)

        const{name,email}=req.body



    


        const existingUser=await prisma.User.findUnique({
            where: { id:parseInt(id) }
        })

        if(!existingUser){
            return res.status(404).json({
                message:"user not found"
            })
        }

        const updateduser=await prisma.User.update({
           where:{id:parseInt(id)},
                data: {
            name,
            email
        }
        })
        return res.status(200).json({
            message:"user updated sucessfully"
        })

        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const deleteUser=async(req,res)=>{

    try {

        const {id}=req.params


      const user=await prisma.User.findUnique({
            where:{id:parseInt(id)}
        })

        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }

        await prisma.User.delete({
            where:{id:parseInt(id)}
        })

        return res.status(200).json({
            message:"user deleted sucessfully"
        })

         

        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
        
    }

}