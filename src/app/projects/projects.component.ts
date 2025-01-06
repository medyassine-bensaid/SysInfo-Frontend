// import { Component , OnInit} from '@angular/core';
// import { ProjectService } from '../services/project.service';
// import {  Project } from '../models/project.model';
// import { Team } from '../models/team.model';
// import { Client } from '../models/client.model';
// import { TeamService } from '../services/team.service';
// import { ClientService } from '../services/client.service';

// @Component({
//   selector: 'app-projects',
//   templateUrl: './projects.component.html',
//   styleUrls: ['./projects.component.css']
// })
// export class ProjectsComponent  implements OnInit {

//   teams: Team[] = [];
//   clients: Client[] = [];
//   projects: Project[] = [];
//   project: Project = {
//     id: 0,
//     name: '',
//     startDate: new Date(),
//     endDate: new Date(),
//     TeamIds: [],
//     ClientIds: [],

//   };
//   selectedProject: Project = {
//     id: 0,
//     name: '',
//     startDate: new Date(),
//     endDate: new Date(),
//     TeamIds: [],
//     ClientIds: [],


// };

//   isModalOpen = false;
//   isUpdateModalOpen = false;

//   constructor(private projectService: ProjectService , private teamService: TeamService , private clientService: ClientService) {}

//   ngOnInit(): void {
//       this.loadTeams();
//       this.loadClients();
//       this.loadProjects();
//   }

//     loadTeams(): void {
//     this.teamService.getTeams().subscribe(
//       (data) => (this.teams = data),
//       (error) => console.error('Failed to fetch teams:', error)
//     );
//   }
//   loadClients(): void {
//       this.clientService.getClients().subscribe(
//         (data) => (this.clients = data),
//         (error) => console.error('Failed to fetch clients:', error)
//       );
//     }

//   loadProjects(): void {
//     this.projectService.getProjects().subscribe(
//       (data) => (this.projects = data),
//       (error) => console.error('Failed to fetch projects:', error)
//     );
//   }

//   // Open Add Modal
//   openModal(): void {
//     const modal = document.getElementById('addProjectModal');
//     if (modal) {
//       modal.classList.add('show');
//       modal.style.display = 'block';
//       this.isModalOpen = true;
//       this.resetProjectForm();
//     }
//   }

//   // Close Add Modal
//   closeModal(): void {
//     const modal = document.getElementById('addProjectModal');
//     if (modal) {
//       modal.classList.remove('show');
//       modal.style.display = 'none';
//       this.isModalOpen = false;
//     }
//   }

//   // Add project
//   onSubmit(): void {
//       this.project.startDate = new Date(this.project.startDate);
//       this.project.endDate = new Date(this.project.endDate);
//     this.projectService.addProject(this.project).subscribe(
//       () => {
//         this.loadProjects();
//         this.closeModal();
//         this.resetProjectForm();
//       },
//       (error) => console.error('Failed to add project:', error)
//     );
//   }

//   resetProjectForm(): void {
//     this.project = {
//       id: 0,
//       name: '',
//       startDate: new Date(),
//       endDate: new Date(),
//       TeamIds: [],
//     ClientIds: [],


//     };
//   }



//     // Team Selection Logic (Add modal)
//   toggleTeamSelection(team: Team): void {
//     if(this.project.teams){
//     if (this.isSelectedTeam(team)) {
//       this.project.teams = this.project.teams.filter((t) => t.id !== team.id);
//     } else {
//       this.project.teams.push(team);
//     }
//   }
//     else {
//         this.project.teams = [team] ;
//     }
//   }

//   isSelectedTeam(team: Team): boolean {
//     return !!this.project.teams?.find((t) => t.id === team.id);
//   }
//     unselectTeam(team: Team): void {
//         if (this.project.teams) {
//            this.project.teams = this.project.teams.filter((t) => t.id !== team.id);
//         }
//     }
//     // Client Selection Logic (Add modal)
//     toggleClientSelection(client: Client): void {
//         if (this.project.clients){
//             if (this.isSelectedClient(client)) {
//             this.project.clients = this.project.clients.filter((c) => c.id !== client.id);
//             } else {
//                 this.project.clients.push(client);
//             }
//         }
//         else {
//            this.project.clients = [client];
//         }

//     }
//   isSelectedClient(client: Client): boolean {
//     return !!this.project.clients?.find((c) => c.id === client.id);
//   }
//     unselectClient(client: Client): void {
//         if (this.project.clients) {
//             this.project.clients = this.project.clients.filter((c) => c.id !== client.id);
//         }
//     }

