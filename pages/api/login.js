export default async (req, res) => {
  if (req.method === "POST") {
    // Set the cookie options
    const options = {
      maxAge: 604800, // 7 days in seconds
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    };

    const { identifier, password } = req.body;

    const strapiRes = await fetch(`https://kingdomofkush-backend.onrender.com/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await strapiRes.json();
    if (strapiRes.ok) {
      res.status(200).json(data);

      // Set the cookie header
      // res.setHeader(
      //   "Set-Cookie",
      //   `myCookie=lkksajfdlsjdf; ${serializeCookie(options)}`
      // );
    } else {
      res.send(data);
    }
  }
};
