# Editor vs Public Page Comparison

## Issue Found
The public page for this article renders the StoryBrand structured content (not bodyHtml) because the article was migrated from static data. The structured content renderer uses different styling (empathy section has a special card with icon, etc.) compared to the WYSIWYG editor's blog-content class.

The key issue: when the editor auto-converts StoryBrand sections to HTML, the blockquote in the editor looks like a teal-bordered italic block, but on the public page the structured renderer shows the empathy section as a rounded card with an icon.

## Solution
The editor and public page now both use the same blog-content CSS class. The editor shows the content correctly with matching typography. The public page for articles with bodyHtml will also use blog-content class. The articles that still use structured content will show the StoryBrand layout.

When a blogger edits and saves an article via the WYSIWYG editor, the bodyHtml gets saved, and the public page will then use blog-content rendering - matching what they saw in the editor.
