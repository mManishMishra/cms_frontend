"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";
import api from "@/utils/api";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import {
    DEFAULT_SITEMAP_CHANGE_FREQUENCY,
    DEFAULT_SITEMAP_PRIORITY,
    SITEMAP_CHANGE_FREQUENCY_OPTIONS
} from "@/utils/seoHelpers";
import {
    getCmsAccess,
    getDeletePermissionMessage,
    getPublishWorkflowMessage,
} from "@/utils/cmsAccess";

const CKEditorComponent = dynamic(() => import('@/app/components/CKEditorComponent'), { ssr: false });

const initialFormState = {
    title: "",
    writer_name: "",
    show_author_date: false,
    content: "",
    status: "Draft",
    faqs: [],
    accordions: [],
    content_blocks: [] 
};

const CmsPages = () => {
    // 🌟 FIX: Grab the token and user role correctly from Redux
    const user = useSelector((state) => state.auth.user);
    const authToken = useSelector((state) => state.auth.authToken) || user?.token;
    const { canPublish, canDelete } = getCmsAccess(user);

    const [pagesList, setPagesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('content'); // 'content', 'faqs', 'accordions', 'blocks', 'preview'
    const [blockTypeToAdd, setBlockTypeToAdd] = useState('testimonial');
    
    const [formData, setFormData] = useState(initialFormState);

    const [formSeoContentData, setFormSeoContentData] = useState({
        slug: "", 
        canonical_url: "", 
        meta_title: "", 
        meta_description: "", 
        meta_keywords: "", 
        custom_code: "",
        meta_robots_index: "index", 
        meta_robots_follow: "follow", 
        include_in_sitemap: true,
        sitemap_change_frequency: DEFAULT_SITEMAP_CHANGE_FREQUENCY,
        sitemap_priority: String(DEFAULT_SITEMAP_PRIORITY),
        og_title: "", 
        og_description: "", 
        og_image: ""
    });
    
    const [selectedId, setSelectedId] = useState(null);

    const fetchPages = useCallback(async () => {
        setLoading(true);
        try {
            const token = authToken || (typeof window !== "undefined" ? localStorage.getItem("token") : "");
            const response = await api.get("/cms-pages/all", { 
                headers: { Authorization: `Bearer ${token}` } 
            });
            setPagesList(response.data || []);
        } catch (err) {
            console.error("Fetch Pages Error:", err);
            toast.error(err.response?.data?.message || "Error fetching pages.");
        } finally {
            setLoading(false);
        }
    }, [authToken]);

    useEffect(() => { 
        fetchPages(); 
    }, [fetchPages]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    const setContentData = (data) => setFormData((prev) => ({ ...prev, content: data }));

    // --- Standard Blocks (FAQs, Accordions) ---
    const handleAddStandardBlock = (type) => {
        setFormData(prev => ({
            ...prev,
            [type]: [...prev[type], type === 'faqs' ? { question: '', answer: '' } : { title: '', content: '' }]
        }));
    };

    const handleRemoveStandardBlock = (type, index) => {
        setFormData(prev => {
            const newArray = [...prev[type]];
            newArray.splice(index, 1);
            return { ...prev, [type]: newArray };
        });
    };

    const handleStandardBlockChange = (type, index, field, value) => {
        setFormData(prev => {
            const newArray = [...prev[type]];
            newArray[index][field] = value;
            return { ...prev, [type]: newArray };
        });
    };

    // --- Flexible Content Blocks ---
    const handleAddContentBlock = () => {
        let newBlock = { type: blockTypeToAdd, data: {} };
        if (blockTypeToAdd === 'testimonial') newBlock.data = { client_name: '', review: '', designation: '' };
        if (blockTypeToAdd === 'service_row') newBlock.data = { heading: '', description: '', image_url: '', image_alt: '', reverse_layout: false };
        if (blockTypeToAdd === 'counter') newBlock.data = { number: '', label: '', icon_url: '' };

        setFormData(prev => ({ ...prev, content_blocks: [...prev.content_blocks, newBlock] }));
    };

    const handleRemoveContentBlock = (index) => {
        setFormData(prev => {
            const newArray = [...prev.content_blocks];
            newArray.splice(index, 1);
            return { ...prev, content_blocks: newArray };
        });
    };

    const handleContentBlockChange = (index, field, value) => {
        setFormData(prev => {
            const newArray = [...prev.content_blocks];
            newArray[index].data[field] = value;
            return { ...prev, content_blocks: newArray };
        });
    };

    // --- API Submissions ---
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = authToken || localStorage.getItem("token");
            if (!canPublish && formData.status === "Published") {
                toast.info(getPublishWorkflowMessage("This page"));
            }
            const response = await api.post("/cms-pages", formData, { headers: { Authorization: `Bearer ${token}` } });
            if (response.status === 201 || response.status === 200) {
                fetchPages(); 
                if (!canPublish && response.data?.status === "Pending Approval") {
                    toast.info("Page saved as Pending Approval for admin review.");
                } else {
                    toast.success("Page created.");
                }
                setFormData(initialFormState);
                document.getElementById('addNewpageModalClose').click();
            }
        } catch (error) { 
            toast.error("Error submitting form."); 
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = authToken || localStorage.getItem("token");
            if (!canPublish && formData.status === "Published") {
                toast.info(getPublishWorkflowMessage("This page"));
            }
            const response = await api.patch(`/cms-pages/${selectedId}`, formData, { headers: { Authorization: `Bearer ${token}` } });
            if (response.status === 200) {
                fetchPages(); 
                if (!canPublish && response.data?.status === "Pending Approval") {
                    toast.info("Page moved to Pending Approval for admin review.");
                } else {
                    toast.success("Page updated.");
                }
                setFormData(initialFormState);
                document.getElementById('editNewpageModalClose').click();
            }
        } catch (error) { 
            toast.error("Error updating page."); 
        }
    };

    const deleteHandler = async (id) => {
        if (!canDelete) {
            toast.error(getDeletePermissionMessage("this page"));
            return;
        }

        if (window.confirm("Delete this page?")) {
            try {
                const token = authToken || localStorage.getItem("token");
                const response = await api.delete(`/cms-pages/${id}`, { headers: { Authorization: `Bearer ${token}` } });
                if (response.status === 200) { 
                    fetchPages(); 
                    toast.success("Page deleted."); 
                }
            } catch (error) { 
                toast.error("Failed to delete."); 
            }
        }
    };

    const duplicateHandler = async (id) => {
        try {
            const token = authToken || localStorage.getItem("token");
            const response = await api.post(`/cms-pages/${id}/duplicate`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 201 || response.status === 200) {
                fetchPages();
                toast.success("Page duplicated successfully.");
            }
        } catch (error) {
            toast.error("Failed to duplicate page.");
        }
    };

    const handleEditClick = (item) => {
        setSelectedId(item.id);
        setActiveTab('content');

        // 🌟 WORKFLOW: Auto-downgrade status if Editor edits a Published page
        let defaultStatus = item.status || "Draft";
        if (!canPublish && defaultStatus === "Published") {
            defaultStatus = "Pending Approval";
            toast.info("Editing a live page will change its status to Pending Approval.");
        }

        setFormData({
            title: item.title, 
            writer_name: item.writer_name || "", 
            show_author_date: item.show_author_date || false,
            content: item.content || "", 
            status: defaultStatus,
            faqs: item.faqs || [], 
            accordions: item.accordions || [], 
            content_blocks: item.content_blocks || []
        });
    };

    // 🌟 WORKFLOW: Quick Approve feature for Admins
    const quickApproveHandler = async (id) => {
        try {
            const token = authToken || localStorage.getItem("token");
            const response = await api.patch(`/cms-pages/${id}`, 
                { status: "Published" }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) { 
                fetchPages(); 
                toast.success("Page Approved and Published!"); 
            }
        } catch (error) { 
            toast.error("Failed to approve page."); 
        }
    };

    const handleManageSeoContentClick = (id, item) => {
        setSelectedId(id);
        setFormSeoContentData({
            slug: item?.slug || "", 
            canonical_url: item?.canonical_url || "", 
            meta_title: item?.meta_title || "", 
            meta_description: item?.meta_description || "", 
            meta_keywords: item?.meta_keywords || "", 
            custom_code: item?.custom_code || "",
            meta_robots_index: item?.meta_robots_index || "index", 
            meta_robots_follow: item?.meta_robots_follow || "follow", 
            include_in_sitemap: item?.include_in_sitemap ?? true,
            sitemap_change_frequency: item?.sitemap_change_frequency || DEFAULT_SITEMAP_CHANGE_FREQUENCY,
            sitemap_priority: String(item?.sitemap_priority ?? DEFAULT_SITEMAP_PRIORITY),
            og_title: item?.og_title || "", 
            og_description: item?.og_description || "", 
            og_image: item?.og_image || "",
        });
    };

    const handleSeoContentSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = authToken || localStorage.getItem("token");
            const response = await api.patch(`/cms-pages/seo-content/${selectedId}`, formSeoContentData, { headers: { Authorization: `Bearer ${token}` } });
            if (response.status === 200) { 
                fetchPages(); 
                if (!canPublish && response.data?.status === "Pending Approval") {
                    toast.info("SEO changes moved this page to Pending Approval for admin review.");
                } else {
                    toast.success("SEO saved.");
                }
                document.getElementById('seoContentModalClose').click(); 
            }
        } catch (error) { 
            toast.error("Error saving SEO."); 
        }
    };

    const handleSeoContentInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormSeoContentData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // --- UI Renders ---
    const renderContentBlocks = () => (
        <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4 bg-light p-3 rounded border">
                <div>
                    <h6 className="fw-bold mb-1">Reusable Content Blocks</h6>
                    <small className="text-muted">Add visual sections to your page like Testimonials or Features.</small>
                </div>
                <div className="d-flex gap-2">
                    <select className="form-select form-select-sm" value={blockTypeToAdd} onChange={(e) => setBlockTypeToAdd(e.target.value)}>
                        <option value="testimonial">Testimonial Block</option>
                        <option value="service_row">Service Image+Text Row</option>
                        <option value="counter">Stats Counter</option>
                    </select>
                    <button type="button" className="btn btn-sm btn-primary text-nowrap" onClick={handleAddContentBlock}>+ Add Block</button>
                </div>
            </div>

            {formData.content_blocks.map((block, index) => (
                <div key={index} className="card mb-3 border-info shadow-sm">
                    <div className="card-header bg-info text-white d-flex justify-content-between align-items-center py-2">
                        <span className="fw-bold text-capitalize"><i className="bi bi-box me-2"></i> {block.type.replace('_', ' ')} Block</span>
                        <button type="button" className="btn btn-sm btn-danger" onClick={() => handleRemoveContentBlock(index)}>Remove</button>
                    </div>
                    <div className="card-body row g-3">
                        {block.type === 'testimonial' && (
                            <>
                                <div className="col-md-6"><label className="form-label small">Client Name</label><input type="text" className="form-control" value={block.data.client_name} onChange={(e) => handleContentBlockChange(index, 'client_name', e.target.value)} /></div>
                                <div className="col-md-6"><label className="form-label small">Designation/Location</label><input type="text" className="form-control" value={block.data.designation} onChange={(e) => handleContentBlockChange(index, 'designation', e.target.value)} /></div>
                                <div className="col-md-12"><label className="form-label small">Review</label><textarea className="form-control" rows="2" value={block.data.review} onChange={(e) => handleContentBlockChange(index, 'review', e.target.value)}></textarea></div>
                            </>
                        )}
                        {block.type === 'service_row' && (
                            <>
                                <div className="col-md-8"><label className="form-label small">Heading</label><input type="text" className="form-control" value={block.data.heading} onChange={(e) => handleContentBlockChange(index, 'heading', e.target.value)} /></div>
                                <div className="col-md-4"><label className="form-label small">Layout Style</label><select className="form-select" value={block.data.reverse_layout} onChange={(e) => handleContentBlockChange(index, 'reverse_layout', e.target.value === 'true')}><option value="false">Image Left, Text Right</option><option value="true">Text Left, Image Right</option></select></div>
                                <div className="col-md-12"><label className="form-label small">Image URL</label><input type="text" className="form-control" placeholder="https://..." value={block.data.image_url} onChange={(e) => handleContentBlockChange(index, 'image_url', e.target.value)} /></div>
                                <div className="col-md-12"><label className="form-label small">Image Alt Text</label><input type="text" className="form-control" placeholder="Describe the image" value={block.data.image_alt || ''} onChange={(e) => handleContentBlockChange(index, 'image_alt', e.target.value)} /></div>
                                <div className="col-md-12"><label className="form-label small">Description</label><textarea className="form-control" rows="3" value={block.data.description} onChange={(e) => handleContentBlockChange(index, 'description', e.target.value)}></textarea></div>
                            </>
                        )}
                        {block.type === 'counter' && (
                            <>
                                <div className="col-md-4"><label className="form-label small">Number (e.g. 500+)</label><input type="text" className="form-control" value={block.data.number} onChange={(e) => handleContentBlockChange(index, 'number', e.target.value)} /></div>
                                <div className="col-md-4"><label className="form-label small">Label (e.g. Happy Clients)</label><input type="text" className="form-control" value={block.data.label} onChange={(e) => handleContentBlockChange(index, 'label', e.target.value)} /></div>
                                <div className="col-md-4"><label className="form-label small">Icon URL (Optional)</label><input type="text" className="form-control" value={block.data.icon_url} onChange={(e) => handleContentBlockChange(index, 'icon_url', e.target.value)} /></div>
                            </>
                        )}
                    </div>
                </div>
            ))}
            {formData.content_blocks.length === 0 && <p className="text-muted small text-center py-4 border rounded bg-light">No custom blocks added. Use the top right button to build your page.</p>}
        </div>
    );

    const renderDynamicBlocks = (type) => (
        <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold">{type === 'faqs' ? 'FAQ Sections' : 'Accordion Sections'}</h6>
                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => handleAddStandardBlock(type)}>+ Add {type === 'faqs' ? 'FAQ' : 'Accordion'}</button>
            </div>
            {formData[type].map((block, index) => (
                <div key={index} className="card mb-3 border-light shadow-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-2">
                            <span className="badge bg-secondary">Item #{index + 1}</span>
                            <button type="button" className="btn btn-sm btn-danger" onClick={() => handleRemoveStandardBlock(type, index)}>Remove</button>
                        </div>
                        <input type="text" className="form-control mb-2" placeholder={type === 'faqs' ? 'Question' : 'Title'} value={type === 'faqs' ? block.question : block.title} onChange={(e) => handleStandardBlockChange(type, index, type === 'faqs' ? 'question' : 'title', e.target.value)} />
                        <textarea className="form-control" rows="3" placeholder={type === 'faqs' ? 'Answer' : 'Content'} value={type === 'faqs' ? block.answer : block.content} onChange={(e) => handleStandardBlockChange(type, index, type === 'faqs' ? 'answer' : 'content', e.target.value)} />
                    </div>
                </div>
            ))}
            {formData[type].length === 0 && <p className="text-muted small">No items added yet.</p>}
        </div>
    );

    // LIVE PREVIEW TAB
    const renderLivePreview = () => (
        <div className="mt-4 border rounded p-4 bg-white shadow-sm" style={{minHeight: "500px"}}>
            <div className="alert alert-warning py-2 mb-4 d-flex justify-content-between align-items-center">
                <span><i className="bi bi-eye"></i> <strong>Live Preview:</strong> This is a rough estimation of how your content will look.</span>
                <span className="badge bg-dark">{formData.status}</span>
            </div>
            
            <h1 className="mb-4">{formData.title || "Page Title"}</h1>
            {formData.show_author_date && (
                <div className="text-muted mb-4 fst-italic border-bottom pb-3">
                    {formData.writer_name ? `By ${formData.writer_name}` : "By Author"} &nbsp;•&nbsp; {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            )}            
            {/* Main Content */}
            <div className="ck-content mb-5" dangerouslySetInnerHTML={{ __html: formData.content || "<p className='text-muted'>Main content will appear here...</p>" }}></div>

            {/* Blocks Preview */}
            {formData.content_blocks.length > 0 && <hr className="my-5" />}
            {formData.content_blocks.map((block, idx) => (
                <div key={idx} className="mb-4 p-3 border rounded bg-light">
                    {block.type === 'testimonial' && (
                        <blockquote className="blockquote text-center">
                           <p className="mb-2">
  &quot;{block.data.review || 'Review text'}&quot;
</p>
                            <footer className="blockquote-footer">{block.data.client_name || 'Client Name'} <cite>{block.data.designation}</cite></footer>
                        </blockquote>
                    )}
                    {block.type === 'service_row' && (
                        <div className="row align-items-center">
                            <div className={block.data.reverse_layout ? 'col-md-6 order-2' : 'col-md-6'}>
                                <h3>{block.data.heading || 'Service Heading'}</h3>
                                <p>{block.data.description || 'Description goes here...'}</p>
                            </div>
                            <div className={block.data.reverse_layout ? 'col-md-6 order-1 text-center' : 'col-md-6 text-center'}>
                                <div style={{width:'100%', height:'200px', backgroundColor:'#e9ecef', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    {block.data.image_url ? <img src={block.data.image_url} alt={block.data.image_alt || block.data.heading || 'Preview image'} style={{maxHeight:'100%', maxWidth:'100%', objectFit:'cover'}} decoding="async"  loading="lazy" /> : "Image Placeholder"}
                                </div>
                            </div>
                        </div>
                    )}
                    {block.type === 'counter' && (
                        <div className="text-center p-4">
                            <h2 className="text-primary fw-bold">{block.data.number || '0'}</h2>
                            <p className="fw-semibold text-uppercase">{block.data.label || 'Label'}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderFormBody = () => (
        <div className="modal-body p-4 bg-light">
            <ul className="nav nav-tabs nav-fill mb-4 bg-white rounded shadow-sm">
                <li className="nav-item"><button type="button" className={`nav-link text-dark py-3 ${activeTab === 'content' ? 'active fw-bold bg-primary text-white' : ''}`} onClick={() => setActiveTab('content')}>Basic Info & Editor</button></li>
                <li className="nav-item"><button type="button" className={`nav-link text-dark py-3 ${activeTab === 'blocks' ? 'active fw-bold bg-primary text-white' : ''}`} onClick={() => setActiveTab('blocks')}>Content Blocks ({formData.content_blocks.length})</button></li>
                <li className="nav-item"><button type="button" className={`nav-link text-dark py-3 ${activeTab === 'faqs' ? 'active fw-bold bg-primary text-white' : ''}`} onClick={() => setActiveTab('faqs')}>FAQs ({formData.faqs.length})</button></li>
                <li className="nav-item"><button type="button" className={`nav-link text-dark py-3 ${activeTab === 'accordions' ? 'active fw-bold bg-primary text-white' : ''}`} onClick={() => setActiveTab('accordions')}>Accordions ({formData.accordions.length})</button></li>
                <li className="nav-item"><button type="button" className={`nav-link text-dark py-3 ${activeTab === 'preview' ? 'active fw-bold bg-success text-white' : ''}`} onClick={() => setActiveTab('preview')}><i className="bi bi-eye"></i> Live Preview</button></li>
            </ul>

            {activeTab === 'content' && (
                <div className="row g-3 bg-white p-4 rounded shadow-sm border">
                    <div className="col-md-6"><label className="form-label fw-bold">Page Title *</label><input type="text" className="form-control form-control-lg" name="title" value={formData.title} onChange={handleInputChange} required /></div>
                    <div className="col-md-3"><label className="form-label fw-bold">Author Name</label><input type="text" className="form-control form-control-lg" name="writer_name" value={formData.writer_name} onChange={handleInputChange} /></div>
                    
                    <div className="col-md-3">
                        <label className="form-label fw-bold">Status</label>
                        <select className="form-select form-select-lg" name="status" value={formData.status} onChange={handleInputChange}>
                            <option value="Draft">Draft</option>
                            <option value="Pending Approval">Pending Approval</option>
                            {/* 🌟 ONLY ADMINS CAN PUBLISH DIRECTLY */}
                            {canPublish && <option value="Published">Published</option>}
                        </select>
                    </div>
              
                    <div className="col-md-12 mt-3">
                        <div className="form-check form-switch fs-5 bg-light p-3 rounded border">
                            <input 
                                className="form-check-input ms-0 me-3 shadow-sm" 
                                type="checkbox" 
                                role="switch" 
                                name="show_author_date" 
                                id="showAuthorDate" 
                                checked={formData.show_author_date} 
                                onChange={handleInputChange} 
                                style={{cursor: 'pointer'}} 
                            />
                            <label className="form-check-label fs-6 mt-1" htmlFor="showAuthorDate" style={{cursor: 'pointer'}}>
                                <strong>Display Author & Date on Page</strong> 
                                <small className="text-muted d-block" style={{fontSize: '0.8rem'}}>If checked the writer&apos;s name and publication date will be shown below the main title.
</small>
                            </label>
                        </div>
                    </div>
              
                    <div className="col-md-12 mt-4"><label className="form-label fw-bold">Main Content</label><div className="border rounded"><CKEditorComponent pageData={formData.content} setPageData={setContentData} /></div></div>
                </div>
            )}
            {activeTab === 'blocks' && renderContentBlocks()}
            {activeTab === 'faqs' && renderDynamicBlocks('faqs')}
            {activeTab === 'accordions' && renderDynamicBlocks('accordions')}
            {activeTab === 'preview' && renderLivePreview()}
        </div>
    );

    return (
        <AuthMainLayout>
            <div className="container-fluid my-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body p-4">
                        {(!canPublish || !canDelete) && (
                            <div className="alert alert-info">
                                Editors can draft and update pages. Publish and delete access can be granted separately by an admin.
                            </div>
                        )}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Website Pages</h1>
                            <button onClick={() => { setFormData(initialFormState); setActiveTab('content'); }} type="button" className="btn btn-primary px-4 shadow-sm" data-bs-toggle="modal" data-bs-target="#addNewpageModal">+ Add New Page</button>
                        </div>
                        
                        {loading && !pagesList.length ? (
                            <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle border" style={{ width: "100%" }}>
                                    <thead className="table-light"><tr><th>SN</th><th>Title</th><th>Author</th><th>Status</th><th>SEO Settings</th><th className="text-end">Actions</th></tr></thead>
                                    <tbody>
                                        {pagesList.length > 0 ? pagesList.map((item, index) => (
                                            <tr key={item.id}>
                                                <td className="fw-bold text-muted">{index + 1}</td>
                                                <td className="fw-semibold text-dark">{item.title}</td>
                                                <td className="text-muted">{item.writer_name || 'N/A'}</td>
                                                <td>
                                                    {/* 🌟 Better Status Colors */}
                                                    <span className={`badge rounded-pill px-3 py-2 ${item.status === 'Published' ? 'bg-success' : item.status === 'Pending Approval' ? 'bg-info text-dark' : 'bg-warning text-dark'}`}>{item.status || 'Draft'}</span>
                                                </td>
                                                <td><button onClick={() => handleManageSeoContentClick(item.id, item.seo_content || item)} className="btn btn-outline-info btn-sm" data-bs-toggle="modal" data-bs-target="#seoContentModal">Manage SEO</button></td>
                                                <td className="text-end">
                                                    
                                                    {/* 🌟 Only show live link if Published */}
                                                    {item.status === 'Published' && item.seo_content?.slug && (
                                                        <a href={`/${item.seo_content.slug}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-success me-2 shadow-sm">Live Link</a>
                                                    )}
                                                    
                                                    <button onClick={() => duplicateHandler(item.id)} className="btn btn-sm btn-outline-secondary me-2 shadow-sm">Duplicate</button>
                                                    <button onClick={() => handleEditClick(item)} className="btn btn-sm btn-primary me-2 shadow-sm" data-bs-toggle="modal" data-bs-target="#editNewpageModal">Edit / Preview</button>
                                                    
                                                    {/* 🌟 Quick Approve for Admins */}
                                                    {canPublish && item.status === 'Pending Approval' && (
                                                        <button className="btn btn-sm btn-success me-2 shadow-sm fw-bold" onClick={() => quickApproveHandler(item.id)}>
                                                            <i className="bi bi-check-circle me-1"></i> Approve
                                                        </button>
                                                    )}

                                                    {canDelete && (
                                                        <button className="btn btn-sm btn-danger shadow-sm" onClick={() => deleteHandler(item.id)}>Delete</button>
                                                    )}
                                                </td>
                                            </tr>
                                        )) : (<tr><td colSpan="6" className="text-center py-4 text-muted">No pages found.</td></tr>)}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Create Modal */}
            <div className="modal fade" id="addNewpageModal" tabIndex="-1" aria-hidden="true" data-bs-focus="false">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content border-0">
                        <div className="modal-header bg-dark text-white py-3">
                            <h5 className="modal-title fw-bold">Create New Page</h5>
                            <button type="button" id="addNewpageModalClose" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleAddSubmit}>
                            {renderFormBody()}
                            <div className="modal-footer bg-white border-top shadow-sm position-sticky bottom-0">
                                <button type="button" className="btn btn-secondary px-4" data-bs-dismiss="modal">Close</button>
                                <button className="btn btn-primary px-5 fw-bold" type="submit">Save Page</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <div className="modal fade" id="editNewpageModal" tabIndex="-1" aria-hidden="true" data-bs-focus="false">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content border-0">
                        <div className="modal-header bg-dark text-white py-3">
                            <h5 className="modal-title fw-bold">Edit Page: {formData.title}</h5>
                            <button type="button" id="editNewpageModalClose" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleEditSubmit}>
                            {renderFormBody()}
                            <div className="modal-footer bg-white border-top shadow-sm position-sticky bottom-0">
                                <button type="button" className="btn btn-secondary px-4" data-bs-dismiss="modal">Close</button>
                                <button className="btn btn-primary px-5 fw-bold" type="submit">Update Page</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Advanced SEO Content Modal */}
            <div className="modal fade" id="seoContentModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header bg-info text-white">
                            <h5 className="modal-title fw-bold">Search Engine Optimization (SEO)</h5>
                            <button type="button" id="seoContentModalClose" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleSeoContentSubmit}>
                            <div className="modal-body p-4 row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">URL Slug *</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light text-muted small">/</span>
                                        <input type="text" className="form-control" name="slug" placeholder="about-us" value={formSeoContentData.slug} onChange={handleSeoContentInputChange} required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Canonical URL</label>
                                    <input type="text" className="form-control" name="canonical_url" placeholder="https://..." value={formSeoContentData.canonical_url} onChange={handleSeoContentInputChange} />
                                </div>

                                <div className="col-md-12 mt-3">
                                    <label className="form-label fw-bold">Meta Title</label>
                                    <input type="text" className="form-control" name="meta_title" placeholder="Title shown on Google" value={formSeoContentData.meta_title} onChange={handleSeoContentInputChange} required />
                                </div>
                                <div className="col-md-12 mt-3">
                                    <label className="form-label fw-bold">Meta Description</label>
                                    <textarea className="form-control" name="meta_description" placeholder="Short description for search results" value={formSeoContentData.meta_description} onChange={handleSeoContentInputChange} rows="2" required></textarea>
                                </div>

                                {/* Index Control (Robots) */}
                                <div className="col-md-6 mt-3">
                                    <label className="form-label fw-bold">Search Engine Indexing</label>
                                    <select className="form-select" name="meta_robots_index" value={formSeoContentData.meta_robots_index} onChange={handleSeoContentInputChange}>
                                        <option value="index">Index (Allow search engines)</option>
                                        <option value="noindex">No Index (Hide from search engines)</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className="form-label fw-bold">Link Following</label>
                                    <select className="form-select" name="meta_robots_follow" value={formSeoContentData.meta_robots_follow} onChange={handleSeoContentInputChange}>
                                        <option value="follow">Follow (Follow links on page)</option>
                                        <option value="nofollow">No Follow (Do not follow links)</option>
                                    </select>
                                </div>

                                <div className="col-md-12 mt-4">
                                    <h6 className="fw-bold text-primary border-bottom pb-2">XML Sitemap Controls</h6>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-check form-switch bg-light rounded border p-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="pageIncludeInSitemap"
                                            name="include_in_sitemap"
                                            checked={Boolean(formSeoContentData.include_in_sitemap)}
                                            onChange={handleSeoContentInputChange}
                                        />
                                        <label className="form-check-label fw-bold ms-2" htmlFor="pageIncludeInSitemap">
                                            Include this page in sitemap.xml
                                        </label>
                                        <small className="d-block text-muted mt-1">
                                            Turn this off to exclude the page from the XML sitemap even if it is indexable.
                                        </small>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className="form-label fw-bold">Sitemap Change Frequency</label>
                                    <select
                                        className="form-select"
                                        name="sitemap_change_frequency"
                                        value={formSeoContentData.sitemap_change_frequency}
                                        onChange={handleSeoContentInputChange}
                                    >
                                        {SITEMAP_CHANGE_FREQUENCY_OPTIONS.map((option) => (
                                            <option key={option} value={option}>
                                                {option.charAt(0).toUpperCase() + option.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <label className="form-label fw-bold">Sitemap Priority</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="sitemap_priority"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={formSeoContentData.sitemap_priority}
                                        onChange={handleSeoContentInputChange}
                                    />
                                    <small className="text-muted">Use a value between 0.0 and 1.0.</small>
                                </div>

                                {/* Open Graph (OG) Tags */}
                                <div className="col-md-12 mt-4">
                                    <h6 className="fw-bold text-primary border-bottom pb-2">Social Media (Open Graph) Tags</h6>
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label className="form-label fw-bold">OG Title</label>
                                    <input type="text" className="form-control" name="og_title" placeholder="Social Media Title" value={formSeoContentData.og_title} onChange={handleSeoContentInputChange} />
                                </div>
                                <div className="col-md-6 mt-2">
                                    <label className="form-label fw-bold">OG Image URL</label>
                                    <input type="text" className="form-control" name="og_image" placeholder="https://.../image.jpg" value={formSeoContentData.og_image} onChange={handleSeoContentInputChange} />
                                </div>
                                <div className="col-md-12 mt-3">
                                    <label className="form-label fw-bold">OG Description</label>
                                    <textarea className="form-control" name="og_description" placeholder="Description for social shares" value={formSeoContentData.og_description} onChange={handleSeoContentInputChange} rows="2"></textarea>
                                </div>

                                <div className="col-md-12 mt-4 border-top pt-3">
                                    <label className="form-label fw-bold">Meta Keywords</label>
                                    <input type="text" className="form-control" name="meta_keywords" placeholder="e.g. interior, design, home" value={formSeoContentData.meta_keywords} onChange={handleSeoContentInputChange} />
                                </div>
                                <div className="col-md-12 mt-3">
                                    <label className="form-label fw-bold">Custom Head Scripts (Optional)</label>
                                    <textarea className="form-control" name="custom_code" placeholder="<script>...</script>" value={formSeoContentData.custom_code} onChange={handleSeoContentInputChange} rows="2"></textarea>
                                </div>
                            </div>
                            <div className="modal-footer bg-light">
                                <button className="btn btn-info px-5 text-white fw-bold" type="submit">Save SEO Data</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthMainLayout>
    );
};

export default CmsPages;
