import cookie from "cookie";
import { deleteCookie } from "cookies-next";
const handler = async(req, res) => {
    res.setHeader("Set-Cookie",cookie.serialize("accessToken", "", {
        maxAge: -1,
        sameSite: "strict",
        httpOnly: true,
        path: "/",
      })
    );
    deleteCookie('acccessToken',{req,res});
    res.status(200).json("logged out");
}
export default handler;