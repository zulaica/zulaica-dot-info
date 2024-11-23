const modeLabel = document.querySelector("[for='mode']");
const modeToggle = document.getElementById("mode");

const preferences = new Proxy(
  { isDark: null },
  {
    set: function (target, _property, newValue) {
      if (newValue) {
        modeLabel.title = "Enable light mode";
        modeLabel.innerHTML = "🌝";
      } else {
        modeLabel.title = "Enable dark mode";
        modeLabel.innerHTML = "🌚";
      }

      if (target.isDark === null) {
        modeToggle.checked = newValue;
      }

      const mode = newValue ? "dark" : "light";
      localStorage.setItem("mode", mode);
      document.documentElement.setAttribute("data-mode", mode);

      return true;
    }
  }
);

const initTheme = () => {
  if (!localStorage.getItem("mode")) {
    preferences.isDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
  } else {
    preferences.isDark = localStorage.getItem("mode") === "dark";
  }

  modeToggle.addEventListener("change", _handleChange, { passive: true });
};

const _handleChange = ({ target: { checked } }) => {
  preferences.isDark = checked;
};

export default initTheme;
