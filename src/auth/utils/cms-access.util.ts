import { ForbiddenException } from '@nestjs/common';
import { CmsStatus } from '../enums/cms-status.enum';
import { Role } from '../enums/role.enum';

export type CmsPermissions = {
  canPublish: boolean;
  canDelete: boolean;
};

export const DEFAULT_EDITOR_CMS_PERMISSIONS: CmsPermissions = Object.freeze({
  canPublish: false,
  canDelete: false,
});

export const DEFAULT_ADMIN_CMS_PERMISSIONS: CmsPermissions = Object.freeze({
  canPublish: true,
  canDelete: true,
});

export function normalizeCmsPermissions(
  permissions?: Partial<CmsPermissions> | null,
  role?: string,
): CmsPermissions {
  const normalizedRole = role?.toLowerCase();

  if (normalizedRole === Role.Admin.toLowerCase()) {
    return { ...DEFAULT_ADMIN_CMS_PERMISSIONS };
  }

  return {
    canPublish: Boolean(permissions?.canPublish),
    canDelete: Boolean(permissions?.canDelete),
  };
}

export function getDefaultCmsPermissions(role?: string): CmsPermissions {
  return normalizeCmsPermissions(undefined, role);
}

export function getEffectiveCmsPermissions(user?: {
  role?: string;
  cms_permissions?: Partial<CmsPermissions> | null;
  cmsPermissions?: Partial<CmsPermissions> | null;
}): CmsPermissions {
  return normalizeCmsPermissions(
    user?.cms_permissions ?? user?.cmsPermissions,
    user?.role,
  );
}

export function canPublishCmsContent(user?: {
  role?: string;
  cms_permissions?: Partial<CmsPermissions> | null;
}) {
  return getEffectiveCmsPermissions(user).canPublish;
}

export function canDeleteCmsContent(user?: {
  role?: string;
  cms_permissions?: Partial<CmsPermissions> | null;
}) {
  return getEffectiveCmsPermissions(user).canDelete;
}

export function ensureCmsDeletePermission(user?: {
  role?: string;
  cms_permissions?: Partial<CmsPermissions> | null;
}) {
  if (!canDeleteCmsContent(user)) {
    throw new ForbiddenException(
      'You do not have permission to delete CMS records. Please contact an administrator.',
    );
  }
}

export function resolvePublishStatus(
  status: string | undefined | null,
  user?: {
    role?: string;
    cms_permissions?: Partial<CmsPermissions> | null;
  },
  options?: {
    publishedStatus?: string;
    fallbackStatus?: string;
  },
) {
  if (!status || canPublishCmsContent(user)) {
    return status;
  }

  const publishedStatus = options?.publishedStatus || CmsStatus.Published;
  const fallbackStatus = options?.fallbackStatus || CmsStatus.Pending;

  return status === publishedStatus ? fallbackStatus : status;
}

export function resolveActiveStatus(
  status: string | undefined | null,
  user?: {
    role?: string;
    cms_permissions?: Partial<CmsPermissions> | null;
  },
  options?: {
    activeStatus?: string;
    inactiveStatus?: string;
  },
) {
  if (!status || canPublishCmsContent(user)) {
    return status;
  }

  const activeStatus = (options?.activeStatus || 'active').toLowerCase();
  const inactiveStatus = options?.inactiveStatus || 'inactive';

  return status.toLowerCase() === activeStatus ? inactiveStatus : status;
}

export function resolveBooleanPublishState(
  value: boolean | string | undefined | null,
  user?: {
    role?: string;
    cms_permissions?: Partial<CmsPermissions> | null;
  },
) {
  if (value === undefined || value === null || canPublishCmsContent(user)) {
    return value;
  }

  if (typeof value === 'boolean') {
    return value ? false : value;
  }

  const normalizedValue = value.toLowerCase().trim();
  if (normalizedValue === 'true' || normalizedValue === 'active') {
    return false;
  }

  return value;
}
