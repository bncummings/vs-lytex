# Lytex Preview: LaTeX + LilyPond Rendering

Render **LaTeX documents with embedded LilyPond** snippets directly to **PDF**, all from within VS Code.  

## Prerequisites
- 

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

  ![Demo of Lytex rendering](images/example.gif)
  
- **Lytex Preview Session** — Recompile automatically on save.

  ![Demo of Lytex rendering](images/example.gif)
