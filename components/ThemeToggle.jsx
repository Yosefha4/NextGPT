"use client";

import { useState } from "react";
import { BsSun, BsMoonFill } from "react-icons/bs";

const themes = {
  dark: "dark",
  cupcake: "cupcake",
};
const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.cupcake);

  const toglleTheme = () => {
    const newTheme = theme === themes.cupcake ? themes.dark : themes.cupcake;
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };
  return (
    <button className="btn btn-sm btn-outline" onClick={toglleTheme}>
      {theme === "cupcake" ? <BsSun className="h-4 w-4 " /> : <BsMoonFill className="h-4 w-4" />}
    </button>
  );
};

export default ThemeToggle;
