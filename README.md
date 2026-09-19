# FaydaLink

**FaydaLink** is an open-source, community-driven directory designed to help Ethiopians securely find the direct links to connect their **Fayda ID** with banks, mobile wallets, and other essential services.

🔗 **Live Site:** [faydalink.vercel.app](https://faydalink.vercel.app)

---

## Overview

- Zero PII: No user data, session information, or credentials are collected or stored.
- Fully Static: Operates on partitioned static JSON files without a backend database.
- Deployment Build Pipeline: Third-party logos are normalized to a consistent 400x200 (2:1 aspect ratio) transparent canvas during build time.

---

## 🛠 Tech Stack

- **Core:** Vanilla JavaScript (ES6+), HTML5, CSS3
- **Styling:** Bootstrap 5.3, Bootstrap Icons
- **Animations:** Animate.css
- **Build & Optimization:** Python (Pillow) for image processing.

---

## Project Structure

```text
├── scripts/
│   └── build.py           # Compiles static files and optimizes logos into dist/
├── src/
│   ├── css/
│   ├── data/              # Data files (banks.json, wallets.json, services.json)
│   ├── img/
│   │   ├── favicon/
│   │   ├── og/
│   │   └── logos/         # Source logos (PNG format only)
│   ├── js/
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
├── dist/                  # Production build output (git-ignored)
├── requirements.txt
└── vercel.json
```

---

## Contributing

Contributions to add missing institutions or fix broken URLs are welcome.

### 1. Adding a Provider

Every entry requires two things: a logo file and an entry in the matching JSON file.

#### A. Logo Requirements

- Format: PNG with a transparent background.
- Dimensions: High-resolution source. The build script automatically scales and pads the image onto a 400x200 canvas.
- Location: Place the PNG inside `src/img/logos/{category}/` (e.g., `src/img/logos/banks/example.png`).

#### B. Data Entry

Open the relevant JSON file in `src/data/` (`banks.json`, `wallets.json`, or `services.json`) and append the record:

```json
{ "id": "example", "name": "Example Institution", "type": "Commercial Bank", "category": "bank", "logo": "banks/example.png", "url": "https://official-fayda-linking-url" }
```

_Note: The `logo` value must end in `.png` and mirror the folder path inside `src/img/logos/`. Set `category` to `"bank"`, `"wallets"`, or `"services"` to match the destination file._

---

## Local Development

1. Clone the repository:

    ```bash
    git clone https://github.com/motiabebe/FaydaLink.git
    cd FaydaLink
    ```

2. Install Python dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Build the project:

    ```bash
    python scripts/build.py
    ```

    This generates the `dist/` directory with all compiled assets and normalized logos.

4. Run a local server:

    ```bash
    python -m http.server -d dist 8000
    ```

    Visit `http://localhost:8000` in your browser.

---

## ⚠️ Disclaimer

**FaydaLink** is a community project and is **not** officially affiliated with NID (National ID Program) or any of the listed service providers.

- All links are provided "as is" for convenience.
- We do not collect or store any user data.
- **Always verify** the URL in your browser before entering personal information.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

Made with ❤️ for Ethiopia 🇪🇹
