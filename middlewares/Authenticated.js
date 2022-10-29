import { verify } from "jsonwebtoken";
const Authenticated = (fn) => async (req,res) => {
  const token = req.headers.authorization;
  verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
    if(!err && decoded) {
      req.decoded = decoded
      return await fn(req, res)
    }
  
    res.status(500).json({message: 'Sorry you are not authenticated'})
  })
};
export default Authenticated;