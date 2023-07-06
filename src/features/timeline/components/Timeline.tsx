import { TimelineOppositeContent } from "@mui/lab";
import MuiTimeline from "@mui/lab/Timeline";
import MuiTimelineConnector from "@mui/lab/TimelineConnector";
import MuiTimelineDot from "@mui/lab/TimelineDot";
import MuiTimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import MuiTimelineSeparator from "@mui/lab/TimelineSeparator";
import clsx from "clsx";

import { PrimaryButton } from "@/components/elements";
import { TimelineItem } from "@/features/timeline/components/TimelineItem";
import { useTimeline } from "@/features/timeline/hooks/use-timeline";

export const Timeline = () => {
  const { timelineData, noMoreData, setLoad } = useTimeline();

  return (
    <>
      <MuiTimeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {timelineData &&
          Object.keys(timelineData).map((key) => {
            return (
              <MuiTimelineItem key={key}>
                <TimelineOppositeContent
                  className={clsx("max-w-[74px]", "!mr-0", "mt-6")}
                >
                  {key}
                </TimelineOppositeContent>

                <MuiTimelineSeparator>
                  <MuiTimelineDot />

                  <MuiTimelineConnector />
                </MuiTimelineSeparator>

                <div className={clsx("mt-6")}>
                  {timelineData[key].map((data: any) => {
                    return <TimelineItem key={data.id} data={data} />;
                  })}
                </div>
              </MuiTimelineItem>
            );
          })}
      </MuiTimeline>

      <PrimaryButton
        className={clsx("w-full", "mt-4")}
        label={noMoreData ? "これ以上データはありません" : "もっと見る"}
        disabled={noMoreData}
        onClick={() => setLoad(true)}
      />
    </>
  );
};

Timeline.displayName = "Timeline";
