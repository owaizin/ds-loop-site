// A URL-scoped experiment: no persistent preference or default brand change.
if (new URLSearchParams(location.search).get('theme') === 'ember') {
  document.body.classList.add('ember-theme');
}
