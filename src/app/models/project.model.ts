import { Client } from "./client.model";
import { Team } from "./team.model";

export class Project {
    id!: number;
    name!: string;
    startDate!: Date;
    endDate!: Date;
    //team! : string; 
    //client!: string;

  //clientId?: number;
  clients?: Client[]; // The client for the project

  teams?: Team[]; // Teams working on the project
  }
  