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


# Lytex Preview: LaTeX + LilyPond Rendering

Render **LaTeX documents with embedded LilyPond** snippets directly to **PDF**, all from within VS Code.  

## Prerequisites
NOTE: This extension is currently MacOS exclusive.
LyTeX Compilation depends requires the following tools to be installed:
- [lilypond](https://lilypond.org/download.html) - includes `lilypond-book` which can embed lilypond in LaTeX.
- [latexit](https://www.chachatelier.fr/latexit/latexit-downloads.php) - For rendering latex.

```bash
  brew install lilypond
  brew install --cask latexit
```

## How to use
- **Render LaTeX with LilyPond** - Embed LilyPond in a LaTeX and save the file with a `.lytex` extension.
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

  See [lilypond-book documentation](https://lilypond.org/doc/v2.23/Documentation/usage/latex) for more information.
  
- **Compile Straight To PDF** — Compile `.lytex` files containing `lilypond` environments directly to PDF.

  <img src="./snippets/compile-example.gif" alt="LyTeX compile demo">
  
- **Lytex Preview Session** — Recompile automatically on save.
<img src="./snippets/example.gif" alt="LyTeX preview demo">
