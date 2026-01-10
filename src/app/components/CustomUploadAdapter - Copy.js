import imageCompression from 'browser-image-compression';

class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    async upload() {
        return this.loader.file
            .then(async (file) => {
                // 🔥 Step 1: Compress Image and Convert to WebP
                const options = {
                    maxSizeMB: 1, // Limit size to 1MB
                    maxWidthOrHeight: 1024, // Resize image
                    useWebWorker: true,
                    fileType: 'image/webp' // Convert to WebP format
                };

                const compressedFile = await imageCompression(file, options);

                // 🔥 Step 2: Convert Compressed File to Blob URL
                const blobUrl = URL.createObjectURL(compressedFile);

                return new Promise((resolve) => {
                    resolve({ default: blobUrl }); // Use Blob URL instead of Base64
                });
            });
    }

    abort() {
        // Handle abort if needed
    }
}

// 🔥 Plugin function for CKEditor to use this adapter
export default function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
    };
}
