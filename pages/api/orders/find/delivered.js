import dbConnect from "../../../../util/mongo";
import Order from "../../../../models/Order";
import { getCookie } from 'cookies-next';
export default async function handler(req, res) {
  const { method } = req;
  const token = getCookie('accessToken', { req, res });
  await dbConnect();
  if (method === "POST") {
    verify(token,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
      if(!err && decoded) {
        if(decoded.role=='admin'){
            try {
              Order.find({'deliveryID': req.body.deliveryID})
              .populate('products.product')
              .exec()
              .then(docs=>{
                res.status(200).json(docs);
              })
            } catch (err) {
              res.status(500).json(err);
            }
          }
          return res.status(500).json({message: 'Sorry you are not authorized'})
        }
      res.status(600).json({message: "Sorry you are not authenticated"})
    })
  }
}