//     // Team Selection Logic (Update Modal)
//     toggleUpdateTeamSelection(team: Team): void {
//         if(this.selectedProject.teams){
//             if (this.isUpdateSelectedTeam(team)) {
//                 this.selectedProject.teams = this.selectedProject.teams.filter((t) => t.id !== team.id);
//             } else {
//                 this.selectedProject.teams.push(team);
//             }
//         }
//         else {
//             this.selectedProject.teams= [team] ;
//         }
//     }

//     isUpdateSelectedTeam(team: Team): boolean {
//         return !!this.selectedProject.teams?.find((t) => t.id === team.id);
//     }
//     unselectUpdateTeam(team: Team): void {
//         if(this.selectedProject.teams) {
//           this.selectedProject.teams=  this.selectedProject.teams.filter((t) => t.id !== team.id);
//         }
//     }
// // Client Selection Logic (Update Modal)
//     toggleUpdateClientSelection(client: Client): void {
//         if (this.selectedProject.clients){
//             if (this.isUpdateSelectedClient(client)) {
//                 this.selectedProject.clients = this.selectedProject.clients.filter((c) => c.id !== client.id);
//             } else {
//                 this.selectedProject.clients.push(client);
//             }
//         }
//         else {
//             this.selectedProject.clients = [client];
//         }

//     }
//     isUpdateSelectedClient(client: Client): boolean {
//         return !!this.selectedProject.clients?.find((c) => c.id === client.id);
//     }
//     unselectUpdateClient(client: Client): void {
//         if (this.selectedProject.clients){
//           this.selectedProject.clients=  this.selectedProject.clients.filter((c) => c.id !== client.id);
//         }
//     }

  
//   // Open Update Modal
//   openUpdateModal(project: Project): void {
//     this.selectedProject = { ...project,  startDate: new Date(project.startDate),
//     endDate: new Date(project.endDate),};

//     const modal = document.getElementById('updateProjectModal');
//     if (modal) {
//       modal.classList.add('show');
//       modal.style.display = 'block';
//       this.isUpdateModalOpen = true;
//     }
//   }

//   // Close Update Modal
//   closeUpdateModal(): void {
//     const modal = document.getElementById('updateProjectModal');
//     if (modal) {
//       modal.classList.remove('show');
//       modal.style.display = 'none';
//       this.isUpdateModalOpen = false;
//     }


//   }

//   // Update Employee
//   onUpdateSubmit(): void {
//       if (this.selectedProject) {
//           this.selectedProject.startDate = new Date(this.selectedProject.startDate);
//           this.selectedProject.endDate = new Date(this.selectedProject.endDate);
//       this.projectService.updateProject(this.selectedProject.id, this.selectedProject).subscribe(
//         () => {
//           this.loadProjects();
//           this.closeUpdateModal();
//         },
//         (error) => console.error('Failed to update project:', error)
//       );
//     }
//   }

  
//   fetchEmployees(): void {
//     this.projectService.getProjects().subscribe(
//       (data) => {
//         this.projects = data; // Assuming `employees` is an array
//       },
//       (error) => {
//         console.error('Error fetching projects:', error);
//       }
//     );
//   }
  
//   deleteProject(id: number): void {
//     if (confirm('Are you sure you want to delete this project?')) {
//       this.projectService.deleteProject(id).subscribe(
//         () => {
//           console.log(`project with ID ${id} deleted successfully.`);
//           this.fetchEmployees(); // Refresh the project list after deletion

//         },
//         (error) => {
//           console.error('Error deleting project:', error);
//         }
//       );
//     }
//   }
// }



/////////////////

