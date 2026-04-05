import imageCompression from 'browser-image-compression';

class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    async upload() {
        try {
            const file = await this.loader.file;

            // Step 1: Compress image and convert to WebP for faster loading
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
                fileType: 'image/webp',
            };
            const compressedFile = await imageCompression(file, options);

            // Step 2: Prepare FormData
            const formData = new FormData();
            formData.append('image', compressedFile, 'upload.webp');

            // Step 3: Upload to backend
            const response = await fetch('https://apidev.hcinterior.in/cms-parent-child/upload-image', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Server rejected the image upload.');
            }

            const result = await response.json();

            // Step 4: Ensure HTTPS URL
            let imageUrl = result.url || '';
            if (imageUrl.startsWith('http://')) {
                imageUrl = imageUrl.replace('http://', 'https://');
            }

            // Return the URL to CKEditor so it can display the image
            return {
                default: imageUrl,
            };

        } catch (error) {
            console.error("Upload Adapter Error:", error);
            // Reject the promise so CKEditor knows the upload failed
            return Promise.reject(error?.message || "Failed to upload image");
        }
    }

    abort() {
        // This stops the upload if the user deletes the image before it finishes uploading
        console.log("Image upload aborted by user.");
    }
}

// CKEditor plugin initialization
export default function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
    };
}