# QR Scanner - 20-Minute Implementation Plan

## 📌 Overview
A minimal QR code scanner that:
- Opens the camera
- Scans a QR code
- Redirects the user to the scanned URL automatically

## ⏳ Execution Steps (20 Minutes)

### **1️⃣ Create GitHub Repository (2 min)**
- Go to GitHub and create a new repo: `qr-scanner`
- Initialize with `README.md`
- Clone the repo to local machine

```sh
# Example:
git clone https://github.com/yourusername/qr-scanner.git
cd qr-scanner
```

### **2️⃣ Set Up Basic HTML Page (3 min)**
- Create `index.html`
- Add a button: **"Scan QR Code"**
- Link basic Tailwind CSS for styling (CDN)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Scanner</title>
    <script defer src="script.js"></script>
</head>
<body>
    <button id="scanBtn">Scan QR Code</button>
    <video id="video" style="display: none;"></video>
</body>
</html>
```

### **3️⃣ Integrate Camera & QR Scanning (7 min)**
- Use `zxing-js/browser` for fast QR scanning
- Open the camera, detect QR, and redirect

```js
import { BrowserMultiFormatReader } from '@zxing/library';

const codeReader = new BrowserMultiFormatReader();
const scanBtn = document.getElementById('scanBtn');
const video = document.getElementById('video');

scanBtn.addEventListener('click', () => {
    codeReader.decodeFromVideoDevice(null, video, (result, err) => {
        if (result) {
            window.location.href = result.text;
        }
    });
    video.style.display = 'block';
});
```

### **4️⃣ Test on Devices (3 min)**
- Open `index.html` in a browser
- Test on mobile and desktop

### **5️⃣ Deploy on Vercel/Netlify (5 min)**
```sh
# Deploy with Vercel
vercel deploy
