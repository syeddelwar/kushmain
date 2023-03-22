import { API_URL, API_TOKEN } from "@/config/index";

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      
      const { username, email, password } = JSON.parse(req.body);

      const strapiRes = await fetch(
        `https://kingdomofkush-backend.onrender.com/api/auth/local/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 82227ab7fd890d681d54a70f3c7e2468a99720b7587573af4d1a3e461715804746af891037c9cd18e0d6d37bd4d730681c23ca9d71ed326ebc09e04b5cb9ef2327d1a2a87c35f7155542214da6a00686e91fae5b5169630dfa21970f263805b06f409a34c440c3f04cd6a86dda9a697cc588157a945048f33f5eae6e09bb4e09`,
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        }
      );
      const data = await strapiRes.json();
      res.send(data);
    }
  } catch (error) {
    res.send(error);
  }
};
