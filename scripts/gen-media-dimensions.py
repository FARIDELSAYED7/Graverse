#!/usr/bin/env python3
"""Genere les dimensions des images ECHOES pour eviter le layout shift."""
import json, os, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(ROOT, "public")
OUT = os.path.join(ROOT, "src", "data", "echoes", "media-dimensions.json")

try:
    from PIL import Image
except ImportError:
    print("Pillow absent", file=sys.stderr); sys.exit(1)

dims = {}
for dirpath, _dirs, files in os.walk(PUB):
    for fn in files:
        if not fn.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
            continue
        p = os.path.join(dirpath, fn)
        rel = "/" + os.path.relpath(p, PUB).replace(os.sep, "/")
        try:
            with Image.open(p) as im:
                dims[rel] = {"w": im.width, "h": im.height}
        except Exception:
            pass

json.dump(dims, open(OUT, "w"), indent=0, sort_keys=True)
print(len(dims), "->", OUT)
