#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "_site"

HEADERS = {
    "fr": ROOT / "_includes" / "fr-header.html",
    "en": ROOT / "_includes" / "en-header.html",
    "ko": ROOT / "_includes" / "ko-header.html",
    "ja": ROOT / "_includes" / "ja-header.html",
    "zh-hant": ROOT / "_includes" / "zh-hant-header.html",
    "vi": ROOT / "_includes" / "vi-header.html",
}

BODY_RE = re.compile(r"(<body\\b[^>]*>)", re.IGNORECASE)

def main() -> None:
    if not SITE.exists():
        raise SystemExit("Rendered site directory _site does not exist.")

    fixed = []
    checked = 0

    for lang, header_path in HEADERS.items():
        if not header_path.exists():
            raise SystemExit(f"Missing header include: {header_path.relative_to(ROOT)}")

        header = header_path.read_text(encoding="utf-8").strip()
        lang_root = SITE / lang
        if not lang_root.exists():
            continue

        for page in lang_root.rglob("*.html"):
            checked += 1
            html = page.read_text(encoding="utf-8")

            if 'class="site-header"' in html and 'class="nav"' in html:
                continue

            if not BODY_RE.search(html):
                raise SystemExit(f"Cannot inject navigation: no <body> tag in {page.relative_to(SITE)}")

            html = BODY_RE.sub(lambda m: m.group(1) + "\n" + header + "\n", html, count=1)
            page.write_text(html, encoding="utf-8")
            fixed.append(str(page.relative_to(SITE)))

    print(f"Checked {checked} localized HTML pages.")
    if fixed:
        print("Injected global navigation into:")
        for page in fixed:
            print(f"  - {page}")
    else:
        print("Global navigation already present on every localized page.")

if __name__ == "__main__":
    main()
