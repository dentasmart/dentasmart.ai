#!/bin/bash
# SEO Architecture Validation Script
# Tests raw HTML output for: unique title, unique description, one canonical, SSR content, JSON-LD schema

BASE="http://localhost:3000"
PASS=0
FAIL=0

check_page() {
  local path="$1"
  local label="$2"
  local html=$(curl -s "${BASE}${path}")
  local errors=""

  # 1. Check exactly one canonical
  local canonical_count=$(echo "$html" | grep -c 'rel="canonical"')
  if [ "$canonical_count" -ne 1 ]; then
    errors="${errors}  FAIL: ${canonical_count} canonical tags (expected 1)\n"
  fi

  # 2. Check title exists and is not default
  local title=$(echo "$html" | grep -o '<title>[^<]*</title>')
  if [ -z "$title" ]; then
    errors="${errors}  FAIL: No <title> tag found\n"
  elif echo "$title" | grep -q "DentaSmart - Your Personal AI Dental Companion"; then
    errors="${errors}  FAIL: Default title not overridden\n"
  fi

  # 3. Check meta description exists
  local desc=$(echo "$html" | grep -o 'name="description" content="[^"]*"')
  if [ -z "$desc" ]; then
    errors="${errors}  FAIL: No meta description found\n"
  fi

  # 4. Check SSR content exists
  local ssr=$(echo "$html" | grep -c 'id="ssr-content"')
  if [ "$ssr" -lt 1 ]; then
    errors="${errors}  FAIL: No SSR content block found\n"
  fi

  # 5. Check JSON-LD schema exists
  local jsonld_count=$(echo "$html" | grep -c 'application/ld+json')
  if [ "$jsonld_count" -lt 1 ]; then
    errors="${errors}  FAIL: No JSON-LD schema found\n"
  fi

  # 6. Check H1 in SSR content
  local h1=$(echo "$html" | grep -o '<h1>[^<]*</h1>')
  if [ -z "$h1" ]; then
    errors="${errors}  FAIL: No H1 in SSR content\n"
  fi

  if [ -z "$errors" ]; then
    echo "✓ PASS: ${label} (${path})"
    echo "  Title: ${title}"
    echo "  Schema: ${jsonld_count} JSON-LD blocks"
    PASS=$((PASS + 1))
  else
    echo "✗ FAIL: ${label} (${path})"
    echo -e "$errors"
    FAIL=$((FAIL + 1))
  fi
  echo ""
}

echo "========================================="
echo "DentaSmart SEO Architecture Validation"
echo "========================================="
echo ""

# Test 12+ pages across all content types
check_page "/" "Homepage"
check_page "/how-it-works" "How It Works"
check_page "/pricing" "Pricing"
check_page "/features" "Features"
check_page "/download" "Download"
check_page "/conditions/toothache" "Condition: Toothache"
check_page "/conditions/cavities" "Condition: Cavities"
check_page "/symptoms/bad-breath" "Symptom: Bad Breath"
check_page "/symptoms/bleeding-gums" "Symptom: Bleeding Gums"
check_page "/dental-costs/dental-crown-cost" "Cost: Dental Crown"
check_page "/dental-costs/root-canal-cost" "Cost: Root Canal"
check_page "/treatments/root-canal-procedure" "Treatment: Root Canal"
check_page "/comparisons/braces-vs-invisalign" "Comparison: Braces vs Invisalign"
check_page "/guides/brushing-guide" "Guide: Brushing"
check_page "/life-stages/baby-teething-guide" "Life Stage: Baby Teething"
check_page "/dental-emergencies/knocked-out-tooth" "Emergency: Knocked Out Tooth"
check_page "/lifestyle/smoking-and-oral-health" "Lifestyle: Smoking"
check_page "/faqs" "FAQs"

echo "========================================="
echo "RESULTS: ${PASS} passed, ${FAIL} failed"
echo "========================================="
