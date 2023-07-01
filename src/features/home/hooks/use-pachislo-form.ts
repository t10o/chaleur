import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { fetchMachineMaster } from "@/apis/machine";
import { fetchShopMaster } from "@/apis/shop";
import { MachineResponse } from "@/models/machine";
import { ShopResponse } from "@/models/shop";

export const usePachisloForm = () => {
  const [machineMaster, setMachineMaster] = useState<MachineResponse[] | null>(
    null
  );
  const [machineNames, setMachineNames] = useState<string[] | null>(null);
  const [shopMaster, setShopMaster] = useState<ShopResponse[] | null>(null);
  const [shopNames, setShopNames] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchMachine = async () => {
      const { data, error } = await fetchMachineMaster();

      if (error) {
        toast.error(`台マスタの取得に失敗しました：${error.message}`);
      }

      const names = data!.map((data) => data.name);

      setMachineMaster(data);
      setMachineNames(names);
    };

    const fetchShop = async () => {
      const { data, error } = await fetchShopMaster();

      if (error) {
        toast.error(`店マスタの取得に失敗しました：${error.message}`);
      }

      const names = data!.map((data) => data.name);

      setShopMaster(data);
      setShopNames(names);
    };

    fetchMachine();
    fetchShop();
  }, []);

  return { machineMaster, machineNames, shopMaster, shopNames };
};
