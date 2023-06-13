import clsx from "clsx";
import { ReactNode, useState } from "react";

import { Menu } from "@/components/elements";
import { Footer, Header } from "@/components/layouts";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const onMenuOpen = () => {
    setIsOpen(!isOpen);
  };

  const onMenuClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Menu
        className={clsx("top-0", "bg-white")}
        right
        isOpen={isOpen}
        burgerButtonClassName={clsx("hidden")}
        overlayClassName={clsx("top-0")}
        itemListClassName={clsx("m-4")}
        onClick={onMenuClick}
        onOpen={onMenuOpen}
        onClose={onMenuClose}
      />

      <Header onClick={onMenuClick} />

      <main className={clsx("mx-4")}>{children}</main>

      <Footer />
    </>
  );
};

Layout.displayName = "Layout";
