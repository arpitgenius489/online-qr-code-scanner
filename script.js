// DOM Elements
const video = document.getElementById('video');
const scanBtn = document.getElementById('scanBtn');
const cameraSource = document.getElementById('cameraSource');
const qrContent = document.getElementById('qrContent');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const editBtn = document.getElementById('editBtn');
const generateBtn = document.getElementById('generateBtn');
const generatedQRCode = document.getElementById('generatedQRCode');
const autoOpenLink = document.getElementById('autoOpenLink');
const enableShortcuts = document.getElementById('enableShortcuts');

let scanning = false;

// Event Listeners
scanBtn.addEventListener('click', toggleScanning);
uploadBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileUpload);
editBtn.addEventListener('click', enableEditing);
generateBtn.addEventListener('click', generateQRCode);
document.addEventListener('keydown', handleShortcuts);

// Function: Toggle Scanning
async function toggleScanning() {
    if (scanning) {
        stopScanning();
    } else {
        await startScanning();
    }
}

// Function: Start Scanning QR Code Using Camera
async function startScanning() {
    try {
        scanning = true;
        scanBtn.textContent = '🛑 Stop Scanning';
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        cameraSource.innerHTML = videoDevices.map(device => `<option value="${device.deviceId}">${device.label}</option>`).join('');
        cameraSource.classList.remove('hidden');

        const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: cameraSource.value || undefined, facingMode: "environment" }
        });
        video.srcObject = stream;
        video.style.display = 'block';
        video.play();
        requestAnimationFrame(scan);
    } catch (err) {
        console.error('Error accessing camera:', err);
        alert('Error accessing camera. Please make sure you have given camera permissions.');
    }
}

// Function: Stop Scanning
function stopScanning() {
    scanning = false;
    scanBtn.textContent = '📷 Start Scanning';
    video.style.display = 'none';
    if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
    }
}

// Function: Scan QR Code from Camera Feed
function scan() {
    if (!scanning) return;

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
            stopScanning();
            qrContent.value = code.data;
            qrContent.setAttribute('readonly', true);
            editBtn.classList.add('visible');
            if (autoOpenLink.checked && code.data.startsWith('http')) {
                window.open(code.data, '_blank');
            }
            return;
        }
    }
    requestAnimationFrame(scan);
}

// Function: Handle File Upload
function handleFileUpload() {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
        const img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                qrContent.value = code.data;
                editBtn.classList.remove('hidden');
            } else {
                alert('No QR Code or Barcode detected in the uploaded image.');
            }
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
}

// Function: Enable Editing
function enableEditing() {
    qrContent.removeAttribute('readonly');
    qrContent.classList.remove('bg-gray-100');
    generateBtn.classList.remove('hidden');
}

// Function: Generate QR Code
function generateQRCode() {
    const content = qrContent.value.trim();
    if (!content) {
        alert('Please enter some content to generate a QR Code.');
        return;
    }

    generatedQRCode.innerHTML = '';
    const qrCanvas = document.createElement('canvas');
    QRCode.toCanvas(qrCanvas, content, function (error) {
        if (error) {
            console.error('Error generating QR Code:', error);
            alert('Failed to generate QR Code.');
        } else {
            generatedQRCode.appendChild(qrCanvas);
        }
    });
}

// Function: Handle Keyboard Shortcuts
function handleShortcuts(event) {
    if (!enableShortcuts.checked) return;

    if (event.altKey && event.key === 's') {
        event.preventDefault();
        toggleScanning();
    } else if (event.altKey && event.key === 'g') {
        event.preventDefault();
        generateQRCode();
    }
}
