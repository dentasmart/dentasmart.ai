#!/usr/bin/env python3
"""
DentaSmart SEO Architecture Validation — Full 10-Point Check
Tests raw HTML (curl-equivalent) for 25+ representative URLs.
"""

import requests
import json
import re
import sys
from collections import defaultdict

BASE_URL = "http://localhost:3000"
CANONICAL_DOMAIN = "https://dentasmart.ai"

# 25+ representative URLs across all content types
TEST_URLS = [
    # Core pages
    "/",
    "/how-it-works",
    "/features",
    "/pricing",
    "/download",
    "/faqs",
    "/team",
    "/employers",
    # Conditions (5)
    "/conditions/toothache",
    "/conditions/cavities",
    "/conditions/gum-disease",
    "/conditions/tooth-sensitivity",
    "/conditions/oral-thrush",
    # Symptoms (3)
    "/symptoms/bad-breath",
    "/symptoms/bleeding-gums",
    "/symptoms/tooth-pain",
    # Dental Costs (3)
    "/dental-costs/dental-crown-cost",
    "/dental-costs/root-canal-cost",
    "/dental-costs/teeth-whitening-cost",
    # Treatments (2)
    "/treatments/root-canal-procedure",
    "/treatments/dental-implant-procedure",
    # Comparisons (2)
    "/comparisons/braces-vs-invisalign",
    "/comparisons/veneers-vs-crowns",
    # Guides (1)
    "/guides/brushing-guide",
    # Life stages (1)
    "/life-stages/baby-teething-guide",
    # Emergencies (1)
    "/dental-emergencies/knocked-out-tooth",
    # Lifestyle (1)
    "/lifestyle/smoking-and-oral-health",
]

def get_sitemap_urls():
    """Fetch all URLs from sitemap.xml"""
    try:
        resp = requests.get(f"{BASE_URL}/sitemap.xml", timeout=10)
        urls = re.findall(r'<loc>([^<]+)</loc>', resp.text)
        return set(urls)
    except:
        return set()

def extract_json_ld(html):
    """Extract all JSON-LD blocks from HTML"""
    pattern = r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>'
    matches = re.findall(pattern, html, re.DOTALL)
    schemas = []
    for m in matches:
        try:
            schemas.append(json.loads(m.strip()))
        except json.JSONDecodeError:
            schemas.append({"_error": "invalid JSON", "_raw": m[:100]})
    return schemas

