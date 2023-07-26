import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import clsx from "clsx";
import getConfig from "next/config";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Props, slide as SlideMenu } from "react-burger-menu";

import { Button } from "@/components/elements";
import { MENUS } from "@/constants/menus";
import { Database } from "@/types/schema";

interface MenuProps extends Props {
  onClick: () => void;
  onClose: () => void;
}

export const Menu = ({ onClick, ...props }: MenuProps) => {
  const supabase = createPagesBrowserClient<Database>();

  const router = useRouter();

  const { publicRuntimeConfig } = getConfig();
  const version = publicRuntimeConfig?.version;

  const handleClick = async () => {
    await supabase.auth.signOut();

    props.onClose();
    await router.push("/");
  };

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

        <li className={clsx("my-8")}>
          <Button
            className={clsx("text-2xl", "pl-0")}
            label="SignOut"
            onClick={handleClick}
          />
        </li>
      </ul>

      <div className={clsx("absolute", "bottom-0", "right-0", "mb-4", "mr-4")}>
        version {version}
      </div>
    </SlideMenu>
  );
};

Menu.displayName = "Menu";
