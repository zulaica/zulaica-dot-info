const themeLabel = document.querySelector("[for='theme']");
const themeToggle = document.getElementById("theme");

const preferences = new Proxy(
  { isDark: null },
  {
    set: function (target, _property, newValue) {
      if (newValue) {
        themeLabel.title = "Enable light theme";
        themeLabel.innerHTML = "🌝";
      } else {
        themeLabel.title = "Enable dark theme";
        themeLabel.innerHTML = "🌚";
      }

      if (target.isDark === null) {
        themeToggle.checked = newValue;
      }

      const theme = newValue ? "dark" : "light";
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);

      return true;
    }
  }
);

const initTheme = () => {
  if (!localStorage.getItem("theme")) {
    preferences.isDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
  } else {
    preferences.isDark = localStorage.getItem("theme") === "dark";
  }

  themeToggle.addEventListener("change", _handleChange, { passive: true });
};

const _handleChange = ({ target: { checked } }) => {
  preferences.isDark = checked;
};

export default initTheme;
