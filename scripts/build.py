import os
import shutil
from PIL import Image

SRC_DIR = 'src'
DIST_DIR = 'dist'
LOGOS_SRC_DIR = os.path.join(SRC_DIR, 'img', 'logos')
LOGOS_DIST_DIR = os.path.join(DIST_DIR, 'img', 'logos')

CANVAS_SIZE = (400, 200)
PADDING = 20

def clean_and_copy_static():
    if os.path.exists(DIST_DIR):
        shutil.rmtree(DIST_DIR)
    os.makedirs(DIST_DIR, exist_ok=True)

    # Copy all files & folders from src/ except the raw logos directory
    for item in os.listdir(SRC_DIR):
        src_path = os.path.join(SRC_DIR, item)
        dist_path = os.path.join(DIST_DIR, item)

        if item == 'img':
            shutil.copytree(src_path, dist_path, ignore=shutil.ignore_patterns('logos'))
        elif os.path.isdir(src_path):
            shutil.copytree(src_path, dist_path)
        else:
            shutil.copy2(src_path, dist_path)

    print("✔ Static assets copied to dist/")

def optimize_logos():
    if not os.path.exists(LOGOS_SRC_DIR):
        print(f"Warning: '{LOGOS_SRC_DIR}' not found. No logos were processed.")
        return

    os.makedirs(LOGOS_DIST_DIR, exist_ok=True)
    processed = 0

    for root, _, files in os.walk(LOGOS_SRC_DIR):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                input_path = os.path.join(root, file)
                rel_dir = os.path.relpath(root, LOGOS_SRC_DIR)
                target_dir = os.path.join(LOGOS_DIST_DIR, rel_dir)
                os.makedirs(target_dir, exist_ok=True)

                filename_base = os.path.splitext(file)[0]
                output_path = os.path.join(target_dir, f"{filename_base}.png")

                try:
                    with Image.open(input_path) as img:
                        img = img.convert("RGBA")
                        max_w = CANVAS_SIZE[0] - (PADDING * 2)
                        max_h = CANVAS_SIZE[1] - (PADDING * 2)
                        img.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)

                        canvas = Image.new("RGBA", CANVAS_SIZE, (255, 255, 255, 0))
                        offset_x = (CANVAS_SIZE[0] - img.width) // 2
                        offset_y = (CANVAS_SIZE[1] - img.height) // 2
                        canvas.paste(img, (offset_x, offset_y), img)

                        canvas.save(output_path, "PNG", optimize=True)
                        processed += 1
                except Exception as e:
                    print(f"Error processing {file}: {e}")

    print(f"Optimized {processed} logos into dist/img/logos/")

if __name__ == '__main__':
    print("Starting FaydaLink build...")
    clean_and_copy_static()
    optimize_logos()
    print("Build complete! Output ready in dist/")