import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomUploadAdapterPlugin from './CustomUploadAdapter'; 
import 'ckeditor5/ckeditor5.css';

// --- NEW: Custom Plugin to Enforce Mandatory Alt Tags ---
// This function listens to the editor. Whenever a new image is inserted, 
// it forces a browser prompt to ask for the Alt Text.
function MandatoryAltTextPlugin(editor) {
    editor.model.document.on('change:data', () => {
        const differ = editor.model.document.differ;
        if (!differ) return;

        const changes = differ.getChanges();
        for (const entry of changes) {
            // Detect when a new image is inserted into the editor
            if (entry.type === 'insert' && (entry.name === 'imageBlock' || entry.name === 'imageInline')) {
                const imageElement = entry.position.nodeAfter;
                
                // If the image doesn't have an alt tag yet
                if (imageElement && !imageElement.getAttribute('alt')) {
                    // Slight delay so the image placeholder can render first
                    setTimeout(() => {
                        let altText = window.prompt("🛑 SEO REQUIREMENT: Please enter descriptive Alt Text for this image:");
                        
                        // FORCE LOOP: They cannot cancel or leave it empty
                        while (altText === null || altText.trim() === "") {
                            altText = window.prompt("⚠️ Alt text is MANDATORY for SEO and Accessibility. You cannot skip this. Please enter a description:");
                        }
                        
                        // Update the CKEditor image with the new alt text
                        editor.model.change(writer => {
                            writer.setAttribute('alt', altText.trim(), imageElement);
                        });
                    }, 100);
                }
            }
        }
    });
}

const CKEditorComponent = ({ pageData, setPageData }) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={pageData}
            onChange={(event, editor) => {
                const data = editor.getData();
                setPageData(data);
            }}
            config={{
                licenseKey: 'GPL',
                // 🔥 Added MandatoryAltTextPlugin to the plugins array
                extraPlugins: [CustomUploadAdapterPlugin, MandatoryAltTextPlugin], 
                toolbar: [
                    'undo', 'redo', '|',
                    'heading', '|', 'bold', 'italic', '|',
                    'link', 'imageUpload', 'insertTable', 'mediaEmbed', '|',
                    'bulletedList', 'numberedList', 'indent', 'outdent'
                ],
                image: {
                    resizeUnit: 'px', 
                    resizeOptions: [
                        {
                            name: 'resizeImage:original',
                            value: null,
                            label: 'Original'
                        },
                        {
                            name: 'resizeImage:50',
                            value: '50',
                            label: '50%'
                        },
                        {
                            name: 'resizeImage:75',
                            value: '75',
                            label: '75%'
                        }
                    ],
                    toolbar: [
                        'imageResize', 
                        'imageStyle:full', 
                        'imageStyle:side', 
                        '|',
                        'imageTextAlternative' // Allows them to edit the alt text later if they mispelled it
                    ]
                }
            }}
        />
    );
}

export default CKEditorComponent;