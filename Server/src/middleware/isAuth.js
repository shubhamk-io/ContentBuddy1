import { success } from "better-auth"
import { auth } from "../libs/auth"



export const isAuth = async (req, res, next) => {

    try {
        const session = await auth.api.getSession({
            headers:req.headers
        })
if(!session){
    return res.status(401).json({
        success:false,
        message:"Unathorized"
    })

    req.user = session.user
    req.session = session
}

next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Invalid Session"
        })
    }
}