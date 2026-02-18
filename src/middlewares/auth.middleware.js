import { decodeToken } from "../utils/jwt.utils.js";

// Fonction d'authentification (récupération du token et le décodage)
export const authentification = (req, res, next) => {
  // bearerToken = "Bearer azeazfczjhvduiazufhed"
  const bearerToken = req.headers["authorization"];

  if (bearerToken) {
    // extraction du token
    const [bearer, token] = bearerToken.split(" ");
    if (bearer.toLowerCase() !== "bearer") {
      res.status(403).send();
      return;
    }

    // decodage
    try {
      const decoded = decodeToken(token);
      console.log(decoded);

      // sauvegarde dans l'objet req
      req.user = {
        id: decoded.id,
        role: decoded.role,
      };
    } catch (err) {
      res.status(401).send();
      return;
    }
  }

  next();
};

// Fonction restriction pour arriver à la route (ex:"est-ce que le user est admin?")
export const connected = (onlyForRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401).send();
      return;
    }

    // si on a des roles qui sont préciser, on check le role du user
    if (onlyForRoles) {
      // récuperer le role du user
      const userRole = req.user.role;

      // vérifie si le role du role fait partie du tableau
      if (!onlyForRoles.includes(userRole)) {
        res.status(403).send();
        return;
      }
    }

    next();
  };
};
