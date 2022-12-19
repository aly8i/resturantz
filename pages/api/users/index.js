import dbConnect from "../../../util/mongo";
import User from "../../../models/User";
import generateAccessToken from "../../../functions/generateAccessToken";
import Token from "../../../models/Token";
import cookie from "cookie";
import AuthorizedGet from "../../../middlewares/AuthorizedGet";
import { verify } from "jsonwebtoken";
export default AuthorizedGet( async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    verify(req.body.jwt,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
      if(!err && decoded) {
    try {
      const user = await User.create({      
        googleID:decoded.googleID,
        username:decoded.username,
        fullname:decoded.fullname,
        img:decoded.img
      });
      const access = generateAccessToken(user);
      try {
        await Token.create({value:access,userID:user._id});
        res.setHeader("Set-Cookie",cookie.serialize("accessToken", access, {
          maxAge: 2*24*60*60*1000,
          sameSite: "strict",
          httpOnly: true,
          path: "/",
        })
      );
      } catch (err) {
        res.status(900).json(err);
      }
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }})
  }
});
