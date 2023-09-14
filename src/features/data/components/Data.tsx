import { faCalendarDays, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/elements";

export const Data = () => {
  const router = useRouter();

  const handleCalendarClick = async () => {
    await router.push("/data/calendar");
  };

  const handleGraphClick = async () => {
    await router.push("/data/graph");
  };

  return (
    <div className={clsx("flex", "flex-col", "gap-4")}>
      <Button
        className={clsx(
          "flex",
          "items-center",
          "border-2",
          "rounded-md",
          "p-4",
        )}
        onClick={handleCalendarClick}
      >
        <div className={clsx("flex", "p-4", "rounded-lg", "col-span-1")}>
          <FontAwesomeIcon className={clsx("text-2xl")} icon={faCalendarDays} />
        </div>

        <div>Calendar</div>
      </Button>

      <Button
        className={clsx(
          "flex",
          "items-center",
          "border-2",
          "rounded-md",
          "p-4",
        )}
        onClick={handleGraphClick}
      >
        <div className={clsx("flex", "p-4", "rounded-lg", "col-span-1")}>
          <FontAwesomeIcon className={clsx("text-2xl")} icon={faChartLine} />
        </div>

        <div>Graph</div>
      </Button>
    </div>
  );
};

Data.displayName = "Data";
