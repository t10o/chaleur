import { DatesSetArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { fetchUsers } from "@/apis/users";
import { Button, Calender, Modal } from "@/components/elements";
import { CalendarDetail } from "@/features/data/components/Calendar/CalendarDetail";
import { useHome } from "@/features/home/hooks/use-home";
import { User } from "@/models/users";
import { AuthState, authState } from "@/stores/auth";
import { getThisMonth } from "@/utils/date";

// TODO: ほぼコピペ。要修正。というかもはや作り直したくなってきた。
export const Calendar = () => {
  const auth = useRecoilValue<AuthState>(authState);

  const [users, setUsers] = useState<User[]>([]);
  const [targetUserId, setTargetUser] = useState(auth.id);

  const router = useRouter();

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await fetchUsers();

      setUsers(data!);
    };

    getUsers();
  }, []);

  const {
    events,
    isOpen,
    setIsOpen,
    selectedDate,
    setSelectedDate,
    targetMonth,
    setTargetMonth,
  } = useHome(targetUserId);

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.date);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleDatasetChange = (datesSetArg: DatesSetArg) => {
    const thisMonth = getThisMonth(datesSetArg.start, datesSetArg.end);

    if (targetMonth.toDateString() === thisMonth.toDateString()) return;

    setTargetMonth(thisMonth);
  };

  const handleBackClick = async () => {
    await router.push("/data");
  };

  return (
    <>
      {users && (
        <div className={clsx("flex", "justify-center", "items-center", "mb-4")}>
          <Select
            value={String(targetUserId)}
            onChange={(event: SelectChangeEvent) => {
              setTargetUser(Number(event.target.value));
            }}
          >
            {users.map((user) => {
              if (user.id === 5) return;
              return (
                <MenuItem key={user.id} value={user.id}>
                  {user.nickname}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      )}

      <Calender
        events={events}
        onDateClick={handleDateClick}
        onDatasetChange={handleDatasetChange}
      />

      <Modal
        isOpen={isOpen}
        onRequestClose={handleModalClose}
        style={{
          content: {
            left: 0,
            bottom: 0,
            width: "100%",
            borderRadius: "20px 20px 0 0",
          },
        }}
      >
        <CalendarDetail
          date={selectedDate}
          userId={targetUserId}
          onCloseClick={handleModalClose}
        />
      </Modal>

      <Button className={clsx("!pl-0", "mt-4")} onClick={handleBackClick}>
        ＜ 戻る
      </Button>
    </>
  );
};

Calendar.displayName = "Calendar";
