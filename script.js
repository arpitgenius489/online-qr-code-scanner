const video = document.getElementById('video');
const scanBtn = document.getElementById('scanBtn');
const canvas = document.getElementById('canvas');
const output = document.getElementById('output');
const ctx = canvas.getContext('2d');

scanBtn.addEventListener('click', startScanning);

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
            
            if (code.data.startsWith('http')) {
                window.open(code.data, '_blank');
            }
            output.textContent = `Detected QR Code: ${code.data}`;
            return;
        }
    }
    requestAnimationFrame(scan);
}
