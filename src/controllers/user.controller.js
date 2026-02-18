import { UserListingDTO } from "../dtos/user.dto.js";
import userService from "../services/user.service.js";

const userController = {
  getAll: async (req, res) => {
    const users = await userService.getAll();

    // convertir l'objet de la DB en DTO
    const usersDTO = users.map((u) => new UserListingDTO(u));

    res.status(200).json({ data: usersDTO });
  },
};

export default userController;
