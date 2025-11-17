#!/bin/bash

# Case Study Migration Verification Script
# This script verifies all case studies and their associated images exist

echo "=========================================="
echo "Case Study Migration Verification"
echo "=========================================="
echo ""

SOURCE_DIR="/Users/samanvay/Downloads/avni-website-master"
CASE_STUDIES_DIR="$SOURCE_DIR/src/pages/case-studies"
IMAGES_DIR="$SOURCE_DIR/static/img"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
total_case_studies=0
total_images=0
missing_images=0

echo "📁 Source Directory: $SOURCE_DIR"
echo "📄 Case Studies Directory: $CASE_STUDIES_DIR"
echo "🖼️  Images Directory: $IMAGES_DIR"
echo ""

# Check if directories exist
if [ ! -d "$CASE_STUDIES_DIR" ]; then
    echo -e "${RED}❌ Case studies directory not found!${NC}"
    exit 1
fi

if [ ! -d "$IMAGES_DIR" ]; then
    echo -e "${RED}❌ Images directory not found!${NC}"
    exit 1
fi

echo "✅ Directories found"
echo ""

# Count case studies
echo "📊 Counting case studies..."
case_study_files=$(find "$CASE_STUDIES_DIR" -name "*.md" -not -name "index.md" | sort)
total_case_studies=$(echo "$case_study_files" | wc -l | tr -d ' ')

echo -e "${GREEN}Found $total_case_studies case study files${NC}"
echo ""

# List all case studies
echo "📋 Case Study Files:"
echo "-------------------"
echo "$case_study_files" | while read file; do
    basename "$file"
done
echo ""

# Check for image folders
echo "🖼️  Checking for image folders..."
echo "--------------------------------"

# Common case study image folder patterns
image_folders=$(find "$IMAGES_DIR" -type d -maxdepth 1 | grep -E "(case-study|case_study|Project-Potential|goonj|covid-mis|jnpct)" | sort)

if [ -z "$image_folders" ]; then
    echo -e "${YELLOW}⚠️  No case study image folders found with common patterns${NC}"
else
    echo "$image_folders" | while read folder; do
        folder_name=$(basename "$folder")
        image_count=$(find "$folder" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" -o -name "*.gif" \) | wc -l | tr -d ' ')
        echo -e "${GREEN}✓${NC} $folder_name ($image_count images)"
        total_images=$((total_images + image_count))
    done
fi
echo ""

# Check each case study for image references
echo "🔍 Checking image references in markdown files..."
echo "------------------------------------------------"

echo "$case_study_files" | while read file; do
    filename=$(basename "$file")
    echo ""
    echo "Checking: $filename"
    
    # Extract image references from markdown
    image_refs=$(grep -oE '(src="|!\[.*\]\().*\.(jpg|jpeg|png|webp|gif|svg)' "$file" 2>/dev/null | sed 's/src="//g; s/!\[.*\](//g' | sed 's/".*//g')
    
    if [ -z "$image_refs" ]; then
        echo -e "  ${YELLOW}⚠️  No images referenced${NC}"
    else
        ref_count=$(echo "$image_refs" | wc -l | tr -d ' ')
        echo -e "  Found $ref_count image reference(s):"
        
        echo "$image_refs" | while read img_path; do
            # Check if image exists
            full_path="$SOURCE_DIR/static$img_path"
            if [ -f "$full_path" ]; then
                echo -e "  ${GREEN}✓${NC} $img_path"
            else
                echo -e "  ${RED}✗${NC} $img_path (MISSING)"
                missing_images=$((missing_images + 1))
            fi
        done
    fi
done

echo ""
echo "=========================================="
echo "📊 Summary"
echo "=========================================="
echo "Total Case Studies: $total_case_studies"
echo "Total Image Folders Found: $(echo "$image_folders" | wc -l | tr -d ' ')"
echo ""

if [ $missing_images -eq 0 ]; then
    echo -e "${GREEN}✅ All images verified - Ready for migration!${NC}"
else
    echo -e "${RED}⚠️  $missing_images missing image(s) found${NC}"
    echo "Review the output above for details"
fi

echo ""
echo "=========================================="
echo "Next Steps:"
echo "1. Review this output"
echo "2. Fix any missing images"
echo "3. Run migration script"
echo "=========================================="
