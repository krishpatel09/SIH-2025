const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * GPT4All Model Download Script
 * 
 * This script downloads the required GPT4All model for offline AI chatbot functionality.
 * The model will be saved to the models/ directory in the project root.
 */

const MODEL_URL = 'https://gpt4all.io/models/ggml-gpt4all-j-v1.3-groovy.bin';
const MODEL_NAME = 'ggml-gpt4all-j-v1.3-groovy.bin';
const MODELS_DIR = path.join(__dirname, '..', '..', 'models');
const MODEL_PATH = path.join(MODELS_DIR, MODEL_NAME);

async function downloadModel() {
  try {
    console.log('🔄 Starting GPT4All model download...');
    console.log(`📁 Model will be saved to: ${MODEL_PATH}`);
    
    // Create models directory if it doesn't exist
    if (!fs.existsSync(MODELS_DIR)) {
      fs.mkdirSync(MODELS_DIR, { recursive: true });
      console.log(`✅ Created models directory: ${MODELS_DIR}`);
    }

    // Check if model already exists
    if (fs.existsSync(MODEL_PATH)) {
      const stats = fs.statSync(MODEL_PATH);
      const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`⚠️  Model already exists (${fileSizeInMB} MB)`);
      console.log('   Delete the file if you want to re-download it.');
      return;
    }

    console.log('🌐 Downloading model from GPT4All...');
    console.log(`   URL: ${MODEL_URL}`);
    console.log('   This may take several minutes depending on your internet connection...');

    // Download the model
    const file = fs.createWriteStream(MODEL_PATH);
    
    const request = https.get(MODEL_URL, (response) => {
      const totalSize = parseInt(response.headers['content-length'], 10);
      let downloadedSize = 0;
      
      console.log(`📊 Model size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);

      response.on('data', (chunk) => {
        downloadedSize += chunk.length;
        const progress = ((downloadedSize / totalSize) * 100).toFixed(1);
        process.stdout.write(`\r⬇️  Downloading: ${progress}% (${(downloadedSize / (1024 * 1024)).toFixed(1)} MB)`);
      });

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log('\n✅ Model downloaded successfully!');
        console.log(`📁 Saved to: ${MODEL_PATH}`);
        console.log('🚀 You can now start the backend server with: npm start');
      });

      file.on('error', (err) => {
        fs.unlink(MODEL_PATH, () => {}); // Delete the file on error
        console.error('\n❌ Error writing file:', err.message);
        process.exit(1);
      });
    });

    request.on('error', (err) => {
      console.error('\n❌ Error downloading model:', err.message);
      process.exit(1);
    });

  } catch (error) {
    console.error('❌ Error in download process:', error.message);
    process.exit(1);
  }
}

// Alternative download method using curl/wget if https.get fails
async function downloadWithCurl() {
  const { exec } = require('child_process');
  
  console.log('🔄 Trying alternative download method...');
  
  const curlCommand = `curl -L -o "${MODEL_PATH}" "${MODEL_URL}"`;
  
  exec(curlCommand, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Curl download failed:', error.message);
      console.log('\n📋 Manual download instructions:');
      console.log('1. Visit: https://gpt4all.io/index.html');
      console.log('2. Download the model: ggml-gpt4all-j-v1.3-groovy.bin');
      console.log(`3. Save it to: ${MODEL_PATH}`);
      process.exit(1);
    } else {
      console.log('✅ Model downloaded successfully with curl!');
      console.log(`📁 Saved to: ${MODEL_PATH}`);
    }
  });
}

// Main execution
if (require.main === module) {
  downloadModel().catch(() => {
    console.log('\n🔄 Primary download method failed, trying alternative...');
    downloadWithCurl();
  });
}

module.exports = { downloadModel, downloadWithCurl };
