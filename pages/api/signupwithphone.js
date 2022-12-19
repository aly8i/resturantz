import cookie from "cookie";
import dbConnect from "../../util/mongo";
import User from "../../models/User";
import Token from "../../models/Token";
import generateAccessToken from "../../functions/generateAccessToken";

const handler = async(req, res) => {
    await dbConnect();
    if (req.method === "POST") {
      const username = req.body.username;
      const phonenumber = req.body.phonenumber;
          
          const user = await User.create({username,phonenumber});
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
    }
};

export default handler;