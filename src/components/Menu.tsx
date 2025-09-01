import React, { useState } from "react";

const Menu: React.FC = () => {
  const [activeItem, setActiveItem] = useState("About me");

  const menuItems = [
    { label: "About me", id: "home" },
    { label: "Experience", id: "experience" },
    { label: "Studies", id: "studies" },
    { label: "Resume", id: "resume" },
  ];

  const handleClick = (id: string, label: string) => {
    setActiveItem(label);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="md:w-1/3 md:pl-12">
      <h2 className="text-xl font-semibold mb-6">Menu</h2>
      <ul className="space-y-4 text-gray-300">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleClick(item.id, item.label)}
            className={`pl-4 cursor-pointer transition 
              ${
                activeItem === item.label
                  ? "border-l-2 border-yellow-400 text-yellow-400"
                  : "border-l-2 border-transparent hover:border-yellow-400 hover:text-yellow-400"
              }`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
