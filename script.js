import { BrowserMultiFormatReader } from '@zxing/library';

const codeReader = new BrowserMultiFormatReader();
const scanBtn = document.getElementById('scanBtn');
const video = document.getElementById('video');

scanBtn.addEventListener('click', () => {
    codeReader.decodeFromVideoDevice(null, video, (result, err) => {
        if (result) {
            window.location.href = result.text;  // Redirects to scanned URL
        }
    });
    video.style.display = 'block';
});