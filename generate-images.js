const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = {
  slides: { width: 1200, height: 800 },
  cards: { width: 800, height: 600 }
};

const colors = {
  background: '#000080',
  text: '#FFFFFF'
};

function createPlaceholderImage(width, height, text, filename) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, width, height);

  // Add text
  ctx.fillStyle = colors.text;
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  // Save to file
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join('public/images', filename), buffer);
}

// Create images directory if it doesn't exist
if (!fs.existsSync('public/images')) {
  fs.mkdirSync('public/images', { recursive: true });
}

// Generate slide images
createPlaceholderImage(sizes.slides.width, sizes.slides.height, 'Hardware Services', 'slide1.jpg');
createPlaceholderImage(sizes.slides.width, sizes.slides.height, 'Professional Support', 'slide2.jpg');
createPlaceholderImage(sizes.slides.width, sizes.slides.height, '24/7 Service', 'slide3.jpg');

// Generate service card images
createPlaceholderImage(sizes.cards.width, sizes.cards.height, 'Window Installation', 'window-installation.jpg');
createPlaceholderImage(sizes.cards.width, sizes.cards.height, 'Toner Refills', 'toner-refill.jpg');
createPlaceholderImage(sizes.cards.width, sizes.cards.height, 'Printer Repair', 'printer-repair.jpg');
createPlaceholderImage(sizes.cards.width, sizes.cards.height, 'Laptop Repair', 'laptop-repair.jpg');
createPlaceholderImage(sizes.cards.width, sizes.cards.height, 'Computer Repair', 'computer-repair.jpg');
createPlaceholderImage(sizes.cards.width, sizes.cards.height, 'Thin Clients', 'thin-client.jpg');

console.log('All images generated successfully!'); 