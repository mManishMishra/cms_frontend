import imageCompression from 'browser-image-compression';

const uploadedImageAltRegistry = new Map();

const API_BASE_URL =
    (process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_API_DEV_URL
        : process.env.NEXT_PUBLIC_API_BASE_URL) || 'https://apidev.hcinterior.in';

const normalizeMediaUrl = (url = '') => {
    if (!url) {
        return '';
    }

    if (url.startsWith('http://')) {
        return url.replace('http://', 'https://');
    }

    return url;
};

const rememberUploadedImageAlt = (url, altText) => {
    const trimmedAltText = altText?.trim();
    const normalizedUrl = normalizeMediaUrl(url);

    if (!normalizedUrl || !trimmedAltText) {
        return;
    }

    uploadedImageAltRegistry.set(normalizedUrl, trimmedAltText);
};

export const getUploadedImageAlt = (url) => uploadedImageAltRegistry.get(normalizeMediaUrl(url));

class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    async upload() {
        try {
            const file = await this.loader.file;
            let altText = window.prompt('SEO REQUIREMENT: Please enter descriptive alt text for this image:');

            while (altText === null || altText.trim() === '') {
                altText = window.prompt('Alt text is mandatory for SEO and accessibility. Please enter a description:');
            }

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
            formData.append('alt_text', altText.trim());

            // Step 3: Upload to backend
            const response = await fetch(`${API_BASE_URL}/cms-parent-child/upload-image`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Server rejected the image upload.');
            }

            const result = await response.json();

            // Step 4: Ensure HTTPS URL
            const imageUrl = normalizeMediaUrl(result.url || '');
            rememberUploadedImageAlt(imageUrl, result.alt_text || altText.trim());

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
