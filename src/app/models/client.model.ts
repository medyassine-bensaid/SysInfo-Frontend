import { Project } from "./project.model";

export class Client {
    id!: number;
    name!: string;
    email!: string;
    phoneNumber!: number;
    clientType!: string;

    projects?: Project[]; // Projects associated with the client

  }
  