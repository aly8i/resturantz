import { verify } from "jsonwebtoken";
const Verify = (fn) => async (req,res) => {
  const token = req.body.token
  if(!token) return res.status(401).json("You are not authenticated");
   verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
    if(!err && decoded) {
        req.decoded = decoded;
      return await fn(req, res)
    }
    res.status(500).json('Token is not valid');
  })
  return await fn(req, res);
};
export default Verify;