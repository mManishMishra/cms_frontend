"use client";
﻿import { CKEditor } from '@ckeditor/ckeditor5-react';
import DOMPurify from 'isomorphic-dompurify';
import {
    Autoformat,
    BlockQuote,
    Bold,
    ClassicEditor,
    Essentials,
    GeneralHtmlSupport,
    Heading,
    HtmlEmbed,
    Image,
    ImageCaption,
    ImageInsert,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    ListProperties,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    SourceEditing,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    Undo
} from 'ckeditor5';
import CustomUploadAdapterPlugin, { getUploadedImageAlt } from './CustomUploadAdapter';
import 'ckeditor5/ckeditor5.css';

function MandatoryAltTextPlugin(editor) {
    editor.model.document.on('change:data', () => {
        const differ = editor.model.document.differ;
        if (!differ) return;

        const changes = differ.getChanges();

        for (const entry of changes) {
            if (entry.type === 'insert' && (entry.name === 'imageBlock' || entry.name === 'imageInline')) {
                const imageElement = entry.position.nodeAfter;

                if (imageElement && !imageElement.getAttribute('alt')) {
                    setTimeout(() => {
                        const imageSource = imageElement.getAttribute('src');
                        const uploadedAltText = imageSource ? getUploadedImageAlt(imageSource) : '';
                        let altText = uploadedAltText;

                        if (!altText) {
                            altText = window.prompt('SEO REQUIREMENT: Please enter descriptive alt text for this image:');
                        }

                        while (altText === null || altText.trim() === '') {
                            altText = window.prompt('Alt text is mandatory for SEO and accessibility. Please enter a description:');
                        }

                        editor.model.change((writer) => {
                            writer.setAttribute('alt', altText.trim(), imageElement);
                        });
                    }, 100);
                }
            }
        }
    });
}

const sanitizeEmbeddedHtml = (inputHtml) => {
    const sanitizedHtml = DOMPurify.sanitize(inputHtml, {
        ADD_TAGS: ['iframe', 'section', 'article', 'main', 'aside', 'form'],
        ADD_ATTR: [
            'allow',
            'allowfullscreen',
            'aria-label',
            'aria-labelledby',
            'class',
            'frameborder',
            'id',
            'loading',
            'name',
            'rel',
            'role',
            'scrolling',
            'style',
            'target',
            'title'
        ],
        FORBID_TAGS: ['script']
    });

    return {
        html: sanitizedHtml,
        hasChanged: sanitizedHtml !== inputHtml
    };
};

const editorConfig = {
    licenseKey: 'GPL',
    plugins: [
        Autoformat,
        BlockQuote,
        Bold,
        Essentials,
        GeneralHtmlSupport,
        Heading,
        HtmlEmbed,
        Image,
        ImageCaption,
        ImageInsert,
        ImageResize,
        ImageStyle,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        List,
        ListProperties,
        MediaEmbed,
        Paragraph,
        PasteFromOffice,
        SourceEditing,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        Undo
    ],
    extraPlugins: [CustomUploadAdapterPlugin, MandatoryAltTextPlugin],
    toolbar: {
        items: [
            'undo', 'redo', '|',
            'heading', '|',
            'bold', 'italic', 'blockQuote', '|',
            'link', 'imageUpload', 'insertTable', 'mediaEmbed', 'htmlEmbed', 'sourceEditing', '|',
            'bulletedList', 'numberedList', 'outdent', 'indent'
        ],
        shouldNotGroupWhenFull: true
    },
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
            { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' }
        ]
    },
    link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
            openInNewTab: {
                mode: 'manual',
                label: 'Open in a new tab',
                attributes: {
                    target: '_blank',
                    rel: 'noopener noreferrer'
                }
            }
        }
    },
    list: {
        properties: {
            styles: true,
            startIndex: true,
            reversed: true
        }
    },
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
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            '|',
            'imageTextAlternative'
        ]
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'toggleTableCaption',
            'tableProperties',
            'tableCellProperties'
        ]
    },
    htmlSupport: {
        allow: [
            {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true
            }
        ],
        disallow: [
            {
                name: 'script'
            }
        ]
    },
    htmlEmbed: {
        showPreviews: true,
        sanitizeHtml: sanitizeEmbeddedHtml
    },
    mediaEmbed: {
        previewsInData: true
    }
};

const CKEditorComponent = ({ pageData, setPageData }) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={pageData}
            onChange={(event, editor) => {
                const data = editor.getData();
                setPageData(data);
            }}
            config={editorConfig}
        />
    );
};

export default CKEditorComponent;
