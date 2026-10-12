const params = new URLSearchParams(location.search);
const theme = params.get('theme') === 'light' ? 'light' : 'dark';
document.body.classList.toggle('theme-dark', theme === 'dark');
const themeLink = document.querySelector('[data-theme-link]');
themeLink.href = `${location.pathname.split('/').pop()}?theme=${theme === 'dark' ? 'light' : 'dark'}`;
themeLink.textContent = theme === 'dark' ? 'Light theme' : 'Dark theme';
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = form.elements.namedItem('workspace');
  const name = input.value.trim();
  if (!name) {
    input.setCustomValidity('Enter a workspace name.');
    input.reportValidity();
    return;
  }
  document.querySelector('[data-workspace-name]').textContent = name;
  document.querySelector('[role="status"]').textContent = `Saved “${name}” for this preview. Reload resets it.`;
});
form.elements.namedItem('workspace').addEventListener('input', (event) => event.target.setCustomValidity(''));
