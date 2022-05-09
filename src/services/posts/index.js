// 1. POST 
// 2. GET 
// 3. GET (FOR SINGLE Post)
// 4. PUT 
// 5. DELETE 

import express from "express";
import postsModel from "./model.js"
import createError from "http-errors";


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
        const posts = await postsModel.findById(req.params.id)
        if(posts){
            res.send(posts)
        }else{
            next(createError(404, `Sorry, Cannot find Post with id ${req.params.id}!`))
        }
        
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
        if(updatedPost){
            res.send(updatedPost)
        }else{
            next(createError(404, `Sorry, Cannot find Post with id ${req.params.id}!`)) 
        }
    } catch (error) {
        next(error)
    }
})  

//5.
postsRouter.delete("/:id", async (req,res,next)=>{
    try {
        const deletedPost = await postsModel.findByIdAndDelete(req.params.id)
        if(deletedPost){
            res.status(204).send()
        }else{
            next(createError(404, `Sorry, Cannot find Post with id ${req.params.id}!`)) 
        }
        
    } catch (error) {
        next(error)
    }
    
})



export default postsRouter