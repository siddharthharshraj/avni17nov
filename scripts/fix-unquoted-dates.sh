#!/bin/bash

# Fix unquoted dates in blog frontmatter
# Add quotes around date values

cd /Users/samanvay/Documents/avninew-v2/content/blogs

for file in *.md; do
  # Check if file has unquoted date (date: YYYY-MM-DD without quotes)
  if grep -q "^date: [0-9]" "$file"; then
    echo "Fixing: $file"
    # Add quotes around date value
    sed -i '' 's/^date: \([0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]\)/date: '\''\1'\''/' "$file"
  fi
done

echo "Done! Fixed unquoted dates."
