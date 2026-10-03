import { deleteClient, externalClients, getAllexternalclients, getoneclient, updateEXternalclient } from "../controllers/Externalclients.js";
import { Router } from "express";
import { auth } from "../middleware/externalclientmiddleware.js";
import { getCronData } from "../controllers/croncontroller.js";
import { deleteUser, getUsers, LoginUser, registerUser, updateUser } from "../controllers/usercontroller.js";
import { createReview, deleteReview, getAllreviews, updateReview } from "../controllers/ReviewControllers.js";
import { Exterordercreate } from "../controllers/test.js";
// import { Exterordercreate } from "../controllers/test.js";
// import { Exterordercreate } from "../controllers/EXternalOrder.js";

 export const externalclientRouter=Router()

 externalclientRouter.post("/create",externalClients)
 externalclientRouter.get("/get",getAllexternalclients)
 externalclientRouter.get("/get/:id",getoneclient)
 externalclientRouter.patch("/update/:id",updateEXternalclient)
 externalclientRouter.delete("/delete/:id",deleteClient)

 export const externalOrder=Router()
 externalOrder.post("/create",auth, Exterordercreate)

 export const cronRouter=Router()
 cronRouter.get("/getcrondata",getCronData)


 export const userRouter=Router()
 userRouter.post("/register",registerUser)
 userRouter.post("/login",LoginUser)
 userRouter.get("/get",getUsers)
 userRouter.patch("/update/:id",updateUser)
 userRouter.delete("/delete/:id",deleteUser)

 export const reviewrouter=Router()

 reviewrouter.post("/create",createReview)
 reviewrouter.patch("/update/:id",updateReview)
 reviewrouter.delete("/delete/:id",deleteReview)
 reviewrouter.get("/getall",getAllreviews)