"use client"
import AuthMainLayout from '@/app/layouts/auth/AuthMainLayout';
import api from '@/utils/api';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const CKEditorComponent = dynamic(() => import('@/app/components/CKEditorComponent'), { ssr: false });

const CmsTermAndCondition = () => {
    const authToken = useSelector((state) => state.auth.authToken);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [pageData, setPageData] = useState("");

    const fetchContentManagerPages = useCallback(async () => {
        try {
            const response = await api.get("/cms-content/term_and_condition", {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });
            if (response.data && response.data.json_content) {
                setPageData(response.data?.json_content?.html);
                setSelectedId(response.data.id);
            }
            setLoading(false);

        } catch (err) {
            toast.error(err.message ?? "Failed to fetch data. Please try again.");
            setLoading(false);
        }
    }, [authToken]);

    useEffect(() => {
        fetchContentManagerPages();
    }, [fetchContentManagerPages]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("json_content[html]", pageData);

        try {
            // Send POST request to save form data
            const response = await api.patch(`/cms-content/${selectedId}`, formDataToSend, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`, // Send auth token
                },
            });

            // Handle success response
            if (response.status === 200) {
                fetchContentManagerPages();
                toast.success("Form submitted successfully.");


            } else {
                toast.error("Error submitting form. Please try again.");
            }
        } catch (error) {
            toast.error(error.message ?? "Error submitting form. Please try again.");
            console.error("Error:", error);
        }
    };


    return (
        <AuthMainLayout>
            <div className="container my-5">
                <h1 className="mb-4 text-center">CMS - Term and Condition</h1>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <>
                        {pageData && (
                            <>
                                <CKEditorComponent pageData={pageData} setPageData={setPageData} />
                                <div className="m-auto mt-2 col-12 d-flex justify-content-center">
                                    <button className="px-5 read_morebtn" onClick={handleSubmit}>
                                        Save Changes
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </AuthMainLayout>
    );
}

export default CmsTermAndCondition;