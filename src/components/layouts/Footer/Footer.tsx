import clsx from "clsx";

export const Footer = (): JSX.Element => {
  return (
    <footer className={clsx("text-center", "p-16", "mt-16")}>
      <p>© t10o</p>
    </footer>
  );
};

Footer.displayName = "Footer";
