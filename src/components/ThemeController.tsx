import { useEffect, useState } from "react";
import { useTheme } from "../context/switcheTheme";
import { themes } from "../models/ThemeStyles";

const ThemeController = () => {
  const { theme, setTheme } = useTheme();
  const [closeDropDown, setCloseDropDown] = useState<boolean>(false);

  const changeTheme = (e) => {
    const newTheme = (e.currentTarget as HTMLInputElement).value;
    setTheme(newTheme);
    setCloseDropDown(true);
  };

  useEffect(() => {
    const dropdownApperance = setTimeout(() => {
      setCloseDropDown(false);
    }, 10);
    return () => clearTimeout(dropdownApperance);
  }, [closeDropDown]);

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      {!closeDropDown ? (
        <ul
          tabIndex={0}
          className="dropdown-content bg-base-300 rounded-box z-1 w-fit p-2 shadow-2xl"
        >
          {themes.map((item) => (
            <li key={item}>
              <input
                type="radio"
                name="theme-dropdown"
                aria-label={item}
                value={item}
                checked={theme === item}
                onChange={changeTheme}
                className={`theme-controller btn btn-sm btn-block btn-ghost justify-start ${
                  theme === item
                    ? "text-primary-content/50 pointer-events-none"
                    : "text-primary-content"
                }`}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default ThemeController;
