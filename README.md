# FaydaLink | Digital ID Directory

**FaydaLink** is an open-source, community-driven directory designed to help Ethiopians securely find the direct links to connect their **Fayda ID** with banks, telecom providers, and other essential services.

🔗 **Live Demo:** [faydalink.vercel.app](https://faydalink.vercel.app) 

---

## ✨ Features

*   **🔍 Instant Search:** Filter providers by name immediately.
*   **📂 Categorized:** Separate tabs for Banks, Education, etc.
*   **⚡ Lightweight:** No backend database. Loads data from static JSON files.
*   **🤖 Automated Assets:** Python scripts automatically standardize logo sizes.

---

## 🛠 Tech Stack

*   **Core:** HTML5, CSS3, JavaScript (ES6+)
*   **Framework:** Bootstrap 5.3
*   **Icons:** Bootstrap Icons
*   **Animations:** Animate.css
*   **Automation:** Python (Pillow) & GitHub Actions for image processing.

---

## 🤝 Contribution Guide

We welcome contributions! If you notice a missing bank, a broken link, or want to add a new category, follow these steps.

### 1. Adding a New Bank/Provider

To add a new item (e.g., a new Bank), you need two things: the **Logo** and the **Data Entry**.

#### A. The Logo
**Do not** resize the logo manually. We have an automated script for that.
1.  Find a high-quality logo (preferably PNG with transparency).
2.  Place the original file in the **`raw_logos/`** folder.
    *   *Example:* `raw_logos/banks/bank_name.png`
3.  **Do not** put it in `img/logos/`. The system will do that automatically when you push.

#### B. The Data
1.  Open the relevant file in the `data/` folder (e.g., `data/banks.json`).
2.  Add a new object to the array using this structure:

```json
{
  "id": "unique-id",
  "name": "Bank Name",
  "category": "bank",
  "logo": "banks/filename.png", 
  "url": "https://official-link-to-fayda-page"
}
```
> **Note:** The `logo` path in JSON should match the path inside `img/logos/` (which mirrors your folder structure in `raw_logos/`).

### 2. Image Requirements

*   **Format:** `.png` (Preferred for transparency) or `.jpg`.
*   **Background:** Transparent background is highly recommended, but incase a transparent version is not available, a non-distracting solid background is acceptable.
*   **Dimensions:**
    *   We use a Python script to standardize all logos to a **2:1 Aspect Ratio canvas** (centered).
    *   Just provide the highest resolution available. The script handles the rest.

### 3. Adding a New Category (e.g., Insurance)

1.  Create a new JSON file: `data/insurance.json`.
2.  Add your data (see structure above).
3.  Update **`js/main.js`**:
    ```javascript
    const DATA_SOURCES = {
        'bank': 'banks.json',
        'education': 'education.json',
        'insurance': 'insurance.json' // <-- Add this line
    };
    ```
4.  Update **`index.html`** to add the button:
    ```html
    <button class="btn btn-glass-tab" data-category="insurance">
        <i class="bi bi-shield-check me-2"></i> Insurance
    </button>
    ```
    * The Insurance button is already included in **`index.html`** marked as soon, just remove the disabled attribute when ready.

---

## 💻 Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/faydalink.git
    cd faydalink
    ```

2.  **Run the project:**
    Since this is a static site, you can use any simple server.
    *   **VS Code:** Use "Live Server" extension.
    *   **Python:**
        ```bash
        python -m http.server
        ```
---

## 📂 Project Structure

```text
/
├── data/                 # JSON files containing link data
│   ├── banks.json
│   └── education.json
├── img/
│   ├── logos/            # OPTIMIZED logos (Do not edit directly)
│   └── favicon/
├── raw_logos/            # ORIGINAL logos (Put new images here)
├── js/
│   └── main.js           # Logic for loading data & filtering
├── scripts/
│   └── optimize_images.py # Python script for resizing logos
├── index.html
├── style.css
└── README.md
```

---

## ⚠️ Disclaimer

**FaydaLink** is a community project and is **not** officially affiliated with NID (National ID Program) or any of the listed service providers.

*   All links are provided "as is" for convenience.
*   We do not collect or store any user data.
*   **Always verify** the URL in your browser before entering personal information.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

Made with ❤️ for Ethiopia 🇪🇹