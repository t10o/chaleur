import clsx from "clsx";

import { RankingContainer } from "@/features/ranking/components/RankingContainer";
import { useRanking } from "@/features/ranking/hooks/use-ranking";

export const Ranking = () => {
  const { monthlyTopFiveUsers, yearlyTopFiveUsers } = useRanking();

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
        今月のランキング
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
