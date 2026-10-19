#!/usr/bin/env python3
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXTENSIONS = {".qmd", ".md", ".html", ".js", ".json", ".yml", ".yaml"}
SKIP_DIRS = {".git", "_site", ".quarto", "node_modules"}

RULES = [
    (r"Silla unifié", "Grand Silla"),
    (r"Unified Silla", "Grand Silla"),
    (r"Silla Thống nhất", "Đại Silla"),
    (r"통일신라", "대신라"),
    (r"統一新羅", "大新羅"),
    (r"\bGoguryeo\b", "Koguryŏ"),
    (r"\bBaekje\b", "Paekche"),
    (r"\bGoryeo\b", "Koryŏ"),
    (r"\bJoseon\b", "Chosŏn"),
    (r"\bSeon\b", "Sŏn"),
    (r"\bBulguksa\b", "Pulguksa"),
    (r"\bGyeongju\b", "Kyŏngju"),
    (r"\bDabotap\b", "Tabot'ap"),
    (r"\bSeokgatap\b", "Sŏkkat'ap"),
    (r"\bSeokguram\b", "Sŏkkuram"),
    (r"\bSeongnam\b", "Sŏngnam"),
    (r"\bPyongyang\b", "P'yŏngyang"),
    (r"\bDaegu\b", "Taegu"),
    (r"\bGyeongsang\b", "Kyŏngsang"),
    (r"\bJeolla\b", "Chŏlla"),
    (r"\bChungcheong\b", "Ch'ungch'ŏng"),
    (r"\bGyeonggi\b", "Kyŏnggi"),
    (r"\bGangwon\b", "Kangwŏn"),
    (r"\bBusan\b", "Pusan"),
    (r"\bDaejeon\b", "Taejŏn"),
    (r"\bGwangju\b", "Kwangju"),
    (r"\bIncheon\b", "Inch'ŏn"),
    (r"\bPyeongchang\b", "P'yŏngch'ang"),
    (r"\bBuyeo\b", "Puyŏ"),
    (r"\bGongju\b", "Kongju"),
    (r"\bGimje\b", "Kimje"),
    (r"\bJeonju\b", "Chŏnju"),
    (r"\bCheongju\b", "Ch'ŏngju"),
    (r"\bYeongju\b", "Yŏngju"),
    (r"\bCheomseongdae\b", "Ch'ŏmsŏngdae"),
    (r"\bSeondeok\b", "Sŏndŏk"),
    (r"\bJinheung\b", "Chinhŭng"),
    (r"\bJinpyo\b", "Chinp'yo"),
    (r"\bYeondeunghoe\b", "Yŏndŭnghoe"),
    (r"\bJogye\b", "Chogye"),
    (r"\bJogyesa\b", "Chogyesa"),
    (r"\bJirisan\b", "Chirisan"),
    (r"\bTaebaeksan\b", "T'aebaeksan"),
    (r"\bTongdosa\b", "T'ongdosa"),
    (r"\bBeopjusa\b", "Pŏpchusa"),
    (r"\bSeonamsa\b", "Sŏnamsa"),
    (r"\bDaeheungsa\b", "Taehŭngsa"),
    (r"\bBuseoksa\b", "Pusŏksa"),
    (r"\bBongjeongsa\b", "Pongjŏngsa"),
    (r"\bSudeoksa\b", "Sudŏksa"),
    (r"\bGeumsansa\b", "Kŭmsansa"),
    (r"\bMireuksa\b", "Mirŭksa"),
    (r"\bJeongnimsa\b", "Chŏngnimsa"),
    (r"\bWoljeongsa\b", "Wŏlchŏngsa"),
]
COMPILED = [(re.compile(pattern), preferred) for pattern, preferred in RULES]

URL_RE = re.compile(r"https?://[^\s\"'<>]+")
ATTR_RE = re.compile(r"\b(?:href|src)=(?:\"[^\"]*\"|'[^']*')", re.IGNORECASE)

def visible_text(line: str) -> str:
    line = ATTR_RE.sub("", line)
    return URL_RE.sub("", line)

def iter_files():
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in EXTENSIONS:
            continue
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        yield path

def main() -> int:
    failures = []
    for path in iter_files():
        try:
            text = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        for lineno, raw_line in enumerate(text.splitlines(), start=1):
            line = visible_text(raw_line)
            for pattern, preferred in COMPILED:
                match = pattern.search(line)
                if match:
                    failures.append(
                        (path.relative_to(ROOT), lineno, match.group(0), preferred)
                    )

    if not failures:
        print("Korean romanization check: OK (McCune–Reischauer / Grand Silla).")
        return 0

    print("Korean romanization check failed:", file=sys.stderr)
    for path, lineno, found, preferred in failures:
        print(f"  {path}:{lineno}: {found!r} -> use {preferred!r}", file=sys.stderr)
    return 1

if __name__ == "__main__":
    raise SystemExit(main())
