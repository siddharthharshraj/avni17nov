#!/usr/bin/env python3
"""
Batch migrate 2020-2022 release announcement blogs
"""

import os
import re
from pathlib import Path

SOURCE_DIR = Path("/Users/samanvay/Desktop/avni-website-master/src/pages/blog")
TARGET_DIR = Path("/Users/samanvay/Documents/avninew-v2/content/blogs")

# List of 2020-2022 release announcements
BLOGS_TO_MIGRATE = [
    "2020-05-25-avni-cloud-annoucement.md",
    "2020-05-29-avni-release-announcement.md",
    "2021-02-03-avni-release-announcement.md",
    "2021-03-04-avni-release-announcement.md",
    "2021-05-10-avni-release-announcement.md",
    "2021-06-07-avni-release-announcement.md",
    "2021-07-01-avni-release-announcement.md",
    "2021-07-26-avni-release-announcement.md",
    "2021-09-24-avni-release-announcement.md",
    "2021-11-04-avni-release-announcement.md",
    "2021-11-30-avni-release-announcement.md",
    "2022-02-02-avni-release-announcement.md",
    "2022-03-01-avni-release-announcement.md",
    "2022-03-17-avni-release-announcement.md",
    "2022-05-04-avni-release-announcement.md",
    "2022-05-30-avni-release-announcement.md",
    "2022-07-13-avni-release-announcement.md",
    "2022-09-02-avni-release-announcement.md",
    "2022-09-30-avni-release-announcement.md",
    "2022-10-20-avni-release-announcement copy.md",
]

def extract_frontmatter(content):
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if match:
        return match.group(1), match.group(2)
    return None, content

def parse_frontmatter(fm_text):
    fm = {}
    for line in fm_text.split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            fm[key.strip()] = value.strip()
    return fm

def convert_images(content):
    # Convert div-wrapped images to figure
    content = re.sub(
        r'<div[^>]*>\s*<img src="([^"]+)"[^>]*>\s*</div>',
        r'<figure>\n  <img src="\1" alt="" />\n</figure>',
        content
    )
    # Convert standalone img
    content = re.sub(
        r'<img src="([^"]+)"[^>]*/>',
        r'<figure>\n  <img src="\1" alt="" />\n</figure>',
        content
    )
    return content

def remove_ctas(content):
    # Remove Discord/Skype/community links
    content = re.sub(r'.*[Dd]iscord.*\n?', '', content)
    content = re.sub(r'.*[Ss]kype.*\n?', '', content)
    content = re.sub(r'.*schedule.*demo.*\n?', '', content, flags=re.IGNORECASE)
    content = re.sub(r'.*newsletter.*\n?', '', content, flags=re.IGNORECASE)
    content = re.sub(r'###?\s*💬.*\n.*\n.*\n', '', content)
    content = re.sub(r'###?\s*Share Feedback.*\n.*\n.*\n', '', content)
    return content

def migrate_blog(filename):
    source_path = SOURCE_DIR / filename
    target_path = TARGET_DIR / filename
    
    if target_path.exists():
        print(f"⚠️  SKIP: {filename} already exists")
        return False
    
    if not source_path.exists():
        print(f"❌ ERROR: Source not found: {filename}")
        return False
    
    with open(source_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    fm_text, body = extract_frontmatter(content)
    if not fm_text:
        print(f"❌ ERROR: No frontmatter in {filename}")
        return False
    
    fm = parse_frontmatter(fm_text)
    
    # Extract date
    date_match = re.match(r'(\d{4}-\d{2}-\d{2})', filename)
    date = date_match.group(1) if date_match else '2020-01-01'
    
    # Convert body
    body = convert_images(body)
    body = remove_ctas(body)
    body = body.strip()
    
    # Create new frontmatter
    title = fm.get('title', 'Release Announcement').strip('"\'')
    author = fm.get('author', 'The Avni Team').strip('"\'')
    description = fm.get('description', '').strip('"\'')
    
    new_fm = f"""---
title: {title}
date: '{date}'
author: {author}
description: {description}
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

# Main execution
print("=" * 60)
print("Batch Migrating 2020-2022 Release Announcements")
print("=" * 60)

migrated = 0
for blog in BLOGS_TO_MIGRATE:
    if migrate_blog(blog):
        migrated += 1

print("=" * 60)
print(f"Migration Complete: {migrated}/{len(BLOGS_TO_MIGRATE)} blogs migrated")
print("=" * 60)
