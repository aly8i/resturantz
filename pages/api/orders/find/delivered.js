import dbConnect from "../../../../util/mongo";
import Order from "../../../../models/Order";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "POST") {
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
}