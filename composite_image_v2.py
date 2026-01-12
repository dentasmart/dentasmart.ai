from PIL import Image, ImageOps

def composite_images():
    # Load the base image (man holding phone)
    base_image_path = "/home/ubuntu/dentasmart_website/client/public/images/backgrounds/man-holding-phone.jpg"
    base_img = Image.open(base_image_path).convert("RGBA")

    # Load the NEW app screenshot
    app_image_path = "/home/ubuntu/dentasmart_website/client/public/images/dentasmart_app_screen_final.png"
    app_img = Image.open(app_image_path).convert("RGBA")

    # Detect green screen area
    base_width, base_height = base_img.size
    min_x, min_y = base_width, base_height
    max_x, max_y = 0, 0
    found_green = False
    
    # Scan for green pixels
    pixels = base_img.load()
    for y in range(base_height):
        for x in range(base_width):
            r, g, b, a = pixels[x, y]
            # Check for pure green or close to it (#00FF00)
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
        # We need to crop the app image to remove the phone frame if it exists in the screenshot
        # The user provided a screenshot that includes the phone frame (notch, etc.)
        # We should probably just resize it to fit.
        
        app_img_fitted = app_img.resize((screen_width, screen_height), Image.Resampling.LANCZOS)
        
        # Paste the app image onto the base image at the detected position
        base_img.paste(app_img_fitted, (min_x, min_y), app_img_fitted)
        print(f"Green screen detected. Pasting at {min_x},{min_y} with size {screen_width}x{screen_height}")
    else:
        # Fallback if no green screen detected
        print("No green screen detected. Using fallback positioning.")
        target_width = int(base_width * 0.25)
        aspect_ratio = app_img.height / app_img.width
        target_height = int(target_width * aspect_ratio)
        app_img_resized = app_img.resize((target_width, target_height), Image.Resampling.LANCZOS)
        
        x_pos = int(base_width * 0.3)
        y_pos = int(base_height * 0.3)
        base_img.paste(app_img_resized, (x_pos, y_pos), app_img_resized)

    # Save the result
    output_path = "/home/ubuntu/dentasmart_website/client/public/images/backgrounds/how-it-works-hero-composite-v2.jpg"
    base_img = base_img.convert("RGB")
    base_img.save(output_path, quality=95)
    print(f"Composite image saved to {output_path}")

if __name__ == "__main__":
    composite_images()
