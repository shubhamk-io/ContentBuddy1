import prisma from "../libs/db";
import { detectPlatform } from "../utils/detectPlatform";


export const analyzeVideo = async (req, res) => {
    try {
        const { contentUrl, selectedCategory, customCategory } = req.body;

        if(!contentUrl){
            return res.status(400).json({message:"URL must be required"})
        }

        if(!req.userId){
            return res.status(401).json({message:"User not Authenticate"})
        }

        const user = await prisma.user.findUnique({
            where:{
                id:req.userId
            }
        });

        if(!user){
            return res.status(404).json({
                success:true,
                message:"User Not Found"})
        }

        // step : 1  Detect Platform
        const Platform = detectPlatform(contentUrl)

        res.json({
            success:true,
            user,
        })




    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
    
}
