import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomUploadAdapterPlugin from './CustomUploadAdapter'; // Import Custom Upload Adapter
// import '@ckeditor/ckeditor5-build-classic/build/translations/en'; // Ensure language support

import 'ckeditor5/ckeditor5.css';

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
                extraPlugins: [CustomUploadAdapterPlugin], // 🔥 Enable our custom upload adapter
                toolbar: [
                    'undo', 'redo', '|',
                    'heading', '|', 'bold', 'italic', '|',
                    'link', 'imageUpload', 'insertTable', 'mediaEmbed', '|',
                    'bulletedList', 'numberedList', 'indent', 'outdent', '|',
                    'imageResize', 'imageStyle:full', 'imageStyle:side', '|',
                    'imageTextAlternative'
                ],
                image: {
                    resizeUnit: 'px', // Use pixels for resizing
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
                        'imageResize', // 🔥 Enable Resize Controls
                        'imageStyle:full', 'imageStyle:side', '|',
                        'imageTextAlternative'
                    ]
                }
            }}
        />
    );
}

export default CKEditorComponent;
