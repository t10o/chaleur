import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { fetchRaceMaster } from "@/apis/race";
import { fetchRacecourseMaster } from "@/apis/racecourse";
import { RacecourseResponse } from "@/models/racecourse";

export const useHorseraceForm = () => {
  const [raceMaster, setRaceMaster] = useState<RaceResponse[] | null>(null);
  const [racecourseMaster, setRacecourseMaster] = useState<
    RacecourseResponse[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRace = async () => {
      const { data, error } = await fetchRaceMaster();

      if (error) {
        toast.error(`レースマスタの取得に失敗しました：${error.message}}`);
      }

      setRaceMaster(data);
    };

    const fetchRacecourse = async () => {
      const { data, error } = await fetchRacecourseMaster();

      if (error) {
        toast.error(`会場マスタの取得に失敗しました：${error.message}`);
      }

      setRacecourseMaster(data);
    };

    fetchRace();
    fetchRacecourse();
  }, []);

  return {
    raceMaster,
    racecourseMaster,
    isLoading,
    setIsLoading,
  };
};
