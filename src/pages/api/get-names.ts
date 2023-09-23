import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const NAMESTONE_KEY = process.env.NAMESTONE;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      // Extract query parameters from the incoming request
      const { domain, address } = req.query;

      // Construct the URL with query parameters
      const url = new URL("https://namestone.xyz/api/public_v1/get-names");
      url.searchParams.append("domain", domain as string);

      // Send a GET request to the external API
      const externalApiResponse = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: NAMESTONE_KEY,
        },
      });

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
