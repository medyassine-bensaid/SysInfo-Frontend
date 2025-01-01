import { Employee } from "./employee.model";
import { Project } from "./project.model";

export class Team {
    id!: number;
    name!: string;
    members!: number;
   // teamLeader!: string;

   teamLeaderId?: number;
  teamLeader?: Employee; // Leader of the team

  teamMembers?: Employee[]; // Members of the team
  projects?: Project[]; // Projects assigned to the team
    
  }
  