def check_page(path, sitemap_urls, all_titles, all_descriptions):
    """Run all 10 checks on a single page. Returns dict of results."""
    url = f"{BASE_URL}{path}"
    results = {
        "path": path,
        "status": None,
        "checks": {},
        "errors": [],
        "warnings": [],
    }
    
    try:
        resp = requests.get(url, timeout=10, allow_redirects=False)
    except Exception as e:
        results["errors"].append(f"Request failed: {e}")
        return results
    
    results["status"] = resp.status_code
    html = resp.text
    
    # ═══════════════════════════════════════════════════════════
    # CHECK 1: 200 Status Code
    # ═══════════════════════════════════════════════════════════
    if resp.status_code == 200:
        results["checks"]["status_200"] = "PASS"
    else:
        results["checks"]["status_200"] = "FAIL"
        results["errors"].append(f"Status {resp.status_code} (expected 200)")
    
    # ═══════════════════════════════════════════════════════════
    # CHECK 2: Real Visible Content in Raw HTML
    # ═══════════════════════════════════════════════════════════
    ssr_match = re.search(r'<div id="ssr-content"[^>]*>(.*?)</div>\s*<div id="root"', html, re.DOTALL)
    if ssr_match:
        ssr_content = ssr_match.group(1)
        # Check for H1
        has_h1 = bool(re.search(r'<h1[^>]*>', ssr_content))
        # Check for paragraph text (at least 50 chars of actual text)
        text_only = re.sub(r'<[^>]+>', '', ssr_content).strip()
        has_text = len(text_only) > 100
        # Check for internal links
        has_links = bool(re.search(r'href="/', ssr_content))
        
        if has_h1 and has_text and has_links:
            results["checks"]["visible_content"] = "PASS"
        else:
            issues = []
            if not has_h1: issues.append("no H1")
            if not has_text: issues.append(f"text too short ({len(text_only)} chars)")
            if not has_links: issues.append("no internal links")
            results["checks"]["visible_content"] = "FAIL"
            results["errors"].append(f"SSR content issues: {', '.join(issues)}")
    else:
        results["checks"]["visible_content"] = "FAIL"
        results["errors"].append("No <div id='ssr-content'> found in raw HTML")
    
    # ═══════════════════════════════════════════════════════════
    # CHECK 3: Exactly One Canonical Tag
    # ═══════════════════════════════════════════════════════════
    canonical_matches = re.findall(r'<link[^>]*rel="canonical"[^>]*href="([^"]*)"[^>]*/?>',  html)
    if len(canonical_matches) == 1:
        results["checks"]["one_canonical"] = "PASS"
        results["canonical_url"] = canonical_matches[0]
    elif len(canonical_matches) == 0:
        results["checks"]["one_canonical"] = "FAIL"
        results["errors"].append("No canonical tag found")
        results["canonical_url"] = None
    else:
        results["checks"]["one_canonical"] = "FAIL"
        results["errors"].append(f"Multiple canonical tags ({len(canonical_matches)}): {canonical_matches}")
        results["canonical_url"] = canonical_matches[0]
    
    # ═══════════════════════════════════════════════════════════
    # CHECK 4: Self-Referencing Canonical
    # ═══════════════════════════════════════════════════════════
    expected_canonical = f"{CANONICAL_DOMAIN}{path}" if path != "/" else f"{CANONICAL_DOMAIN}/"
    if results.get("canonical_url") == expected_canonical:
        results["checks"]["self_referencing_canonical"] = "PASS"
    else:
        results["checks"]["self_referencing_canonical"] = "FAIL"
        results["errors"].append(f"Canonical mismatch: got '{results.get('canonical_url')}', expected '{expected_canonical}'")
    
    # ═══════════════════════════════════════════════════════════
    # CHECK 5: Unique Title
    # ═══════════════════════════════════════════════════════════
    title_match = re.search(r'<title>([^<]+)</title>', html)
    if title_match:
        title = title_match.group(1).strip()
        results["title"] = title
        if title in all_titles:
            results["checks"]["unique_title"] = "FAIL"
            results["errors"].append(f"Duplicate title (same as {all_titles[title]})")
        else:
            results["checks"]["unique_title"] = "PASS"
            all_titles[title] = path
    else:
        results["checks"]["unique_title"] = "FAIL"
        results["errors"].append("No <title> tag found")
    
    # ═══════════════════════════════════════════════════════════
    # CHECK 6: Unique Meta Description
    # ═══════════════════════════════════════════════════════════
    desc_match = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', html)
    if desc_match:
        desc = desc_match.group(1).strip()
        results["description"] = desc[:80] + "..." if len(desc) > 80 else desc
        if desc in all_descriptions:
            results["checks"]["unique_description"] = "FAIL"
            results["errors"].append(f"Duplicate description (same as {all_descriptions[desc]})")
        else:
            results["checks"]["unique_description"] = "PASS"
            all_descriptions[desc] = path
    else:
        results["checks"]["unique_description"] = "FAIL"
        results["errors"].append("No meta description found")
    
    # ═══════════════════════════════════════════════════════════
    # CHECK 7: Correct Schema JSON-LD
    # ═══════════════════════════════════════════════════════════
    schemas = extract_json_ld(html)
    if len(schemas) > 0:
        schema_types = [s.get("@type", "unknown") for s in schemas if "_error" not in s]
        results["schema_types"] = schema_types
        
        # Every page should have Organization
        has_org = "Organization" in schema_types
        if has_org:
            results["checks"]["correct_schema"] = "PASS"
        else:
            results["checks"]["correct_schema"] = "FAIL"
            results["errors"].append(f"Missing Organization schema. Found: {schema_types}")
    else:
        results["checks"]["correct_schema"] = "FAIL"
        results["errors"].append("No JSON-LD schema found")
        results["schema_types"] = []
    
    # ═══════════════════════════════════════════════════════════
    # CHECK 8: No Duplicate Schema Types
    # ═══════════════════════════════════════════════════════════
    if schemas:
        schema_types_list = [s.get("@type", "unknown") for s in schemas if "_error" not in s]
        duplicates = [t for t in set(schema_types_list) if schema_types_list.count(t) > 1]
        if not duplicates:
            results["checks"]["no_duplicate_schema"] = "PASS"
        else:
            results["checks"]["no_duplicate_schema"] = "FAIL"
            results["errors"].append(f"Duplicate schema types: {duplicates}")
    else:
        results["checks"]["no_duplicate_schema"] = "PASS"  # No schemas = no duplicates
    
    # ═══════════════════════════════════════════════════════════
    # CHECK 9: Included in Sitemap Only If Indexable
    # ═══════════════════════════════════════════════════════════
    full_url = f"{CANONICAL_DOMAIN}{path}"
    in_sitemap = full_url in sitemap_urls
    
    # Check if page has noindex
    has_noindex = bool(re.search(r'<meta[^>]*name="robots"[^>]*content="[^"]*noindex', html))
    
    if has_noindex and in_sitemap:
        results["checks"]["sitemap_indexable"] = "FAIL"
        results["errors"].append("Page has noindex but is in sitemap")
    elif not has_noindex and resp.status_code == 200:
        # Indexable page — should be in sitemap
        if in_sitemap:
            results["checks"]["sitemap_indexable"] = "PASS"
        else:
            results["checks"]["sitemap_indexable"] = "WARN"
            results["warnings"].append("Indexable page not found in sitemap")
    else:
        results["checks"]["sitemap_indexable"] = "PASS"
    
    # ═══════════════════════════════════════════════════════════
    # CHECK 10: No Mismatch Between SSR Content and Page Topic
    # ═══════════════════════════════════════════════════════════
    if ssr_match and title_match:
        ssr_text = re.sub(r'<[^>]+>', '', ssr_match.group(1)).lower()
        title_text = title_match.group(1).lower()
        
        # Extract key topic words from the title (skip common words)
        stop_words = {'the', 'a', 'an', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'your', 'how', 'what', 'when', 'why', '|', '-', '&', 'amp'}
        title_words = [w for w in re.findall(r'\w+', title_text) if w not in stop_words and len(w) > 2]
        
        # Check if at least 50% of title keywords appear in SSR content
        if title_words:
            matches = sum(1 for w in title_words if w in ssr_text)
            match_ratio = matches / len(title_words)
            if match_ratio >= 0.4:
                results["checks"]["content_consistency"] = "PASS"
            else:
                results["checks"]["content_consistency"] = "FAIL"
                results["errors"].append(f"SSR content doesn't match title topic. Title words: {title_words}, found {matches}/{len(title_words)} in SSR")
        else:
            results["checks"]["content_consistency"] = "PASS"
    else:
        results["checks"]["content_consistency"] = "SKIP"
        results["warnings"].append("Could not verify content consistency (missing SSR or title)")
    
    return results


