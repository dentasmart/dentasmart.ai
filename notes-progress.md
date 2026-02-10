# Progress Notes

## Public Blog Pages - Database Integration
- OralHealthHub page now loads articles from database via tRPC
- All 30 articles are showing correctly with categories, read times, and descriptions
- Search and category filters work via server-side queries
- Article page now loads individual articles by slug from database
- Articles use slug-based URLs (/hub/slug-name) instead of old ID-based URLs
- Both structured (StoryBrand) and WYSIWYG body content rendering supported
- Related articles section works with database queries
- Blog content CSS styles added for WYSIWYG rendered HTML

## Admin Blog Management
- Admin login works (admin / DentaSmart2026)
- Admin dashboard shows all articles with search, category, and status filters
- Blog editor with TipTap WYSIWYG editor
- SEO fields: meta title, meta description, meta keywords, OG title, OG description, canonical URL
- Status management: Draft, Published, Unpublished
- URL slug creation and editing with uniqueness check

## Remaining Tasks
- Write vitest tests for blog API routes
- Test article detail page from database
- Mark remaining todo items
