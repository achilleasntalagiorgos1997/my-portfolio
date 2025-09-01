import type { IconType } from "react-icons";

interface HeaderButtonProps {
  icon: IconType;
  label: string;
  onClick: () => void;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  icon: Icon,
  label,
  onClick,
}) => {
  return (
    <button
      className="w-12 h-12 flex justify-center items-center hover:bg-gray-700 hover:text-gray-100 rounded-lg transition mx-2"
      aria-label={label}
      onClick={onClick}
    >
      <Icon size={20} />
    </button>
  );
};

export default HeaderButton;
