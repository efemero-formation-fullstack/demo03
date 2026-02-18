export const bodyValidator = (dataValidator) => {
  return (req, res, next) => {
    const { data, success, error } = dataValidator.safeParse(req.body);

    if (!success) {
      // Le formulaire reçu n'est pas valide
      // gerer les erreurs
      const { fieldErrors } = error.flatten();

      res.status(400).json({
        errors: fieldErrors,
      });
    } else {
      // Le formulaire reçu est valide
      req.data = data;
      next();
    }
  };
};
