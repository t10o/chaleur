import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler } from "next";

import { Database } from "@/types/schema";

const ProtectedRoute: NextApiHandler = async (req, res) => {
  const supabase = createPagesServerClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return res.status(401).json({
      error: "not_authenticated",
      description:
        "The user does not have an active session or is not authenticated",
    });

  // Run queries with RLS on the server
  const { data } = await supabase.from("users").select("*");

  res.json(data);
};

export default ProtectedRoute;
