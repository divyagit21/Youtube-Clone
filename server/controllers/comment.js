import Comment from "../models/Comment.js"
import Video from "../models/Video.js"
import {createError} from "../error.js"

export const addComment=async(req,res,next)=>{
    const newComment=new Comment({...req.body,userId:req.user.id})
    try{
       const savedComment=await newComment.save()
       res.status(200).send(savedComment)
    }
    catch(err){
        next(err)
    }
}
export const deleteComment=async(req,res,next)=>{
    try{
       const comment=await Comment.findById(req.params.id)
       const video=await Comment.findById(req.params.id)
       if(req.user.id===comment.userId || req.user.id===video.userId){
           await Comment.findByIdAndDelete(req.params.id)
           res.status(200).json("The Comment has been deleted")
       }
       else{
        return next(createError(403,"You can delete any your comment"))
       }
    }
    catch(err){
        next(err)
    }
}
export const getComment=async(req,res,next)=>{
    try{
         const Comments=await Comment.find({videoId:req.params.videoId})
         res.status(200).json(Comments)
    }
    catch(err){
        next(err)
    }
}