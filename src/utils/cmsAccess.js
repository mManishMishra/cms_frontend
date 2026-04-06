export const DEFAULT_CMS_PERMISSIONS = Object.freeze({
    canPublish: false,
    canDelete: false,
});

export function getCmsAccess(user) {
    const role = user?.role?.toLowerCase?.() || "";
    const isAdmin = role === "admin";
    const permissions = user?.cms_permissions || user?.cmsPermissions || DEFAULT_CMS_PERMISSIONS;

    return {
        role,
        isAdmin,
        isEditor: role === "editor",
        canPublish: isAdmin || Boolean(permissions?.canPublish),
        canDelete: isAdmin || Boolean(permissions?.canDelete),
    };
}

export function getPublishWorkflowMessage(itemLabel = "This content") {
    return `${itemLabel} will be saved for admin approval because your account cannot publish directly.`;
}

export function getDeletePermissionMessage(itemLabel = "this item") {
    return `You do not have permission to delete ${itemLabel}. Please contact an administrator.`;
}
