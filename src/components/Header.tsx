import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import type { IconType } from "react-icons";
import HeaderButton from "./buttons/HeaderButton";

interface ButtonData {
  icon: IconType;
  label: string;
  onClick: () => void;
}

const Header: React.FC = () => {
  const name: string = "Achilleas Ntalagiorgos";

  const buttons: ButtonData[] = [
    {
      icon: FaEnvelope,
      label: "Email",
      onClick: () =>
        (window.location.href = "mailto:achilleasntalagiorgos@gmail.com"),
    },
    {
      icon: FaGithub,
      label: "GitHub",
      onClick: () => window.open("https://github.com", "_blank"),
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      onClick: () => window.open("https://linkedin.com", "_blank"),
    },
  ];

  return (
    <header className="top-0 left-0 flex justify-between items-center p-2 border-b border-gray-900">
      <div className="text-2xl font-bold ml-4">{name}</div>
      <div className="flex justify-evenly max-w-xs mr-4">
        {buttons.map(({ icon, label, onClick }, index) => (
          <HeaderButton
            key={index}
            icon={icon}
            label={label}
            onClick={onClick}
          />
        ))}
      </div>
    </header>
  );
};

export default Header;
