#!/bin/bash

# This script identifies duplicate blogs by comparing slugs/dates
# regardless of filename differences

SOURCE_DIR="/Users/samanvay/Desktop/avni-website-master/src/pages/blog"
TARGET_DIR="/Users/samanvay/Documents/avninew-v2/content/blogs"

echo "=== Identifying Duplicate Blogs ==="
echo ""

# Create a mapping of normalized names
declare -A source_normalized
declare -A target_normalized

# Process source files
for file in "$SOURCE_DIR"/*.md; do
    basename=$(basename "$file")
    # Normalize: remove dates, convert to lowercase, remove spaces
    normalized=$(echo "$basename" | sed 's/^[0-9-]*-//' | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
    source_normalized["$normalized"]="$basename"
done

# Process target files
for file in "$TARGET_DIR"/*.md; do
    basename=$(basename "$file")
    normalized=$(echo "$basename" | sed 's/^[0-9-]*-//' | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
    target_normalized["$normalized"]="$basename"
done

# Find potential duplicates
echo "Potential duplicates (same content, different filenames):"
for key in "${!source_normalized[@]}"; do
    if [[ -n "${target_normalized[$key]}" ]]; then
        source_file="${source_normalized[$key]}"
        target_file="${target_normalized[$key]}"
        if [[ "$source_file" != "$target_file" ]]; then
            echo "  Source: $source_file"
            echo "  Target: $target_file"
            echo "  -> Keep source version"
            echo ""
        fi
    fi
done