import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
import { Team } from '../models/team.model';
import { Client } from '../models/client.model';
import { TeamService } from '../services/team.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  teams: Team[] = [];
  clients: Client[] = [];
  projects: Project[] = [];
  project: Project = {
    id: 0,
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    TeamIds: [],
    ClientIds: [],
  };
  selectedProject: Project = {
    id: 0,
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    TeamIds: [],
    ClientIds: [],
  };
  startDate : string = ""
  endDate : string = ""

  isModalOpen = false;
  isUpdateModalOpen = false;

  constructor(
    private projectService: ProjectService,
    private teamService: TeamService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.loadTeams();
    this.loadClients();
    this.loadProjects();
  }

  loadTeams(): void {
    this.teamService.getTeams().subscribe(
      (data) => (this.teams = data),
      (error) => console.error('Failed to fetch teams:', error)
    );
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(
      (data) => (this.clients = data),
      (error) => console.error('Failed to fetch clients:', error)
    );
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(
      (data) => (this.projects = data),
      (error) => console.error('Failed to fetch projects:', error)
    );
  }

  openModal(): void {
    const modal = document.getElementById('addProjectModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      this.isModalOpen = true;
      this.resetProjectForm();
    }
  }

  closeModal(): void {
    const modal = document.getElementById('addProjectModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.isModalOpen = false;
    }
  }

  onSubmit(): void {
    this.project.startDate = new Date(this.startDate);
    this.project.endDate = new Date(this.endDate);
    this.projectService.addProject(this.project).subscribe(
      () => {
        this.loadProjects();
        this.closeModal();
        this.resetProjectForm();
      },
      (error) => console.error('Failed to add project:', error)
    );
  }

  resetProjectForm(): void {
    this.project = {
      id: 0,
      name: '',
      startDate: new Date(),
      endDate: new Date(),
      TeamIds: [],
      ClientIds: [],
    };
  }

  // Team Selection
  toggleTeamSelection(team: Team): void {
    const index = this.project.TeamIds.indexOf(team.id);
    if (index > -1) {
      this.project.TeamIds.splice(index, 1);
    } else {
      this.project.TeamIds.push(team.id);
    }
    console.log(this.project.TeamIds);
    
  }

  isSelectedTeam(team: Team): boolean {
    return this.project.TeamIds.includes(team.id);
  }

  unselectTeam(team: Team): void {
    this.project.TeamIds = this.project.TeamIds.filter((id) => id !== team.id);
    
    console.log(this.project.TeamIds);
  }

  getSelectedTeams(): Team[] {
    return this.teams.filter((team) => this.project.TeamIds.includes(team.id));
  }

  // Client Selection
  toggleClientSelection(client: Client): void {
    const index = this.project.ClientIds.indexOf(client.id);
    if (index > -1) {
      this.project.ClientIds.splice(index, 1);
    } else {
      this.project.ClientIds.push(client.id);
    }
  }

  isSelectedClient(client: Client): boolean {
    return this.project.ClientIds.includes(client.id);
  }

  unselectClient(client: Client): void {
    this.project.ClientIds = this.project.ClientIds.filter((id) => id !== client.id);
    
    console.log(this.project.ClientIds);
  }

  getSelectedClients(): Client[] {
    return this.clients.filter((client) => this.project.ClientIds.includes(client.id));
  }

  dateFormat(date: Date) {
    // Correctly format date to YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  // Update Modal Logic
  openUpdateModal(project: Project): void {
    
    this.selectedProject = {
      ...project,
      startDate: new Date(project.startDate),
      endDate: new Date(project.endDate)
    };
    this.startDate = this.dateFormat(this.selectedProject.startDate)
    this.endDate = this.dateFormat(this.selectedProject.endDate)
    
    if (this.selectedProject.teams != undefined) {
      for (const team of this.selectedProject.teams) {
        if (team) {
          this.toggleTeamSelection(team);
        }
      }
    }
    
    if (this.selectedProject.clients != undefined) {
      for (const client of this.selectedProject.clients) {
        if (client) {
          this.toggleClientSelection(client);
        }
      }
    }
    
    const modal = document.getElementById('updateProjectModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      this.isUpdateModalOpen = true;
    }
  }
  
  closeUpdateModal(): void {
    const modal = document.getElementById('updateProjectModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.isUpdateModalOpen = false;
      
      if (this.teams != undefined) {
        for (const team of this.teams) {
          if (team) {
            this.unselectTeam(team);
          }
        }
      }
      
      if (this.clients != undefined) {
        for (const client of this.clients) {
          if (client) {
            this.unselectClient(client);
          }
        }
      }
    }
  }
  
  onUpdateSubmit(): void {
    this.selectedProject.startDate = new Date(this.startDate);
    this.selectedProject.endDate = new Date(this.endDate);
    this.selectedProject.clients = this.getSelectedClients();
    this.selectedProject.teams = this.getSelectedTeams();
    this.projectService.updateProject(this.selectedProject.id, this.selectedProject).subscribe(
      () => {
        this.loadProjects();
        this.closeUpdateModal();
      },
      (error) => console.error('Failed to update project:', error)
    );
  }

  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe(
        () => {
          this.loadProjects();
        },
        (error) => console.error('Error deleting project:', error)
      );
    }
  }
}
