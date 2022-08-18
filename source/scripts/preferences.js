import isExpanded from './helpers/isExpanded.js';

const setInitialTheme = () => {
  const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  themeQuery.matches
    ? localStorage.setItem('theme', 'dark')
    : localStorage.setItem('theme', 'light');
};

const toggleTheme = (event) => {
  const theme = event.target.checked ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
};

const applyUserPreferences = () => {
  if (!localStorage.getItem('theme')) {
    setInitialTheme();
  }

  const theme = localStorage.getItem('theme');
  const menuToggle = document.getElementById('menu-toggle');
  const themeCheckbox = document.getElementById('theme');

  document.documentElement.setAttribute('data-theme', theme);
  themeCheckbox.checked = theme === 'dark' ? true : false;

  themeCheckbox.addEventListener('change', toggleTheme);

  menuToggle.addEventListener('click', () => {
    isExpanded(menuToggle)
      ? menuToggle.setAttribute('aria-expanded', false)
      : menuToggle.setAttribute('aria-expanded', true);
  });
};

export default applyUserPreferences;
