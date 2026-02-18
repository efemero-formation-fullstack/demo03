import sequelize from "./config.js";

import User from "./entities/user.entity.js";
import Concert from "./entities/concert.entity.js";
import Ticket from "./entities/ticket.entity.js";

/* RELATIONS */
// Concert is organised by a User
Concert.belongsTo(User, {
  as: "organizer",
  foreignKey: {
    allowNull: false,
    name: "organizerId",
  },
});
// A User can organise multiple concert
User.hasMany(Concert, {
  as: "concerts",
  foreignKey: "organizerId",
});

// A ticket is for a concert
Ticket.belongsTo(Concert, {
  as: "concert",
  foreignKey: {
    allowNull: false,
    name: "concertId",
  },
});
// A Concert can have multiple Tickets
Concert.hasMany(Ticket, {
  as: "tickets",
  foreignKey: "concertId",
});

// A Ticket is owned by a User
Ticket.belongsTo(User, {
  as: "owner",
  foreignKey: {
    allowNull: false,
    name: "ownerId",
  },
});
// A User can have multiple Tickets
User.hasMany(Ticket, {
  foreignKey: "ownerId",
});

export default {
  User,
  Concert,
  Ticket,
  sequelize,
};

// Autre méthode pour exporter:
// export const User = User;
// export const Concert = Concert;
// export const Ticket = Ticket;
// export const sequelize = sequelize;

// Pour l'import il faudra faire:
// import {sequelize} from "./database/index.js";
