import os
from PIL import Image

# Configuration
INPUT_DIR = 'img/raw_logos'
OUTPUT_DIR = 'img/logos'
CANVAS_SIZE = (400, 200) 
Padding = 20 

def process_image(root, filename):
    input_path = os.path.join(root, filename)
    
    # Calculate relative path to maintain folder structure 
    relative_path = os.path.relpath(root, INPUT_DIR)
    output_folder = os.path.join(OUTPUT_DIR, relative_path)
    
    # Create output folder if not exists
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
        
    output_path = os.path.join(output_folder, filename)

    try:
        with Image.open(input_path) as img:
            img = img.convert("RGBA")
            
            # Calculate new size maintaining aspect ratio
            max_w = CANVAS_SIZE[0] - (Padding * 2)
            max_h = CANVAS_SIZE[1] - (Padding * 2)
            
            img.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
            
            # Create the transparent canvas
            canvas = Image.new('RGBA', CANVAS_SIZE, (255, 255, 255, 0))
            
            # Center the image on the canvas
            offset_x = (CANVAS_SIZE[0] - img.width) // 2
            offset_y = (CANVAS_SIZE[1] - img.height) // 2
            
            # Paste the image onto the canvas
            canvas.paste(img, (offset_x, offset_y), img)
            
            canvas.save(output_path, 'PNG', optimize=True)
            print(f"✔ Processed: {filename}")

    except Exception as e:
        print(f"❌ Error processing {filename}: {e}")

def main():
    print("Starting Logo Optimization...")
    
    if not os.path.exists(INPUT_DIR):
        print(f"Error: Directory '{INPUT_DIR}' not found.")
        return

    for root, dirs, files in os.walk(INPUT_DIR):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                process_image(root, file)
                
    print("Optimization Complete!")

if __name__ == "__main__":
    main()