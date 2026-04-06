import api from "@/utils/api";

export const normalizeLeadPath = (path = "/") => {
    const rawPath = String(path || "/").split("?")[0].trim();

    if (!rawPath || rawPath === "*") {
        return "/";
    }

    let normalizedPath = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;

    if (normalizedPath.length > 1) {
        normalizedPath = normalizedPath.replace(/\/+$/, "");
    }

    return normalizedPath || "/";
};

export const getLeadDeviceType = () => {
    if (typeof window === "undefined") {
        return "desktop";
    }

    return window.innerWidth <= 768 ? "mobile" : "desktop";
};

export const resolveLeadRule = async (path) => {
    const response = await api.get("/popup-rules/resolve", {
        params: {
            path: normalizeLeadPath(path),
        },
    });

    return response.data || null;
};

export const buildLeadMetadata = ({
    pathname,
    leadFormType = "inline",
    rule = null,
    leadFormName = "",
    triggerType = "",
    ctaText = "",
    deviceType = "",
}) => ({
    source_url: normalizeLeadPath(pathname),
    lead_form_name: leadFormName || rule?.lead_form_name || null,
    lead_form_type: leadFormType || null,
    trigger_type: triggerType || rule?.trigger_type || null,
    cta_text: ctaText || rule?.cta_text || null,
    device_type: deviceType || getLeadDeviceType(),
});
