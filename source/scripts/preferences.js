const PALETTE_MAP = Object.freeze({
  rgb: "cmy",
  cmy: "autumn",
  autumn: "spring",
  spring: "rgb"
});

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
        : _handlePalette(newValue);

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
    preferencesProxy.palette = "rgb";
  } else {
    preferencesProxy.palette = localStorage.getItem("palette");
  }

  modeLabel.style.display = "inline-grid";
  paletteLabel.style.display = "inline-grid";
  modeToggle.addEventListener("change", _toggleMode, { passive: true });
  paletteToggle.addEventListener("click", _togglePalette, { passive: true });
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

function _handlePalette(newValue) {
  paletteLabel.title = `Enable ${PALETTE_MAP[newValue]} palette`;
  localStorage.setItem("palette", newValue);
  document.documentElement.setAttribute("data-palette", newValue);
}

function _toggleMode({ target: { checked } }) {
  preferencesProxy.isDark = checked;
}

function _togglePalette() {
  preferencesProxy.palette = PALETTE_MAP[localStorage.getItem("palette")];
}
