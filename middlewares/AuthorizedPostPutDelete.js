import { verify } from "jsonwebtoken";
const AuthorizedPostPutDelete = (fn) => async (req,res) => {
  const {
    query: { id }
  } = req;
  const { method } = req;
  if (method === "GET"){
    return await fn(req, res)
  }else{
    const token = req.headers.authorization;
    verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
      if(!err && decoded) {
        if(decoded.sub==id || decoded.role=='admin'){
          req.decoded=decoded
          return await fn(req, res)
        }
        return res.status(500).json({message: 'Sorry you are not authorized'})
      }
      res.status(600).json({message: `Sorry you are not authenticated`,error:err, token: `${token}`})
    })
  }
};
export default AuthorizedPostPutDelete;