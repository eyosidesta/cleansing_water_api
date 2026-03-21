function validate(schema, source = 'body') {
  return (req, _res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const error = new Error('Validation failed.');
      error.statusCode = 400;
      error.details = result.error.issues;
      return next(error);
    }

    req.validated = req.validated ?? {};
    req.validated[source] = result.data;
    return next();
  };
}

export { validate };
