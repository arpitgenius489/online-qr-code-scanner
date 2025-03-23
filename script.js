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

// Add the header dynamically to the DOM
document.addEventListener('DOMContentLoaded', () => {
    const header = document.createElement('header');
    header.className = 'flex justify-between items-center px-6 py-4 bg-gray-800 text-white shadow-md';

    // Logo
    const logo = document.createElement('div');
    logo.className = 'text-xl font-bold';
    logo.textContent = 'QR Scanner';
    header.appendChild(logo);

    // Navigation Links
    const nav = document.createElement('nav');
    nav.className = 'hidden md:flex space-x-6';
    const links = ['Home', 'Features', 'Pricing', 'Contact'];
    links.forEach(linkText => {
        const link = document.createElement('a');
        link.href = `#${linkText.toLowerCase()}`;
        link.className = 'hover:text-gray-400';
        link.textContent = linkText;
        nav.appendChild(link);
    });
    header.appendChild(nav);

    // Call-to-Action Button
    const ctaButton = document.createElement('button');
    ctaButton.className = 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md';
    ctaButton.textContent = 'Get Started';
    header.appendChild(ctaButton);

    // Mobile Menu Button
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'md:hidden text-white';
    mobileMenuButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>';
    header.appendChild(mobileMenuButton);

    // Mobile Menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'md:hidden flex flex-col space-y-4 mt-4 hidden';
    links.forEach(linkText => {
        const link = document.createElement('a');
        link.href = `#${linkText.toLowerCase()}`;
        link.className = 'hover:text-gray-400';
        link.textContent = linkText;
        mobileMenu.appendChild(link);
    });
    header.appendChild(mobileMenu);

    // Toggle Mobile Menu
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Insert Header into the DOM
    document.body.insertBefore(header, document.body.firstChild);
});

// Add the footer dynamically to the DOM
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.createElement('footer');
    footer.className = 'bg-gray-800 text-white py-6 mt-8';

    // Footer Links
    const linksContainer = document.createElement('div');
    linksContainer.className = 'flex justify-center space-x-6 mb-4';
    const footerLinks = [
        { text: 'Privacy Policy', href: '#privacy' },
        { text: 'Terms of Service', href: '#terms' },
        { text: 'Contact Us', href: '#contact' }
    ];
    footerLinks.forEach(linkData => {
        const link = document.createElement('a');
        link.href = linkData.href;
        link.className = 'hover:text-gray-400';
        link.textContent = linkData.text;
        linksContainer.appendChild(link);
    });
    footer.appendChild(linksContainer);

    // Social Media Icons
    const socialMediaContainer = document.createElement('div');
    socialMediaContainer.className = 'flex justify-center space-x-4 mb-4';
    const socialMediaLinks = [
        { icon: 'fab fa-facebook', href: 'https://facebook.com' },
        { icon: 'fab fa-twitter', href: 'https://twitter.com' },
        { icon: 'fab fa-linkedin', href: 'https://linkedin.com' },
        { icon: 'fab fa-instagram', href: 'https://instagram.com' }
    ];
    socialMediaLinks.forEach(social => {
        const socialLink = document.createElement('a');
        socialLink.href = social.href;
        socialLink.target = '_blank';
        socialLink.rel = 'noopener noreferrer';
        socialLink.className = 'text-xl hover:text-gray-400';
        socialLink.innerHTML = `<i class="${social.icon}"></i>`;
        socialMediaContainer.appendChild(socialLink);
    });
    footer.appendChild(socialMediaContainer);

    // Copyright Information
    const copyright = document.createElement('div');
    copyright.className = 'text-center text-sm';
    copyright.textContent = '© 2023 QR Scanner. All rights reserved.';
    footer.appendChild(copyright);

    // Insert Footer into the DOM
    document.body.appendChild(footer);
});

// Add the pricing section dynamically to the DOM
document.addEventListener('DOMContentLoaded', () => {
    // Pricing Section
    const pricingSection = document.createElement('section');
    pricingSection.className = 'py-12 bg-gray-100 text-gray-800';

    // Section Title
    const title = document.createElement('h2');
    title.className = 'text-3xl font-bold text-center mb-8';
    title.textContent = 'Pricing Plans';
    pricingSection.appendChild(title);

    // Pricing Cards Container
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8';

    // Pricing Plans Data
    const plans = [
        {
            name: 'Basic',
            price: '$0',
            features: ['Scan QR Codes', 'Upload Images', 'Generate QR Codes'],
            buttonText: 'Get Started',
            buttonClass: 'bg-blue-500 hover:bg-blue-600 text-white'
        },
        {
            name: 'Premium',
            price: '$9.99/month',
            features: ['All Basic Features', 'Priority Support', 'Advanced Analytics'],
            buttonText: 'Subscribe Now',
            buttonClass: 'bg-green-500 hover:bg-green-600 text-white'
        }
    ];

    // Create Cards
    plans.forEach(plan => {
        const card = document.createElement('div');
        card.className = 'bg-white shadow-md rounded-lg p-6 text-center';

        // Plan Name
        const planName = document.createElement('h3');
        planName.className = 'text-xl font-semibold mb-4';
        planName.textContent = plan.name;
        card.appendChild(planName);

        // Plan Price
        const planPrice = document.createElement('p');
        planPrice.className = 'text-2xl font-bold mb-6';
        planPrice.textContent = plan.price;
        card.appendChild(planPrice);

        // Features List
        const featuresList = document.createElement('ul');
        featuresList.className = 'mb-6 space-y-2';
        plan.features.forEach(feature => {
            const featureItem = document.createElement('li');
            featureItem.className = 'flex items-center justify-center space-x-2';
            featureItem.innerHTML = `<span class="text-green-500"><i class="fas fa-check-circle"></i></span> <span>${feature}</span>`;
            featuresList.appendChild(featureItem);
        });
        card.appendChild(featuresList);

        // Subscribe Button
        const button = document.createElement('button');
        button.className = `${plan.buttonClass} px-4 py-2 rounded-md`;
        button.textContent = plan.buttonText;
        card.appendChild(button);

        cardsContainer.appendChild(card);
    });

    pricingSection.appendChild(cardsContainer);

    // Insert Pricing Section into the DOM
    document.body.appendChild(pricingSection);
});

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
