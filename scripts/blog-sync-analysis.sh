#!/bin/bash

echo "=== Blog Synchronization Analysis ==="
echo ""

# Source (production)
SOURCE_DIR="/Users/samanvay/Desktop/avni-website-master/src/pages/blog"
# Target (new site)
TARGET_DIR="/Users/samanvay/Documents/avninew-v2/content/blogs"

echo "Source blogs (production): $(ls -1 "$SOURCE_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ')"
echo "Target blogs (avninew-v2): $(ls -1 "$TARGET_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ')"
echo ""

# Get basenames
cd "$SOURCE_DIR"
ls -1 *.md | sort > /tmp/source_blogs.txt

cd "$TARGET_DIR"
ls -1 *.md | sort > /tmp/target_blogs.txt

# Find missing blogs (in source but not in target)
echo "=== Missing Blogs (need to be added) ==="
comm -23 /tmp/source_blogs.txt /tmp/target_blogs.txt | tee /tmp/missing_blogs.txt
echo ""

# Find extra blogs (in target but not in source)
echo "=== Extra Blogs (may need to be removed or are new) ==="
comm -13 /tmp/source_blogs.txt /tmp/target_blogs.txt | tee /tmp/extra_blogs.txt
echo ""

# Find common blogs
echo "=== Common Blogs (exist in both) ==="
comm -12 /tmp/source_blogs.txt /tmp/target_blogs.txt | wc -l | tr -d ' '
echo ""

echo "Analysis complete!"
echo "Missing count: $(wc -l < /tmp/missing_blogs.txt | tr -d ' ')"
echo "Extra count: $(wc -l < /tmp/extra_blogs.txt | tr -d ' ')"
