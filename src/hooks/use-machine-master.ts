import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseClient";
import { MachineResponse } from "@/models/machine";

export const useMachineMaster = () => {
  const [machineMaster, setMachineMaster] = useState<MachineResponse[] | null>(
    null
  );
  const [machineNames, setMachineNames] = useState<string[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const getMachineMaster = async () => {
      const { data, error } = await supabase.from("machine").select();

      const machineName = data && !error ? data.map((data) => data.name) : null;

      setMachineMaster(data);
      setMachineNames(machineName);
      setError(error);
    };

    getMachineMaster();
  }, []);

  const insertMachineMaster = async (machineName: string, kind: string) => {
    const isPachinko = (kind: string) => {
      return kind === "pachinko";
    };

    // TODO: オートインクリメントしてもらえないのまじ？？
    const id = machineNames!.length + 1;

    const { data, error } = await supabase
      .from("machine")
      .insert({ id, name: machineName, is_pachinko: isPachinko(kind) })
      .select();

    setMachineMaster(data);

    return error;
  };

  return {
    machineMaster,
    machineNames,
    error,
    insertMachineMaster,
  };
};
