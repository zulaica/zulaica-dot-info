import isExpanded from './helpers/isExpanded.js';

const setInitialTheme = () => {
  const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  themeQuery.matches
    ? localStorage.setItem('theme', 'dark')
    : localStorage.setItem('theme', 'light');
};

const toggleBackground = (event) => {
  const background = event.target.checked ? 'enabled' : 'disabled';
  localStorage.setItem('background', background);
  document.documentElement.setAttribute('data-background', background);
};

const toggleTheme = (event) => {
  const theme = event.target.checked ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
};

const renderMenu = () => {
  const header = document.querySelector('header .container');
  const menuWrapper = document.createElement('div');
  menuWrapper.className = 'menu-wrapper';
  menuWrapper.setAttribute('aria-hidden', true);
  menuWrapper.innerHTML = `
    <button aria-controls="menu" aria-expanded="false" aria-haspopup="menu" aria-pressed="false" id="menu-toggle">Preferences</button>
    <ul id="menu" role="menu" aria-labelledby="menu-toggle" tabindex="-1">
      <li id="theme-item" role="presentation">
        <label for="theme">Dark Theme</label>
        <input id="theme" type="checkbox" role="menuitem" />
      </li>
      <li id="background-item" role="presentation">
        <label for="background">Background Image</label>
        <input id="background" type="checkbox" role="menuitem" />
      </li>
    </ul>
  `;
  header.append(menuWrapper);
};

const applyPreferences = () => {
  renderMenu();

  if (!localStorage.getItem('theme')) {
    setInitialTheme();
  }

  if (!localStorage.getItem('background')) {
    localStorage.setItem('background', 'enabled');
  }

  const theme = localStorage.getItem('theme');
  const background = localStorage.getItem('background');
  const menuToggle = document.getElementById('menu-toggle');
  const themeCheckbox = document.getElementById('theme');
  const backgroundCheckbox = document.getElementById('background');

  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('data-background', background);
  themeCheckbox.checked = theme === 'dark' ? true : false;
  backgroundCheckbox.checked = background === 'enabled' ? true : false;

  themeCheckbox.addEventListener('change', toggleTheme);
  backgroundCheckbox.addEventListener('change', toggleBackground);

  menuToggle.addEventListener('click', () => {
    isExpanded(menuToggle)
      ? menuToggle.setAttribute('aria-expanded', false)
      : menuToggle.setAttribute('aria-expanded', true);
  });
};

export default applyPreferences;
