#!/usr/bin/env python3
"""
Add default banner to blogs without featured images
Extract first image from content if available, otherwise use default
"""

import os
import re
from pathlib import Path

BLOGS_DIR = Path("/Users/samanvay/Documents/avninew-v2/content/blogs")
DEFAULT_BANNER = "/img/default-blog-banner.png"

def extract_frontmatter(content):
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if match:
        return match.group(1), match.group(2)
    return None, content

def extract_first_image(content):
    """Extract first image from blog content"""
    # Try <img src="...">
    img_match = re.search(r'<img[^>]+src="([^"]+)"', content)
    if img_match:
        return img_match.group(1)
    
    # Try markdown images ![](...)
    md_match = re.search(r'!\[.*?\]\(([^)]+)\)', content)
    if md_match:
        return md_match.group(1)
    
    return None

def fix_blog_banner(blog_path):
    """Add featured image if missing"""
    with open(blog_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    fm_text, body = extract_frontmatter(content)
    if not fm_text:
        return False, "No frontmatter"
    
    # Check if already has featured image
    if 'featuredimage:' in fm_text.lower():
        featured_match = re.search(r'featuredimage:\s*(.+)', fm_text, re.IGNORECASE)
        if featured_match and featured_match.group(1).strip():
            return False, "Already has featured image"
    
    # Try to get first image from content
    first_image = extract_first_image(body)
    banner_to_use = first_image if first_image else DEFAULT_BANNER
    
    # Add featuredimage to frontmatter
    # Insert before the closing ---
    new_fm = fm_text.rstrip() + f"\nfeaturedimage: {banner_to_use}\n"
    new_content = f"---\n{new_fm}---\n{body}"
    
    with open(blog_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return True, f"Added: {banner_to_use}"

# Main execution
print("=" * 70)
print("FIXING MISSING BLOG BANNERS")
print("=" * 70)
print()

blogs = sorted(BLOGS_DIR.glob("*.md"))
fixed = 0
skipped = 0

for blog_path in blogs:
    blog_name = blog_path.name
    success, message = fix_blog_banner(blog_path)
    
    if success:
        print(f"✅ {blog_name}")
        print(f"   {message}")
        fixed += 1
    else:
        skipped += 1

print()
print("=" * 70)
print(f"Fixed: {fixed} blogs")
print(f"Skipped: {skipped} blogs (already have banners)")
print("=" * 70)
