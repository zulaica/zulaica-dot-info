import { EMOJI } from "./helpers/constants";
const body = document.documentElement;

const modeLabel = document.querySelector("[for='mode']");
const modeToggle = document.getElementById("mode");
const modeOptions = {
  label: modeLabel,
  toggle: modeToggle,
  preference: "mode",
  values: ["light", "dark"],
  titles: ["Enable dark mode", "Enable light mode"],
  textContent: [EMOJI.newMoon, EMOJI.fullMoon]
};

modeLabel.style.display = "inline-flex";

const Preferences = Object.freeze({ init });

export default Preferences;

/*******************************************************************************
 * Methods
 ******************************************************************************/
function init() {
  const modeSetting = localStorage.getItem("mode");

  const isDark = modeSetting
    ? modeSetting === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;

  _handlePreference(isDark, modeOptions);

  modeToggle.addEventListener("change", _handleMode, { passive: true });
}

/*******************************************************************************
 * Helpers
 ******************************************************************************/
function _handleMode({ target: { checked } }) {
  _handlePreference(checked, modeOptions);
}

function _handlePreference(
  checked,
  { label, toggle, preference, values, titles, textContent }
) {
  label.title = titles[Number(checked)];
  label.textContent = textContent[Number(checked)];
  toggle.checked = checked;
  localStorage.setItem(preference, values[Number(checked)]);
  body.setAttribute(`data-${preference}`, values[Number(checked)]);
}
