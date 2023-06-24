import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextApiHandler } from "next";

import { Database } from "@/types/schema";

const callback: NextApiHandler = async (req, res) => {
  const supabase = createPagesServerClient<Database>({ req, res });

  const code = req.query.code;

  if (typeof code === "string") {
    await supabase.auth.exchangeCodeForSession(code);
  }

  res.redirect("/");
};

export default callback;
