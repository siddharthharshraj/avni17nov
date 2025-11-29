#!/usr/bin/env python3
"""
Blog Synchronization Script
Syncs blogs from avni-website-master to avninew-v2
"""

import os
import re
import shutil
from pathlib import Path
from datetime import datetime

SOURCE_DIR = Path("/Users/samanvay/Desktop/avni-website-master/src/pages/blog")
TARGET_DIR = Path("/Users/samanvay/Documents/avninew-v2/content/blogs")
SOURCE_IMAGES = Path("/Users/samanvay/Desktop/avni-website-master/static/img")
TARGET_IMAGES = Path("/Users/samanvay/Documents/avninew-v2/public/img")

# Read the missing blogs list
with open('/tmp/missing_blogs.txt', 'r') as f:
    missing_blogs = [line.strip() for line in f if line.strip()]

print(f"Found {len(missing_blogs)} missing blogs to migrate")
print("=" * 60)

# Batch 1: Most recent blogs (2023-2025)
batch_1 = [b for b in missing_blogs if b.startswith(('2023-', '2024-', '2025-'))]
# Batch 2: 2022 blogs
batch_2 = [b for b in missing_blogs if b.startswith('2022-')]
# Batch 3: 2020-2021 blogs
batch_3 = [b for b in missing_blogs if b.startswith(('2020-', '2021-'))]

print(f"\nBatch 1 (2023-2025): {len(batch_1)} blogs")
print(f"Batch 2 (2022): {len(batch_2)} blogs")
print(f"Batch 3 (2020-2021): {len(batch_3)} blogs")
print("\nStarting with Batch 1 (most recent)...")
print("=" * 60)

def normalize_name(name):
    """Normalize filename for comparison"""
    # Remove date prefix, lowercase, normalize spaces
    normalized = re.sub(r'^\d{4}-\d{2}-\d{2}-', '', name)
    normalized = normalized.lower().replace(' ', '-')
    return normalized

def find_duplicate_in_target(source_file):
    """Check if this blog already exists with a different name"""
    source_normalized = normalize_name(source_file)
    
    for target_file in TARGET_DIR.glob('*.md'):
        target_normalized = normalize_name(target_file.name)
        if source_normalized == target_normalized and source_file != target_file.name:
            return target_file
    return None

# Process Batch 1
migrated = []
duplicates_found = []

for blog_file in batch_1[:10]:  # Start with first 10
    source_path = SOURCE_DIR / blog_file
    
    # Check for duplicates
    duplicate = find_duplicate_in_target(blog_file)
    if duplicate:
        duplicates_found.append((blog_file, duplicate.name))
        print(f"⚠️  DUPLICATE: {blog_file} exists as {duplicate.name}")
        continue
    
    if source_path.exists():
        migrated.append(blog_file)
        print(f"✓ Ready to migrate: {blog_file}")

print(f"\n{'=' * 60}")
print(f"Summary:")
print(f"  Ready to migrate: {len(migrated)}")
print(f"  Duplicates found: {len(duplicates_found)}")
print(f"\nDuplicates to handle:")
for src, tgt in duplicates_found:
    print(f"  {src} -> {tgt} (will rename target to match source)")
