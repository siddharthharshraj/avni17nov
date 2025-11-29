#!/usr/bin/env python3
"""
Normalize all featured images to use featuredimage (lowercase)
Extract src from featuredImage objects
"""

import os
import re
import yaml
from pathlib import Path

BLOGS_DIR = Path("/Users/samanvay/Documents/avninew-v2/content/blogs")

def extract_frontmatter(content):
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if match:
        return match.group(1), match.group(2)
    return None, content

def normalize_blog(blog_path):
    """Normalize featured image field"""
    with open(blog_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    fm_text, body = extract_frontmatter(content)
    if not fm_text:
        return False, "No frontmatter"
    
    try:
        fm = yaml.safe_load(fm_text)
    except:
        return False, "YAML parse error"
    
    changed = False
    
    # Check for featuredImage (capital I) with object
    if 'featuredImage' in fm and isinstance(fm['featuredImage'], dict):
        src = fm['featuredImage'].get('src', '')
        if src:
            fm['featuredimage'] = src
            del fm['featuredImage']
            changed = True
    
    # Check for featuredImage (capital I) with string
    elif 'featuredImage' in fm and isinstance(fm['featuredImage'], str):
        fm['featuredimage'] = fm['featuredImage']
        del fm['featuredImage']
        changed = True
    
    if changed:
        # Reconstruct frontmatter
        new_fm_lines = []
        for key, value in fm.items():
            if isinstance(value, list):
                new_fm_lines.append(f"{key}:")
                for item in value:
                    new_fm_lines.append(f"  - {item}")
            elif isinstance(value, dict):
                new_fm_lines.append(f"{key}:")
                for k, v in value.items():
                    new_fm_lines.append(f"  {k}: {v}")
            elif isinstance(value, str) and '\n' in value:
                new_fm_lines.append(f"{key}: >-")
                for line in value.split('\n'):
                    new_fm_lines.append(f"  {line}")
            else:
                new_fm_lines.append(f"{key}: {value}")
        
        new_content = "---\n" + "\n".join(new_fm_lines) + "\n---\n" + body
        
        with open(blog_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        return True, f"Normalized featuredImage -> featuredimage"
    
    return False, "No changes needed"

# Main execution
print("=" * 70)
print("NORMALIZING FEATURED IMAGES")
print("=" * 70)
print()

blogs = sorted(BLOGS_DIR.glob("*.md"))
normalized = 0

for blog_path in blogs:
    blog_name = blog_path.name
    success, message = normalize_blog(blog_path)
    
    if success:
        print(f"✅ {blog_name}")
        print(f"   {message}")
        normalized += 1

print()
print("=" * 70)
print(f"Normalized: {normalized} blogs")
print("=" * 70)
