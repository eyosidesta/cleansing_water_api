function allowRoles(...allowedRoles) {
  return (req, _res, next) => {
    const role = req.user?.role;
    if (!role || !allowedRoles.includes(role)) {
      const error = new Error('Forbidden: insufficient permissions.');
      error.statusCode = 403;
      return next(error);
    }

    return next();
  };
}

export { allowRoles };
