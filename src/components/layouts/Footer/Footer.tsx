import clsx from "clsx";
import Link from "next/link";

import { MENUS } from "@/constants/menus";

export const Footer = (): JSX.Element => {
  return (
    <footer className={clsx("text-center", "mt-40", "p-16")}>
      <div className={clsx("flex", "items-center", "justify-center")}>
        {MENUS.map((menu) => {
          return (
            <Link
              className={clsx("mx-4", "text-xl")}
              key={menu.name}
              href={menu.href}
            >
              {menu.name}
            </Link>
          );
        })}
      </div>

      <p className={clsx("mt-16")}>© t10o</p>
    </footer>
  );
};

Footer.displayName = "Footer";
