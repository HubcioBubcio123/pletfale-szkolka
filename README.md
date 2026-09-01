# pletfale-szkolka

Strona trenera personalnego i fizjoterapeuty — 4 podstrony: landing "O mnie" (hub) + Płetfale (nauka pływania), Fizjoterapia, Przygotowanie motoryczne (Motoryka). Zwykły HTML/CSS/JS, bez frameworków i bez kroku budowania — otwierasz plik `.html` bezpośrednio w przeglądarce.

## Struktura projektu

```
index.html            — strona główna "O mnie"
pletfale.html          — Płetfale (nauka pływania)
fizjoterapia.html      — Fizjoterapia
motoryka.html          — Przygotowanie motoryczne

scss/
  o-mnie/               — SCSS + skompilowany styles.css dla index.html
  pletfale/             — SCSS + skompilowany styles.css dla pletfale.html
  fizjoterapia/         — SCSS + skompilowany styles.css dla fizjoterapia.html
  motoryka/             — SCSS + skompilowany styles.css dla motoryka.html

js/
  main.js               — jeden wspólny skrypt (fade-in przy scrollu + licznik statystyk na Motoryce)

img/
  o-mnie/, pletfale/, fizjoterapia/, motoryka/, shared/  — zdjęcia dla każdej podstrony osobno
```

Każda podstrona ma **własny, niezależny folder SCSS** — edycja jednej strony (np. `scss/pletfale/`) nigdy nie wpływa na pozostałe. W środku każdego folderu jeden plik na sekcję (`_header.scss`, `_hero.scss`, `_cards.scss`, `_opinie.scss`, `_kontakt.scss`, `_footer.scss`, ...), plus `_variables.scss` z kolorami i typografią tej strony oraz plik wejściowy `styles.scss`, który je łączy i kompiluje się do `styles.css` w tym samym folderze.

## Jak edytować style

Najprościej: rozszerzenie **Live Sass Compiler** w VS Code.

1. Zainstaluj rozszerzenie "Live Sass Compiler" (autor: Glenn Marks / ritwickdey) z marketplace VS Code.
2. Kliknij **"Watch Sass"** w prawym dolnym rogu okna VS Code.
3. Od tego momentu każdy zapis dowolnego pliku `.scss` w dowolnym z 4 folderów automatycznie przelicza się do `styles.css` w tym samym folderze — domyślne ustawienia rozszerzenia już to robią, jedno kliknięcie obsługuje wszystkie 4 podstrony naraz.
4. Pliki zaczynające się od `_` (np. `_hero.scss`) to partiale — same w sobie się nie kompilują, tylko są dociągane przez `styles.scss`.
5. Domyślnie rozszerzenie tworzy też plik `styles.css.map` obok każdego `styles.css` (mapa do debugowania w devtoolsach). Jeśli nie chcesz tych plików, wyłącz je: w VS Code otwórz ustawienia (`Ctrl+,`), wyszukaj `liveSassCompile.settings.generateMap` i odznacz.

Bez rozszerzenia da się też skompilować ręcznie z terminala, jeśli masz zainstalowany Node.js i pakiet `sass`:

```bash
sass scss/pletfale/styles.scss scss/pletfale/styles.css
```

(powtórz dla każdego z 4 folderów, albo dodaj `--watch` żeby przeliczało na bieżąco).

Skompilowane pliki `styles.css` są zacommitowane do repo, więc strona działa od razu nawet bez kompilatora — trzeba go uruchomić dopiero wtedy, gdy zmienisz coś w `.scss`.

## Podmiana treści

Cały tekst oznaczony `[w nawiasach kwadratowych]` to placeholder z projektu — podmień na prawdziwe dane (imię i nazwisko, opisy, ceny, dane kontaktowe, opinie klientów). Zdjęcie trenera na stronie głównej: wstaw plik do `img/o-mnie/` i podmień `<span class="hero__photo-label">` w `index.html` na `<img src="img/o-mnie/twoje-zdjecie.jpg" alt="...">` (przykład jest zakomentowany tuż obok w kodzie).

Liczby na stronie Motoryka (lata doświadczenia, liczba zawodników, poprawa wyników) ustawiasz w `motoryka.html` w atrybutach `data-stat-value` na elementach `.stats__value`.
