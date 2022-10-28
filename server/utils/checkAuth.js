import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {

    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try{
            const decodedData = jwt.verify(token, process.env.JWT_SECRET)

            req.userId = decodedData.id
            
            next()
        } catch (e) {
            return res.status(401).json({message: "User is not authorized"})
        }
    } else {
        return res.status(401).json({message: "User is not authorized!"})
    }
}