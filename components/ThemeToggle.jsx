"use client";

import { useState } from "react";
import { BsSun, BsMoonFill } from "react-icons/bs";

const themes = {
  winter: "winter",
  dracula: "dracula",
};
const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.winter);

  const toglleTheme = () => {
    const newTheme = theme === themes.winter ? themes.dracula : themes.winter;
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };
  return (
    <button className="btn btn-sm btn-outline" onClick={toglleTheme}>
      {theme === "winter" ? <BsMoonFill className="h-4 w-4" /> : <BsSun className="h-4 w-4" />}
    </button>
  );
};

export default ThemeToggle;
