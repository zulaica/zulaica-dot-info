# Zulaica Dot Info

An experiment using native, modern browser
<abbr title="Application Programming Interface">API</abbr>s to build an
<abbr title="Single Page Application">SPA</abbr> without a framework, polyfills
or tooling<sup id='anchor1'>[[1]](#footnote1)</sup>.

> Why didn't you _just_ use **THING-THAT-SOLVES-THIS-PROBLEM** to do this?

Because I didn't want to. 🙂

This is primarily a learning experience for myself. It's also an opportunity to
assess the current state of <abbr title="HyperText Markup Language">HTML</abbr>,
JavaScript, and <abbr title="Cascading Style Sheets">CSS</abbr> APIs.

> What's making this all possible?

- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)
- [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Dynamic Module Imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [`prefers-color-scheme` media query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

> Aren't you concerned about **LEGACY-BROWSER**?

Nope.

> This looks not-very-good on mobile.

[Yup](https://github.com/zulaica/zulaica-dot-info/issues/3).

---

<sup id='footnote1'>[1]</sup> The CSS files that are served are processed with
[Autoprefixer](https://github.com/postcss/autoprefixer) and minified.
[↩️](#anchor1)
