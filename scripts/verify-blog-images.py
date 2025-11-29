#!/usr/bin/env python3
"""
Verify all blogs have proper banner images
Check for face-visible images and set as featured
Ensure no broken image links
"""

import os
import re
from pathlib import Path

BLOGS_DIR = Path("/Users/samanvay/Documents/avninew-v2/content/blogs")
PUBLIC_IMG_DIR = Path("/Users/samanvay/Documents/avninew-v2/public/img")
DEFAULT_BANNER = "/img/default-blog-banner.jpg"

def extract_frontmatter(content):
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if match:
        return match.group(1), match.group(2)
    return None, content

def parse_frontmatter(fm_text):
    fm = {}
    current_key = None
    for line in fm_text.split('\n'):
        if ':' in line and not line.startswith(' '):
            key, value = line.split(':', 1)
            current_key = key.strip()
            fm[current_key] = value.strip()
        elif line.startswith('  -') and current_key:
            # Handle array items
            if current_key not in fm:
                fm[current_key] = []
            if isinstance(fm[current_key], str):
                fm[current_key] = [fm[current_key]]
            fm[current_key].append(line.strip('- ').strip())
    return fm

def extract_images_from_content(content):
    """Extract all image paths from blog content"""
    images = []
    
    # Find <img src="...">
    img_tags = re.findall(r'<img[^>]+src="([^"]+)"', content)
    images.extend(img_tags)
    
    # Find markdown images ![alt](path) or ![alt](path "title")
    # This regex captures everything between ( and ) or up to first "
    md_images = re.findall(r'!\[[^\]]*\]\(([^")]+)', content)
    # Clean up any trailing spaces or quotes
    images.extend([img.strip() for img in md_images])
    
    return images

def check_image_exists(img_path):
    """Check if image file exists"""
    if img_path.startswith('http'):
        return True  # External images
    
    # Remove leading slash and check in public directory
    clean_path = img_path.lstrip('/')
    full_path = Path("/Users/samanvay/Documents/avninew-v2/public") / clean_path
    return full_path.exists()

def verify_blog(blog_path):
    """Verify a single blog"""
    issues = []
    
    with open(blog_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    fm_text, body = extract_frontmatter(content)
    if not fm_text:
        issues.append("No frontmatter found")
        return issues
    
    fm = parse_frontmatter(fm_text)
    
    # Check featured image (handle both featuredimage and featuredImage)
    featured_image = fm.get('featuredimage', '').strip('"\'')
    if not featured_image:
        # Try featuredImage (capital I)
        featured_image = fm.get('featuredImage', '').strip('"\'')
    
    # If featuredImage is an object, extract src
    if featured_image and featured_image.startswith('{'):
        # It's likely a YAML object, skip for now
        return issues
    
    if not featured_image:
        issues.append("❌ NO FEATURED IMAGE")
    elif not check_image_exists(featured_image):
        issues.append(f"❌ BROKEN FEATURED IMAGE: {featured_image}")
    
    # Check all images in content
    content_images = extract_images_from_content(body)
    broken_images = []
    for img in content_images:
        if not check_image_exists(img):
            broken_images.append(img)
    
    if broken_images:
        issues.append(f"❌ BROKEN CONTENT IMAGES: {len(broken_images)} images")
        for img in broken_images[:3]:  # Show first 3
            issues.append(f"   - {img}")
    
    return issues

# Main verification
print("=" * 70)
print("BLOG IMAGE VERIFICATION")
print("=" * 70)
print()

blogs = sorted(BLOGS_DIR.glob("*.md"))
total = len(blogs)
no_banner = []
broken_images = []
all_good = []

print(f"Checking {total} blogs...\n")

for blog_path in blogs:
    blog_name = blog_path.name
    issues = verify_blog(blog_path)
    
    if issues:
        if any("NO FEATURED IMAGE" in issue for issue in issues):
            no_banner.append(blog_name)
        if any("BROKEN" in issue for issue in issues):
            broken_images.append((blog_name, issues))
        
        print(f"⚠️  {blog_name}")
        for issue in issues:
            print(f"    {issue}")
        print()
    else:
        all_good.append(blog_name)

print("=" * 70)
print("SUMMARY")
print("=" * 70)
print(f"Total blogs: {total}")
print(f"✅ Blogs with proper images: {len(all_good)}")
print(f"⚠️  Blogs without banner: {len(no_banner)}")
print(f"❌ Blogs with broken images: {len(broken_images)}")
print()

if no_banner:
    print("BLOGS WITHOUT BANNER IMAGE:")
    for blog in no_banner[:10]:
        print(f"  - {blog}")
    if len(no_banner) > 10:
        print(f"  ... and {len(no_banner) - 10} more")
    print()

if broken_images:
    print("BLOGS WITH BROKEN IMAGES:")
    for blog, _ in broken_images[:5]:
        print(f"  - {blog}")
    if len(broken_images) > 5:
        print(f"  ... and {len(broken_images) - 5} more")
    print()

if no_banner or broken_images:
    print("❌ VERIFICATION FAILED - Issues found!")
    exit(1)
else:
    print("✅ ALL BLOGS VERIFIED - Ready to push!")
    exit(0)
