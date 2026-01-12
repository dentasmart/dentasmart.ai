from PIL import Image, ImageOps

def composite_images():
    # Load the base image (man holding phone)
    base_image_path = "/home/ubuntu/dentasmart_website/client/public/images/backgrounds/man-holding-phone.jpg"
    base_img = Image.open(base_image_path).convert("RGBA")

    # Load the app screenshot (using one of the available app images)
    # Based on the file list, 'dentasmart_app_preview.png' or 'ai-dental-insights-app.png' seem like good candidates.
    # I'll try 'dentasmart_app_preview.png' first as it sounds like the main preview.
    app_image_path = "/home/ubuntu/dentasmart_website/client/public/images/dentasmart_app_preview.png"
    try:
        app_img = Image.open(app_image_path).convert("RGBA")
    except FileNotFoundError:
        # Fallback to another likely candidate if the first one fails or isn't right
        app_image_path = "/home/ubuntu/dentasmart_website/client/public/images/ai-dental-insights-app.png"
        app_img = Image.open(app_image_path).convert("RGBA")

    # Resize app image to fit the phone screen area in the base image.
    # Since I don't have the exact coordinates of the screen in the generated image,
    # I will perform a simple overlay for now. 
    # In a real scenario, I would use perspective transform (homography) if the screen is tilted.
    # For this task, I'll assume the prompt "screen facing camera" gave us a relatively flat surface.
    
    # Let's estimate the phone screen area based on the description "prominent".
    # I'll resize the app image to be roughly 30% of the base image width.
    base_width, base_height = base_img.size
    target_width = int(base_width * 0.25) # Adjust scale as needed
    
    # Maintain aspect ratio of the app image
    aspect_ratio = app_img.height / app_img.width
    target_height = int(target_width * aspect_ratio)
    
    app_img_resized = app_img.resize((target_width, target_height), Image.Resampling.LANCZOS)
    
    # Position the app image. 
    # Since the man is holding it, I'll place it slightly to the left or center depending on the hand position.
    # Without seeing the image, I'll center it vertically and offset it horizontally.
    # A better approach is to let the user see the generated image first, but I need to automate this.
    # I will place it in a likely position for a "holding phone" shot.
    
    # For this specific task, since I cannot interactively click coordinates, 
    # I will save the base image first to let the user see it if needed, 
    # BUT the goal is to produce the final result.
    
    # actually, the prompt said "screen facing camera".
    # I will try to detect the green screen if possible, or just overlay it centrally.
    # Since I used a green screen prompt (#00FF00), I can try to replace the green color.
    
    datas = base_img.getdata()
    new_data = []
    
    # Simple green screen replacement (chroma key)
    # This is a naive implementation.
    # A better way is to find the bounding box of the green area.
    
    min_x, min_y = base_width, base_height
    max_x, max_y = 0, 0
    found_green = False
    
    for y in range(base_height):
        for x in range(base_width):
            r, g, b, a = base_img.getpixel((x, y))
            # Check for pure green or close to it
            if g > 200 and r < 100 and b < 100:
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                found_green = True
                
    if found_green:
        # Calculate dimensions of the green area
        screen_width = max_x - min_x
        screen_height = max_y - min_y
        
        # Resize app image to fit the green area exactly
        app_img_fitted = app_img.resize((screen_width, screen_height), Image.Resampling.LANCZOS)
        
        # Paste the app image onto the base image at the detected position
        base_img.paste(app_img_fitted, (min_x, min_y), app_img_fitted)
    else:
        # Fallback if no green screen detected (e.g. generation didn't produce perfect green)
        # Just paste it in the center-left
        x_pos = int(base_width * 0.3)
        y_pos = int(base_height * 0.3)
        base_img.paste(app_img_resized, (x_pos, y_pos), app_img_resized)

    # Save the result
    output_path = "/home/ubuntu/dentasmart_website/client/public/images/backgrounds/how-it-works-hero-composite.jpg"
    base_img = base_img.convert("RGB")
    base_img.save(output_path, quality=95)
    print(f"Composite image saved to {output_path}")

if __name__ == "__main__":
    composite_images()
