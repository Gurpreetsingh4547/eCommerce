const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  // Service Images
  {
    url: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&auto=format&fit=crop&q=80',
    filename: 'window-installation.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=80',
    filename: 'toner-refill.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&auto=format&fit=crop&q=80',
    filename: 'printer-repair.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    filename: 'laptop-repair.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=80',
    filename: 'computer-repair.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    filename: 'thin-client.jpg'
  },
  // Contact Page Images
  {
    url: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800&auto=format&fit=crop&q=80',
    filename: 'customer-support.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=800&auto=format&fit=crop&q=80',
    filename: 'technical-support.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=80',
    filename: 'sales-team.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    filename: 'office-location.jpg'
  },
  // Dashboard Images
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    filename: 'total-services.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=80',
    filename: 'active-customers.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
    filename: 'revenue.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=800&auto=format&fit=crop&q=80',
    filename: 'pending-services.jpg'
  }
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const filepath = path.join(__dirname, 'public', 'images', 'services', filename);
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded: ${filename}`);
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
};

const downloadAllImages = async () => {
  try {
    for (const image of images) {
      await downloadImage(image.url, image.filename);
    }
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
};

downloadAllImages(); 