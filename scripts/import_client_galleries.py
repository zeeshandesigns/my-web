#!/usr/bin/env python3
"""Import a verified, owner-uploaded WebCraft + Zoya artwork bundle."""
from pathlib import Path, PurePosixPath
import hashlib
import re
import zipfile

ROOT=Path(__file__).resolve().parents[1]
BUNDLE=ROOT/"portfolio-gallery-bundle.zip"
MANIFEST="CLIENT_GALLERY_MANIFEST.sha256"
CLIENTS={"webcraft-consulting":9,"zoya-beauty-hub":8}

if not BUNDLE.is_file(): raise SystemExit("Gallery bundle not found in repository root.")
if BUNDLE.stat().st_size>20_000_000: raise SystemExit("Gallery bundle is too large.")

with zipfile.ZipFile(BUNDLE) as archive:
    names=archive.namelist()
    if len(names)!=len(set(names)) or archive.testzip():
        raise SystemExit("Duplicate or corrupt files in bundle.")
    digests={}
    for line in archive.read(MANIFEST).decode("utf-8").splitlines():
        m=re.fullmatch(r"([a-f0-9]{64})  (\S+)",line)
        if not m: raise SystemExit("Malformed bundle checksum manifest.")
        sha,path=m.groups()
        if path in digests: raise SystemExit("Duplicate manifest path.")
        digests[path]=sha
    if set(names)!=set(digests)|{MANIFEST}:
        raise SystemExit("Bundle contains unexpected or missing files.")
    expected_md={f"src/content/projects/{c}.md" for c in CLIENTS}
    if not expected_md.issubset(set(digests)):
        raise SystemExit("Missing client project manifest.")
    counts={c:0 for c in CLIENTS}
    for path,digest in digests.items():
        name=PurePosixPath(path)
        if name.is_absolute() or ".." in name.parts:
            raise SystemExit("Unsafe path in bundle.")
        is_md=path in expected_md
        is_asset=len(name.parts)==5 and name.parts[:3]==("public","images","social") and name.parts[3] in CLIENTS and name.name.endswith(".webp")
        if not(is_md or is_asset):
            raise SystemExit(f"Unexpected bundle path: {path}")
        info=archive.getinfo(path)
        if (info.external_attr>>16)&0o170000==0o120000:
            raise SystemExit("Symlink prohibited.")
        payload=archive.read(path)
        if hashlib.sha256(payload).hexdigest()!=digest:
            raise SystemExit(f"Checksum mismatch: {path}")
        if is_asset:
            if not(payload.startswith(b"RIFF") and payload[8:12]==b"WEBP"):
                raise SystemExit(f"Invalid WebP file: {path}")
            counts[name.parts[3]]+=1
        if is_md:
            count=CLIENTS[name.name.removesuffix(".md")]
            if len(re.findall(r"^\s*- src:",payload.decode("utf-8"),re.M))!=count:
                raise SystemExit(f"Gallery length mismatch: {path}")
    for client,count in CLIENTS.items():
        if counts[client]!=count*2:
            raise SystemExit(f"Expected {count*2} images for {client}.")
    for path in digests:
        dest=ROOT/path
        dest.parent.mkdir(parents=True,exist_ok=True)
        dest.write_bytes(archive.read(path))
    print(f"Imported 34 optimized gallery images and two case-study files.")
