import { API_URL } from "@/config/index";
const { parseCookies } = require("nookies");

export default async (req, res) => {
  if (req.method === "GET") {
    const { token } = parseCookies({ req });

    if (!token) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    const strapiRes = await fetch(`https://kingdomofkush-backend.onrender.com/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ user });
    } else {
      res.status(401).json({ message: "User Forbidden!" });
    }
  } else {
    res.send(req.method, "this method is not allowd!");
  }
};
