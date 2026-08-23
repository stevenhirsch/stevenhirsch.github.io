#!/usr/bin/env python3
"""Sync data/publications.json against the ORCID public API.

Only *adds* works that aren't already present (matched by ORCID put-code) and
aren't listed in data/publications_ignore.json. Never edits or removes an
existing entry, so manual cleanups/wording tweaks are preserved. Run this,
then commit/PR the result for a human to review before it goes live.
"""
import json
import os
import sys
import urllib.request

ORCID_ID = os.environ.get("ORCID_ID", "0000-0002-4394-1922")
API_URL = f"https://pub.orcid.org/v3.0/{ORCID_ID}/works"

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLICATIONS_PATH = os.path.join(REPO_ROOT, "data", "publications.json")
IGNORE_PATH = os.path.join(REPO_ROOT, "data", "publications_ignore.json")

KNOWN_TYPES = {
    "journal-article",
    "dissertation-thesis",
    "conference-paper",
    "preprint",
}


def fetch_orcid_works():
    req = urllib.request.Request(API_URL, headers={"Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.load(resp)


def normalize(group):
    summary = group["work-summary"][0]
    put_code = summary["put-code"]
    title = summary["title"]["title"]["value"]
    year_block = (summary.get("publication-date") or {}).get("year") or {}
    year = int(year_block["value"]) if year_block.get("value") else None
    work_type = summary.get("type")
    if work_type not in KNOWN_TYPES:
        work_type = "other"

    doi = None
    for eid in group.get("external-ids", {}).get("external-id", []):
        if eid.get("external-id-type") == "doi":
            doi = eid.get("external-id-value")
            break

    url = (summary.get("url") or {}).get("value")
    if not url and doi:
        url = f"https://doi.org/{doi}"

    return {
        "putCode": put_code,
        "type": work_type,
        "title": title,
        "year": year,
        "url": url,
        "doi": doi,
    }


def main():
    with open(PUBLICATIONS_PATH) as f:
        existing = json.load(f)
    known_put_codes = {pub["putCode"] for pub in existing}

    ignore_put_codes = set()
    if os.path.exists(IGNORE_PATH):
        with open(IGNORE_PATH) as f:
            ignore_put_codes = set(json.load(f).get("putCodes", []))

    data = fetch_orcid_works()
    new_entries = []
    for group in data.get("group", []):
        entry = normalize(group)
        if entry["putCode"] in known_put_codes or entry["putCode"] in ignore_put_codes:
            continue
        new_entries.append(entry)
        known_put_codes.add(entry["putCode"])

    if not new_entries:
        print("No new publications found.")
        return 0

    updated = existing + new_entries
    updated.sort(key=lambda p: (p["year"] or 0), reverse=True)

    with open(PUBLICATIONS_PATH, "w") as f:
        json.dump(updated, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"Added {len(new_entries)} new publication(s):")
    for entry in new_entries:
        print(f"  - [{entry['year']}] {entry['title']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
