import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { Props, slide as SlideMenu } from "react-burger-menu";

import { MENUS } from "@/constants/menus";

interface MenuProps extends Props {
  onClick: () => void;
  onClose: () => void;
}

export const Menu = ({ onClick, ...props }: MenuProps) => {
  return (
    <SlideMenu {...props}>
      <div className={clsx("!flex", "justify-end", "items-center")}>
        <button>
          <FontAwesomeIcon className={clsx("text-2xl")} icon={faXmark} />
        </button>
      </div>

      <ul>
        {MENUS.map((menu) => {
          return (
            <li className={clsx("my-8")} key={menu.name}>
              <Link
                className={clsx("text-2xl")}
                href={menu.href}
                onClick={onClick}
              >
                {menu.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </SlideMenu>
  );
};

Menu.displayName = "Menu";
