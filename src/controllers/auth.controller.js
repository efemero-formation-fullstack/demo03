import userService from "../services/user.service.js";
import { generateToken } from "../utils/jwt.utils.js";

const authController = {
  register: async (req, res) => {
    await userService.create(req.data);

    res.status(204).send();
  },
  login: async (req, res) => {
    const user = await userService.login(req.data);

    // générer un JWT (JsonWebToken)
    const token = generateToken(user);

    // donner le JWT au client
    res.status(200).json({ token });
  },
};

export default authController;
