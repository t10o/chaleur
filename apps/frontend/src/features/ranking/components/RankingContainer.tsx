import clsx from "clsx";

import { RankingItem } from "@/features/ranking/components/RankingItem";
import { Ranking } from "@/features/ranking/hooks/use-ranking";

interface Props {
  data: Ranking[] | null;
}

export const RankingContainer = ({ data }: Props) => {
  return (
    <div className={clsx("mb-12")}>
      {data ? (
        data.map((user, index) => {
          return <RankingItem key={user.userId} data={user} rank={index + 1} />;
        })
      ) : (
        <div>データがありません</div>
      )}
    </div>
  );
};

RankingContainer.displayName = "RankingContainer";
