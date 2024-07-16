interface Props {
  onClick: () => void;
}

const NavBar = ({ onClick }: Props) => {
  return (
    <nav className="bg-[#2970ff] flex justify-evenly">
      <h1>Financely</h1>
      <button onClick={onClick}>logout</button>
    </nav>
  );
};

export default NavBar;
