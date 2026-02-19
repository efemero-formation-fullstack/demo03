export class DateInThePastError extends Error {
  statusCode = 400;

  constructor() {
    super("The date cannot be in the past");
  }
}

export class OrganizerDoesNotExist extends Error {
  statusCode = 400;

  constructor(id) {
    super(`The organizer with the ID "${id}" doesnt exist.`);
  }
}
