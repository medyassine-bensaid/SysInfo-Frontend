import { Team } from "./team.model";

export class Employee {
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    phoneNumber!: number;
    fonction!: string;
    profile!: string;

    teams?: Team[]; // Teams the user is a member of
    ledTeams?: Team[]; // Teams the user leads
  }
  