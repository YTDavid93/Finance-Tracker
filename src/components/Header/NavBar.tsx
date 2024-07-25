import useAuth from "../../hooks/useAuth";

interface Props {
  onClick: () => void;
}

const NavBar = ({ onClick }: Props) => {
  const { user } = useAuth();

  return (
    <nav className="bg-[#2970ff] flex justify-between p-6">
      <h1 className="text-xl font-medium text-white">Financely.</h1>

      <div className="flex items-center gap-4 text-white">
        <p>User: {user?.displayName}</p>
        <button onClick={onClick}>logout</button>
      </div>
    </nav>
  );
};

export default NavBar;
