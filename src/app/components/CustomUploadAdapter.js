import imageCompression from 'browser-image-compression';

class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    async upload() {
        const file = await this.loader.file;

        // Step 1: Compress image and convert to WebP
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
            throw new Error('Image upload failed');
        }

        const result = await response.json();

        // Step 4: Ensure HTTPS URL (optional fallback)
        let imageUrl = result.url || '';
        if (imageUrl.startsWith('http://')) {
            imageUrl = imageUrl.replace('http://', 'https://');
        }

        return {
            default: imageUrl,
        };
    }

    abort() {
        // Optional: handle abort
    }
}

// CKEditor plugin
export default function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
    };
}
