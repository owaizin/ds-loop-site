// After-only presentation for the one-canvas study; shared example data stays unchanged.
const paths={
 check:'<path d="m4 8 3 3 5-6"/>',
 chevron:'<path d="m4 6 4 4 4-4"/>',
 arrow:'<path d="M3 8h10m-4-4 4 4-4 4"/>',
 trend:'<path d="m3 11 4-4 3 3 3-6m-4 0h4v4"/>',
 board:'<rect x="2" y="3" width="12" height="10" rx="2"/><path d="M6 3v10m4-10v10"/>',
 send:'<path d="m3 3 11 5-11 5 2-5-2-5Zm2 5h9"/>',
 sparkle:'<path d="m8 2 1.5 4.5L14 8l-4.5 1.5L8 14 6.5 9.5 2 8l4.5-1.5L8 2Z"/>',
 half:'<circle cx="8" cy="8" r="6"/><path d="M2 8a6 6 0 0 0 12 0Z" fill="currentColor" stroke="none"/>',
};
const icon=name=>`<svg class="spec-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
export function polishSceneAfter(html){
 for(const [glyph,name]of Object.entries({'✓':'check','⌄':'chevron','→':'arrow','↗':'trend','▦':'board','↵':'send','✳':'sparkle','◒':'half'}))html=html.replaceAll(glyph,icon(name));
 return html;
}
