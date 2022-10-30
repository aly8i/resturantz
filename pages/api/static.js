import dbConnect from "../../util/mongo";
import Static from "../../models/Static";
import AuthorizedPostPutDelete from "../../middlewares/AuthorizedPostPutDelete";
export default AuthorizedPostPutDelete( async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const data = await Static.findOne();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const data = await Static.create(req.body);
      res.status(201).json(data);
      } catch (err) {
        res.status(900).json(err);
      }
      
  }
  if (method === "PUT") {
    try {
        const data = await Static.findOneAndUpdate({name:req.body.name}, req.body);
        res.status(200).json(data);
      } catch (err) {
        res.status(500).json(err);
      }
  }
});
