// 1. POST 
// 2. GET 
// 3. GET (FOR SINGLE Post)
// 4. PUT 
// 5. DELETE 

import express from "express";
import postsModel from "./model.js"


const postsRouter = express.Router()

//1.
postsRouter.post("/", async (req,res)=>{

    console.log("REQUEST BODY: ", req.body)

    const newPost = new postsModel(req.body) // this is going to VALIDATE the req.body
    const savedPost = await newPost.save() // This saves the validated body into the posts' collection

    res.send(savedPost)

})

//2.
postsRouter.get("/", async (req,res)=>{
    const posts = await postsModel.find()
    res.send(posts)
})

//3.
postsRouter.get("/:id", async (req,res)=>{
    const Post = await postsModel.findById(req.params.id)
    res.send(Post)
})

//4.
postsRouter.put("/:id", async (req,res)=>{
    const updatedPost = await postsModel.findByIdAndUpdate(
        req.params.id, // WHO
        req.body, // HOW
        { new: true } // OPTIONS (if you want to obtain the updated Post you should specify new: true)
      )
      res.send(updatedPost)
})

//5.
postsRouter.delete("/:id", async (req,res)=>{
    await postsModel.findByIdAndDelete(req.params.id)
    res.status(204).send()
})



export default postsRouter