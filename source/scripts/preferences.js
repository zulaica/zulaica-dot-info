const modeLabel = document.querySelector("[for='mode']");
const modeToggle = document.getElementById("mode");
const paletteLabel = document.querySelector("[for='palette']");
const paletteToggle = document.getElementById("palette");
const preferencesProxy = new Proxy(
  { isDark: null, palette: null },
  {
    set: function (target, property, newValue) {
      property === "isDark"
        ? _handleMode(target, newValue)
        : _handlePalette(target, newValue);

      return true;
    }
  }
);

const Preferences = Object.freeze({ init });
export default Preferences;

/*******************************************************************************
 * Methods
 ******************************************************************************/
function init() {
  if (!localStorage.getItem("mode")) {
    preferencesProxy.isDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
  } else {
    preferencesProxy.isDark = localStorage.getItem("mode") === "dark";
  }

  if (!localStorage.getItem("palette")) {
    preferencesProxy.palette = false;
  } else {
    preferencesProxy.palette = localStorage.getItem("palette") === "autumn";
  }

  modeLabel.style.display = "grid";
  paletteLabel.style.display = "grid";
  modeToggle.addEventListener("change", _toggleMode, { passive: true });
  paletteToggle.addEventListener("change", _togglePalette, { passive: true });
}

/*******************************************************************************
 * Helpers
 ******************************************************************************/
function _handleMode(target, newValue) {
  const mode = newValue ? "dark" : "light";

  if (target.isDark === null) {
    modeToggle.checked = newValue;
  }

  modeLabel.title = newValue ? "Enable light mode" : "Enable dark mode";
  localStorage.setItem("mode", mode);
  document.documentElement.setAttribute("data-mode", mode);
}

function _handlePalette(target, newValue) {
  const palette = newValue ? "autumn" : "default";

  if (target.palette === null) {
    paletteToggle.checked = newValue;
  }

  paletteLabel.title = newValue
    ? "Enable default palette"
    : "Enable autumn palette";
  localStorage.setItem("palette", palette);
  document.documentElement.setAttribute("data-palette", palette);
}

function _toggleMode({ target: { checked } }) {
  preferencesProxy.isDark = checked;
}

function _togglePalette({ target: { checked } }) {
  preferencesProxy.palette = checked;
}
