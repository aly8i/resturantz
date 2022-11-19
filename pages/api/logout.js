import cookie from "cookie";
const handler = async(req, res) => {
    await res.setHeader("Set-Cookie",cookie.serialize("accessToken", "", {
        maxAge: -1,
        sameSite: "strict",
        httpOnly: true,
        path: "/",
      })
    );
    res.status(200).json("logged out");
}
export default handler;