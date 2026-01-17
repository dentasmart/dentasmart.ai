from PIL import Image, ImageOps, ImageDraw, ImageFilter

def create_hero_composite():
    # Load images
    # Note: Using the provided file paths. Adjust if necessary.
    try:
        hero_bg = Image.open("/home/ubuntu/dentasmart_website/client/public/images/backgrounds/how-it-works.jpg")
        app_screen = Image.open("/home/ubuntu/upload/pasted_file_LSoDKY_image.png")
    except FileNotFoundError as e:
        print(f"Error loading images: {e}")
        return

    # Resize hero background if needed (optional, but good for consistency)
    # Assuming hero_bg is large enough.
    
    # Process App Screen
    # 1. Resize to a reasonable size for the composition
    # The phone screen should be prominent but not overwhelming.
    # Let's say we want it to be about 40% of the hero height.
    target_height = int(hero_bg.height * 0.85)
    aspect_ratio = app_screen.width / app_screen.height
    target_width = int(target_height * aspect_ratio)
    
    app_screen_resized = app_screen.resize((target_width, target_height), Image.Resampling.LANCZOS)
    
    # 2. Create a mask for rounded corners (optional, if the screenshot is rectangular)
    # The provided image seems to be a phone frame, so we might not need to round it if it already has transparency.
    # If it's a screenshot without a frame, we might want to add a frame or round corners.
    # Looking at the user request "DentaSmart mobile screen in the hand of a guy smiling", 
    # but the provided image is just the screen/phone. 
    # The user said "all I need is attached DentaSmart mobile screen in the hand of a guy smiling .. both visible and faded"
    # This implies we need to overlay the phone onto the existing "guy smiling" image.
    
    # Position the phone
    # The guy is likely on the right or center. We should place the phone naturally.
    # If the guy is holding a phone in the original image, we should try to align it.
    # If not, we might just place it as a floating element or "in his hand" if possible.
    # Without seeing the "guy smiling" image perfectly, I'll place it on the right side where a hand might be,
    # or just prominently displayed.
    # Let's place it on the right side, slightly tilted for a natural look? 
    # Or just straight up as a clear UI showcase.
    # User said "both visible and faded". This might mean the background is faded?
    # Or the phone is semi-transparent? Unlikely for a UI showcase.
    # "both visible and faded" probably refers to the "guy smiling" (visible) and the overlay (faded/blended)?
    # OR "both visible" (guy and phone) and "faded" (the background/overlay effect).
    # Let's assume we need a clear composite.
    
    # Let's place the phone on the right side.
    # Calculate position: Bottom right or center right.
    x_pos = hero_bg.width - target_width - 100 # 100px padding from right
    y_pos = (hero_bg.height - target_height) // 2 # Vertically centered
    
    # Create a new image for the composite
    composite = hero_bg.copy()
    
    # Paste the phone
    # If the phone image has transparency, use it as mask.
    if app_screen_resized.mode == 'RGBA':
        composite.paste(app_screen_resized, (x_pos, y_pos), app_screen_resized)
    else:
        composite.paste(app_screen_resized, (x_pos, y_pos))
        
    # Save the result
    output_path = "/home/ubuntu/dentasmart_website/client/public/images/backgrounds/hero-how-it-works-composite.jpg"
    if composite.mode == 'RGBA':
        composite = composite.convert('RGB')
    composite.save(output_path, quality=95)
    print(f"Composite image saved to {output_path}")

if __name__ == "__main__":
    create_hero_composite()
