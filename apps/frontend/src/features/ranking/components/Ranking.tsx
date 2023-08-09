import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { Button } from "@/components/elements";
import { RankingContainer } from "@/features/ranking/components/RankingContainer";
import { useRanking } from "@/features/ranking/hooks/use-ranking";

export const Ranking = () => {
  const { monthlyTopFiveUsers, yearlyTopFiveUsers, targetDate, setTargetDate } =
    useRanking();

  const handlePrevClick = () => {
    setTargetDate(
      new Date(targetDate.getFullYear(), targetDate.getMonth() - 1),
    );
  };

  const handleNextClick = () => {
    setTargetDate(
      new Date(targetDate.getFullYear(), targetDate.getMonth() + 1),
    );
  };

  return (
    <div className={clsx("max-w-[280px]", "mx-auto")}>
      <p
        className={clsx(
          "flex",
          "justify-center",
          "items-center",
          "mb-4",
          "text-xl",
        )}
      >
        <Button onClick={handlePrevClick}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Button>

        {`${targetDate.getMonth() + 1}月のランキング`}

        <Button onClick={handleNextClick}>
          <FontAwesomeIcon icon={faAngleRight} />
        </Button>
      </p>

      <RankingContainer data={monthlyTopFiveUsers} />

      <p
        className={clsx(
          "flex",
          "justify-center",
          "items-center",
          "mb-4",
          "text-xl",
        )}
      >
        今年のランキング
      </p>

      <RankingContainer data={yearlyTopFiveUsers} />
    </div>
  );
};

Ranking.displayName = "Ranking";
