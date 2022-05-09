// 1. POST 
// 2. GET 
// 3. GET (FOR SINGLE Post)
// 4. PUT 
// 5. DELETE 

import express from "express";
import postsModel from "./model.js"


const postsRouter = express.Router()

//1.
postsRouter.post("/", async (req,res,next)=>{
    try {
        console.log("REQUEST BODY: ", req.body)

        const newPost = new postsModel(req.body) // this is going to VALIDATE the req.body
        const savedPost = await newPost.save() // This saves the validated body into the posts' collection
    
        res.send(savedPost)
    } catch (error) {
        next(error)
    }

    

})

//2.
postsRouter.get("/", async (req,res,next)=>{
    try {
        const posts = await postsModel.find()
        res.send(posts)
    } catch (error) {
        next(error)
    }
    
})

//3.
postsRouter.get("/:id", async (req,res,next)=>{
    try {
        const Post = await postsModel.findById(req.params.id)
        res.send(Post)
    } catch (error) {
        next(error)
    }
    
})

//4.
postsRouter.put("/:id", async (req,res,next)=>{
    try {
        const updatedPost = await postsModel.findByIdAndUpdate(
        req.params.id, // WHO
        req.body, // HOW
        { new: true } // OPTIONS (if you want to obtain the updated Post you should specify new: true)
        )
        res.send(updatedPost)
    
    } catch (error) {
        next(error)
    }
})  

//5.
postsRouter.delete("/:id", async (req,res,next)=>{
    try {
        await postsModel.findByIdAndDelete(req.params.id)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
    
})



export default postsRouter