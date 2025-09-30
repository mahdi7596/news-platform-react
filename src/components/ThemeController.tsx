import { useTheme } from "../context/switcheTheme";
import { themes } from "../models/ThemeStyles";

const ThemeController = () => {
  const { theme, setTheme } = useTheme();
  const changeTheme = (e) => {
    setTheme(e.target.value);
  };

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
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300 rounded-box z-1 w-fit p-2 shadow-2xl"
      >
        {themes.map((item, index) => (
          <li key={index}>
            <input
              type="radio"
              name="theme-dropdown"
              aria-label={item}
              value={item}
              onChange={changeTheme}
              className={`theme-controller btn btn-sm btn-block btn-ghost justify-start ${
                theme === item
                  ? "text-gray-500 pointer-events-none"
                  : "text-orange-500"
              }`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeController;
