import dbConnect from "../../../../util/mongo";
import User from "../../../../models/User";
import cookie from "cookie";
import Token from "../../../../models/Token";
import generateAccessToken from "../../../../functions/generateAccessToken";
import { verify } from "jsonwebtoken";
export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  if (method === "POST") {
    verify(req.body.jwt,process.env.NEXT_PUBLIC_JWT_SECRET,async function(err,decoded){
      if(!err && decoded) {
        try {
          const user = await User.findOne({'googleID': decoded.googleID});
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
          res.status(200).json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      }})
  }
}
