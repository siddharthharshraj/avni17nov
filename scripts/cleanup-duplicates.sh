#!/bin/bash

# Cleanup duplicate blog files (without date prefix that have dated versions)
cd /Users/samanvay/Documents/avninew-v2/content/blogs

echo "=== Cleaning up duplicate blog files ==="
echo ""

# List of duplicates to remove (files without dates that have dated versions)
DUPLICATES=(
    "avni-cloud-annoucement.md"
    "avni-conference-goa-day-1.md"
    "avni-conference-goa-day-2.md"
    "avni-conference-goa-day-3.md"
    "avni-release-3.39.0.md"
    "avni-release-4.0.0.md"
    "avni-release-announcement.md"
    "avni-release-announcement copy.md"
    "avni-sprint-udaipur-blog-by-taqi.md"
    "avni-sprint-udaipur-blog.md"
    "avni-sprint-udaipur-day-2.md"
    "case-for-generic-open-source-products.md"
    "community-health-service-programs-and-avni.md"
    "field-visit-jnpct.md"
    "field-visit-rejuvenating-water-bodies.md"
    "field-visit-sewa-rural-adolescent-and-sncu.md"
    "savethechildren-golive.md"
    "udaipur-sprint-nupoor.md"
    "ywnxt-project-update-1.md"
)

removed=0
for file in "${DUPLICATES[@]}"; do
    if [ -f "$file" ]; then
        echo "Removing duplicate: $file"
        rm "$file"
        ((removed++))
    fi
done

echo ""
echo "=== Cleanup Complete ==="
echo "Removed $removed duplicate files"
echo ""
echo "Remaining blogs:"
ls -1 *.md | wc -l