def main():
    print("=" * 70)
    print("DentaSmart SEO Architecture — Full 10-Point Validation")
    print("=" * 70)
    print(f"\nBase URL: {BASE_URL}")
    print(f"Canonical Domain: {CANONICAL_DOMAIN}")
    print(f"URLs to test: {len(TEST_URLS)}")
    print()
    
    # Fetch sitemap
    sitemap_urls = get_sitemap_urls()
    print(f"Sitemap contains {len(sitemap_urls)} URLs")
    print()
    
    all_titles = {}
    all_descriptions = {}
    all_results = []
    
    total_pass = 0
    total_fail = 0
    total_warn = 0
    
    for path in TEST_URLS:
        result = check_page(path, sitemap_urls, all_titles, all_descriptions)
        all_results.append(result)
        
        # Count
        page_passes = sum(1 for v in result["checks"].values() if v == "PASS")
        page_fails = sum(1 for v in result["checks"].values() if v == "FAIL")
        page_warns = sum(1 for v in result["checks"].values() if v == "WARN")
        
        total_pass += page_passes
        total_fail += page_fails
        total_warn += page_warns
        
        # Print result
        status_icon = "✓" if page_fails == 0 else "✗"
        print(f"{status_icon} [{result['status']}] {path}")
        print(f"  Title: {result.get('title', 'N/A')[:60]}")
        print(f"  Schema: {result.get('schema_types', [])}")
        print(f"  Checks: {page_passes} pass, {page_fails} fail, {page_warns} warn")
        
        if result["errors"]:
            for err in result["errors"]:
                print(f"  ❌ {err}")
        if result["warnings"]:
            for warn in result["warnings"]:
                print(f"  ⚠️  {warn}")
        print()
    
    # Summary
    print("=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"Pages tested: {len(TEST_URLS)}")
    print(f"Total checks: {total_pass + total_fail + total_warn}")
    print(f"  ✓ PASS: {total_pass}")
    print(f"  ✗ FAIL: {total_fail}")
    print(f"  ⚠️  WARN: {total_warn}")
    print()
    
    # Per-check summary
    check_names = [
        "status_200", "visible_content", "one_canonical", 
        "self_referencing_canonical", "unique_title", "unique_description",
        "correct_schema", "no_duplicate_schema", "sitemap_indexable",
        "content_consistency"
    ]
    
    print("Per-Check Results:")
    print("-" * 50)
    for check in check_names:
        passes = sum(1 for r in all_results if r["checks"].get(check) == "PASS")
        fails = sum(1 for r in all_results if r["checks"].get(check) == "FAIL")
        warns = sum(1 for r in all_results if r["checks"].get(check) == "WARN")
        status = "✓" if fails == 0 else "✗"
        print(f"  {status} {check}: {passes}/{len(TEST_URLS)} pass" + (f", {fails} fail" if fails else "") + (f", {warns} warn" if warns else ""))
    
    print()
    
    # List all failures
    failed_pages = [r for r in all_results if any(v == "FAIL" for v in r["checks"].values())]
    if failed_pages:
        print("FAILED PAGES:")
        print("-" * 50)
        for r in failed_pages:
            print(f"  {r['path']}:")
            for err in r["errors"]:
                print(f"    ❌ {err}")
        print()
    
    if total_fail == 0:
        print("🎉 ALL CHECKS PASSED — SEO architecture is solid!")
    else:
        print(f"⚠️  {total_fail} issues need attention.")
    
    return 0 if total_fail == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
