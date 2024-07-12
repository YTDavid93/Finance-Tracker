import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const NavBar = ({ children }: Props) => {
  return <nav className="bg-[#2970ff] flex justify-center">{children}</nav>;
};

export default NavBar;
