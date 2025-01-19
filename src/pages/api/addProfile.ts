import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, data } = req.body;

    const { error } = await supabase
      .from("profileData")
      .insert([{ user: username, data }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "Profile added successfully!" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
