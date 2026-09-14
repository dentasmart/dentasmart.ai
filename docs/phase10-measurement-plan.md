# Phase 10 Measurement Plan

## Purpose

This document describes DentaSmart website measurement that is implemented in the source-controlled Phase 10 foundation. It is a technical contract, not a claim that an app install, account registration, payment, dental outcome, or employer relationship has occurred.

## Consent and privacy boundary

Optional analytics and marketing trackers are not loaded until the visitor makes a tracking preference. Visitors can accept analytics and marketing tracking together, reject optional tracking, or manage the two categories separately. A persistent footer control reopens those preferences. Tracking is disabled on email-unsubscribe paths.

The first-party event envelope accepts only the allowlisted fields in `shared/analyticsContract.ts`. It rejects visitor-entered text, health information, email addresses, tokens, raw referrers, full URLs, and query strings. Page paths are stored without query strings or hashes.

## Canonical events

| Event | Meaning | Does not mean |
|---|---|---|
| `page_view` | A consented website route view | An app registration or product use |
| `quick_check_start` | A visitor starts the Quick Check flow | A diagnosis or clinical result |
| `download_hub_open` | A visitor opens the website download hub | An app-store visit or install |
| `store_listing_click` | A visitor selects an iOS or Android store listing | An install, registration, or purchase |
| `pricing_plan_selected` | A visitor selects a pricing option | A checkout, payment, or subscription |
| `checkout_started` | A visitor begins the existing checkout handoff | A completed payment or plan activation |
| `employer_demo_submit_attempt` | A visitor attempts the employer request form | A submitted or qualified lead |
| `employer_demo_submitted` | The existing form reports submission success | A qualified employer lead or customer |
| `cta_click` | A visitor selects a defined internal CTA | Any downstream product outcome |
| `content_engagement` | A defined non-conversion content interaction | A commercial conversion |

## Attribution model

On a consented first touch, the browser stores only `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, and `utm_term`, plus a path-only landing page and capture timestamps. New UTM values update that stored campaign context. The context travels with later consented first-party events and selected store URLs. Legacy `/app` entries preserve only those five UTM fields through the one-hop redirect to `/download/`.

This foundation does not claim to connect a later mobile-app install, account registration, purchase, or employer qualification to a web session. Those outcomes require approved mobile-app, store-provider, payment-provider, or CRM integrations and their own privacy review.

## Verification requirements

Before release, verify that no tracker request occurs before acceptance or after rejection; acceptance loads analytics and marketing trackers only once; each consent state produces at most one canonical page view; the footer preference control changes behavior immediately; CTA events do not carry query strings, email, health text, tokens, or raw referrers; and checkout, employer, and store events retain their truthful meanings.
