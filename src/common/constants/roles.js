const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  EDITOR: 'editor',
};

const CREATE_RULES = {
  [ROLES.SUPER_ADMIN]: new Set([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR]),
  [ROLES.ADMIN]: new Set([ROLES.ADMIN, ROLES.EDITOR]),
  [ROLES.EDITOR]: new Set([ROLES.EDITOR]),
};

const DELETE_RULES = {
  [ROLES.SUPER_ADMIN]: new Set([ROLES.ADMIN, ROLES.EDITOR]),
  [ROLES.ADMIN]: new Set([ROLES.EDITOR]),
  [ROLES.EDITOR]: new Set([]),
};

function canCreateRole(actorRole, targetRole) {
  return CREATE_RULES[actorRole]?.has(targetRole) ?? false;
}

function canDeleteRole(actorRole, targetRole) {
  return DELETE_RULES[actorRole]?.has(targetRole) ?? false;
}

export { ROLES, canCreateRole, canDeleteRole };
