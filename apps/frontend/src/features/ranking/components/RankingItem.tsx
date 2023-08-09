import clsx from "clsx";

import { Ranking } from "@/features/ranking/hooks/use-ranking";

interface Props {
  data: Ranking;
  rank: number;
}

export const RankingItem = ({ data, rank }: Props) => {
  const getColor = (rank: number) => {
    switch (rank) {
      case 1:
        return [
          "bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))]",
          "from-yellow-300",
          "via-yellow-300",
          "to-yellow-500",
        ];

      case 2:
        return ["bg-gradient-to-r", "from-red-500", "to-red-800"];

      case 3:
        return [
          "bg-gradient-to-l",
          "from-gray-900",
          "via-purple-900",
          "to-violet-600",
        ];

      case 4:
        return ["bg-gradient-to-r", "from-green-400", "to-green-700"];

      case 5:
        return [" bg-gradient-to-r", "from-blue-400", "to-blue-700"];
    }
  };

  const isWin = (payment: number) => {
    return payment > 0;
  };

  return (
    <div className={clsx("flex", "justify-between", "items-end", "mb-4")}>
      <p
        className={clsx(
          "font-extrabold",
          "text-transparent",
          "text-3xl",
          "bg-clip-text",
          getColor(rank),
        )}
      >
        {rank}位
      </p>
      <p className={clsx("text-xl")}>{data.nickname}</p>
      <p
        className={clsx(
          isWin(data.payment) ? "text-green-500" : "text-red-500",
          "text-xl",
        )}
      >
        {data.payment}
      </p>
    </div>
  );
};
