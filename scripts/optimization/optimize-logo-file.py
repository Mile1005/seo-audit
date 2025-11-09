#!/usr/bin/env python3
"""
Optimize logo.png file size by resizing and compressing.
Reduces from 20.6 KiB (800x213) to ~3-4 KiB (256x68)
"""

from PIL import Image
import os

# Path to logo
logo_path = os.path.join(os.path.dirname(__file__), '../public/logo.png')
backup_path = os.path.join(os.path.dirname(__file__), '../public/logo-optimized-backup.png')

try:
    # Open original logo
    img = Image.open(logo_path)
    print(f"Original logo size: {img.size}, file size: {os.path.getsize(logo_path)} bytes")
    
    # Backup original
    if not os.path.exists(backup_path):
        img.save(backup_path)
        print(f"Backup created: {backup_path}")
    
    # Resize: from 800x213 to 256x68 (maintaining aspect ratio)
    # Max size displayed is 60px height on mobile, so 256px width is plenty
    img_resized = img.resize((256, 68), Image.Resampling.LANCZOS)
    
    # Save with aggressive compression (quality 75 for PNG equivalent)
    # PNG doesn't have quality parameter, but we can reduce bit depth
    img_resized = img_resized.convert('RGB').convert('P', palette=Image.Palette.ADAPTIVE, colors=256)
    img_resized.save(logo_path, 'PNG', optimize=True)
    
    new_size = os.path.getsize(logo_path)
    print(f"Optimized logo size: {img_resized.size}, file size: {new_size} bytes")
    print(f"Savings: {os.path.getsize(backup_path) - new_size} bytes ({100 * (1 - new_size/os.path.getsize(backup_path)):.1f}%)")
    print("✅ Logo optimized successfully!")
    
except Exception as e:
    print(f"❌ Error optimizing logo: {e}")
    print("Make sure Pillow is installed: pip install pillow")
