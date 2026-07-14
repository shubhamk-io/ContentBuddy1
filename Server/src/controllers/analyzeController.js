import { analysisGraph } from "../Agents/graphAgent/graph";
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
        res.json({
            success:true,
            user,
        })


        const result = await analysisGraph.invoke({
            contentUrl
        })

        if(result.error){
            return res.status(422).json({success:false , message:result.error})
        }


return res.status(200).json({
    success:true,
    data : {
        orignalAnalysis: result.singleVideoAnalysis,
        similarVideo: result.similarVideoAnalysis,
        finalReport : result.finalReport
    }
})


    } catch (error) {
        console.log("analyzeVideo error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
    
}
