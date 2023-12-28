// pages/api/setToken.js
export default function handler(req, res) {
    // Set options for the cookie
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // secure cookie in production
      sameSite: "strict",
      path: "/",
    };
  
    // Get the token and role from request body
    const { token, role } = req.body;
  
    // Set the cookies
    res.setHeader("Set-Cookie", [
      `token=${token}; ${options}`,
      `role=${role}; ${options}`,
    ]);
  
    res.status(200).json({ message: "Cookie set" });
  }