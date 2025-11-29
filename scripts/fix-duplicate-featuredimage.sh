#!/bin/bash

# Fix duplicate featuredimage keys in blog frontmatter
# Remove empty featuredimage: lines

cd /Users/samanvay/Documents/avninew-v2/content/blogs

for file in *.md; do
  # Check if file has duplicate featuredimage
  count=$(grep -c "^featuredimage:" "$file" 2>/dev/null || echo 0)
  
  if [ "$count" -gt 1 ]; then
    echo "Fixing: $file"
    # Remove lines that are exactly "featuredimage:" with nothing after
    sed -i '' '/^featuredimage:$/d' "$file"
  fi
done

echo "Done! Fixed duplicate featuredimage keys."
