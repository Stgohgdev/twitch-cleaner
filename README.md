# Twitch Cleaner - Chrome Extension

🎯 **Twitch Cleaner** is a Chrome extension that allows users to customize their Twitch homepage by hiding distracting sections.

## ✅ Features

- Hide the **Showcase** section (autoplayed featured streams).
- Toggle **Minimal Mode** to hide sidebars and extra panels.
- Localized in **English** and **Spanish** based on browser language.

## 📦 File Structure

```
twitch-cleaner/
├── content.js
├── manifest.json
├── popup.html
├── popup.js
├── popup.css
├── styles.css (optional)
├── _locales/
│   ├── en/
│   │   └── messages.json
│   └── es/
│       └── messages.json
```

## 🚀 Installation for Local Testing

1. Clone or download this repository.
2. Open `chrome://extensions` in your browser.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the project folder.
5. Use the extension popup to toggle features.

## 🌐 Language Support

The extension auto-detects the browser language and displays labels accordingly. Supports:
- English (default)
- Spanish

## 🛠️ Contributions

Feel free to fork this repository and submit a pull request for suggestions or new features.

## 📄 License

[MIT](LICENSE)
