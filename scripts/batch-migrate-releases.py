#!/usr/bin/env python3
"""
Batch migrate release announcement blogs
Converts from Gatsby format to Next.js MDX format
"""

import os
import re
from pathlib import Path
from datetime import datetime

SOURCE_DIR = Path("/Users/samanvay/Desktop/avni-website-master/src/pages/blog")
TARGET_DIR = Path("/Users/samanvay/Documents/avninew-v2/content/blogs")

# List of 2023 release announcements to migrate
RELEASE_BLOGS = [
    "2023-01-13-avni-release-announcement.md",
    "2023-02-20-avni-release-announcement.md",
    "2023-02-22-avni-release-announcement.md",
    "2023-03-02-avni-release-announcement.md",
    "2023-03-29-avni-release-announcement.md",
    "2023-04-12-avni-release-announcement.md",
    "2023-04-21-avni-release-announcement.md",
    "2023-05-18-avni-release-announcement.md",
    "2023-05-29-avni-release-announcement.md",
    "2023-06-06-avni-release-3.39.0.md",
    "2023-06-12-avni-release-announcement.md",
    "2023-07-05-avni-release-announcement.md",
    "2023-09-04-avni-release-announcement.md",
]

def extract_frontmatter(content):
    """Extract frontmatter from markdown"""
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if match:
        return match.group(1), match.group(2)
    return None, content

def parse_frontmatter(fm_text):
    """Parse YAML-like frontmatter"""
    fm = {}
    for line in fm_text.split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            fm[key.strip()] = value.strip()
    return fm

def convert_images(content):
    """Convert old image format to figure/figcaption"""
    # Convert <div> wrapped images
    content = re.sub(
        r'<div[^>]*>\s*<img src="([^"]+)"[^>]*>\s*</div>',
        r'<figure>\n  <img src="\1" alt="" />\n</figure>',
        content
    )
    # Convert standalone img tags
    content = re.sub(
        r'<img src="([^"]+)"[^>]*/>',
        r'<figure>\n  <img src="\1" alt="" />\n</figure>',
        content
    )
    return content

def remove_ctas(content):
    """Remove CTA sections"""
    # Remove Discord links
    content = re.sub(r'.*Discord.*\n?', '', content, flags=re.IGNORECASE)
    # Remove demo/schedule links
    content = re.sub(r'.*schedule.*demo.*\n?', '', content, flags=re.IGNORECASE)
    # Remove newsletter links
    content = re.sub(r'.*newsletter.*\n?', '', content, flags=re.IGNORECASE)
    # Remove "Share Feedback" sections
    content = re.sub(r'###?\s*💬.*Share.*\n.*\n.*\n', '', content)
    return content

def migrate_blog(filename):
    """Migrate a single blog"""
    source_path = SOURCE_DIR / filename
    target_path = TARGET_DIR / filename
    
    if target_path.exists():
        print(f"⚠️  SKIP: {filename} already exists")
        return False
    
    with open(source_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    fm_text, body = extract_frontmatter(content)
    if not fm_text:
        print(f"❌ ERROR: No frontmatter in {filename}")
        return False
    
    fm = parse_frontmatter(fm_text)
    
    # Extract date from filename
    date_match = re.match(r'(\d{4}-\d{2}-\d{2})', filename)
    date = date_match.group(1) if date_match else fm.get('date', '2023-01-01')[:10]
    
    # Convert body
    body = convert_images(body)
    body = remove_ctas(body)
    body = body.strip()
    
    # Create new frontmatter
    new_fm = f"""---
title: {fm.get('title', 'Release Announcement')}
date: '{date}'
author: {fm.get('author', 'The Avni Team')}
description: {fm.get('description', '')}
type: blog
published: true
slug: {filename.replace('.md', '')}
category: Product Release
tags:
  - Product Release
featuredimage: {fm.get('featuredimage', '')}
---

"""
    
    new_content = new_fm + body
    
    with open(target_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ Migrated: {filename}")
    return True

# Migrate all release blogs
print("=" * 60)
print("Batch Migrating 2023 Release Announcements")
print("=" * 60)

migrated = 0
for blog in RELEASE_BLOGS:
    if migrate_blog(blog):
        migrated += 1

print("=" * 60)
print(f"Migration Complete: {migrated}/{len(RELEASE_BLOGS)} blogs migrated")
print("=" * 60)
