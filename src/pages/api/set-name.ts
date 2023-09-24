// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const NAMESTONE_KEY = process.env.NAMESTONE;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const externalApiResponse = await fetch(
        "https://namestone.xyz/api/public_v1/set-name",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "ethglobal",
          },
          body: JSON.stringify(req.body),
        }
      );

      const externalApiData = await externalApiResponse.json();

      // Respond with data received from the external API
      res.status(externalApiResponse.status).json(externalApiData);
    } catch (error) {
      res.status(500).json({ name: "Internal Server Error" });
    }
  } else {
    // Handle other HTTP methods or return an error
    res.status(405).json({ name: "Method Not Allowed" });
  }
}
