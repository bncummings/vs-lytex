# LyTeX Language Support

Language support for **LyTeX** — LaTeX with embeded LilyPond — providing syntax highlighting for documents that combine musical notation and typeset text.

## Features

- **Syntax Highlighting** for LyTeX files (`.lytex`):
  - Recognizes LaTeX commands and environments.
  - Highlights embedded `lilypond` blocks (see: [lilypond-book documentation](https://lilypond.org/doc/v2.23/Documentation/usage/latex)).

> Planned Features:
> - Error highlighting for LaTeX and LilyPond code.
> - IntelliSense and autocompletion for commands and environments.

---

## Example Lytex Snippet

```latex
\documentclass{article}
\usepackage{lilypond}

\begin{document}
    Here’s a simple melody:

    \begin{lilypond}
        \relative c' { c d e f g a b c }
    \end{lilypond}

\end{document}
```