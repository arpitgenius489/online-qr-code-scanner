const video = document.getElementById('video');
const scanBtn = document.getElementById('scanBtn');
const canvas = document.getElementById('canvas');
const output = document.getElementById('output');
const qrContent = document.getElementById('qrContent');
const generateBtn = document.getElementById('generateBtn');
const generatedQRCode = document.getElementById('generatedQRCode');
const fileInput = document.getElementById('fileInput');
const autoOpenLink = document.getElementById('autoOpenLink');
const enableShortcuts = document.getElementById('enableShortcuts');
const ctx = canvas.getContext('2d');

// Ensure QRCode library is loaded
if (typeof QRCode === 'undefined') {
    console.error('QRCode library is not loaded. Please include it in your project.');
}

// Start scanning when the scan button is clicked
scanBtn.addEventListener('click', startScanning);

// Generate QR Code when the generate button is clicked
generateBtn.addEventListener('click', generateQRCode);

// Handle file upload
fileInput.addEventListener('change', handleFileUpload);

// Handle keyboard shortcuts
document.addEventListener('keydown', handleShortcuts);

async function startScanning() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        video.srcObject = stream;
        video.style.display = 'block';
        video.play();
        requestAnimationFrame(scan);
    } catch (err) {
        console.error('Error accessing camera:', err);
        output.textContent = 'Error accessing camera. Please make sure you have given camera permissions.';
    }
}

function scan() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code) {
            video.style.display = 'none';
            video.srcObject.getTracks().forEach(track => track.stop());
            
qrContent.value = code.data;
            output.textContent = `Detected QR Code: ${code.data}`;
            
            if (autoOpenLink.checked && code.data.startsWith('http')) {
                window.open(code.data, '_blank');
            }
                        return;
        }
    }
    requestAnimationFrame(scan);
}

function generateQRCode() {
    const content = qrContent.value.trim();
    if (!content) {
        alert('Please enter some content to generate a QR Code.');
        return;
    }

    // Clear any existing QR Code
    generatedQRCode.innerHTML = '';

    // Generate QR Code
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

function handleFileUpload(event) {
    const file = event.target.files[0];
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
                output.textContent = `Detected QR Code: ${code.data}`;
                if (autoOpenLink.checked && code.data.startsWith('http')) {
                    window.open(code.data, '_blank');
                }
            } else {
                output.textContent = 'No QR Code detected in the uploaded image.';
            }
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
}

function handleShortcuts(event) {
    if (!enableShortcuts.checked) return;

    if (event.altKey && event.key === 's') {
        event.preventDefault();
        startScanning();
    } else if (event.altKey && event.key === 'g') {
        event.preventDefault();
        generateQRCode();
    }
}
