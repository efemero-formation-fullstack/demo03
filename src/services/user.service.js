import dayjs from "dayjs";
import bcrypt from "bcrypt";
import db from "../database/index.js";
import {
  EmailAlreadyExistsError,
  InvalidCredentialsError,
  UserTooYoungError,
} from "../custom-errors/user.error.js";

const { ENCRYPTION_ROUND } = process.env;

const userService = {
  create: async (data) => {
    // pas deux fois le même email
    const existingEmail = await db.User.findOne({
      where: {
        email: data.email,
      },
    });
    if (existingEmail) {
      throw new EmailAlreadyExistsError();
    }

    // plus de 18ans
    // dayjs() donne la date d'aujourd'hui
    const checkDate = dayjs().subtract(18, "year");
    const birthDate = dayjs(data.birthDate);
    if (birthDate > checkDate) {
      throw new UserTooYoungError();
    }

    data.password = bcrypt.hashSync(data.password, +ENCRYPTION_ROUND);

    const newUser = await db.User.create(data);
    return newUser;
  },
  login: async (credentials) => {
    const existingEmail = await db.User.findOne({
      where: {
        email: credentials.email,
      },
    });

    if (!existingEmail) {
      throw new InvalidCredentialsError();
    }

    const checkPassword = bcrypt.compareSync(
      credentials.password,
      existingEmail.password,
    );

    if (!checkPassword) {
      throw new InvalidCredentialsError();
    }

    return existingEmail;
  },
  getAll: async () => {
    const users = await db.User.findAll();
    return users;
  },
};

export default userService;
