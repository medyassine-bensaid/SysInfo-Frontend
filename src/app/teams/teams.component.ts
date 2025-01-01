import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';
import { Team } from '../models/team.model';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service'; // Import the EmployeeService


@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
    teams: Team[] = [];
    employees: Employee[] = [];
    team: Team = {
        id: 0,
        name: '',
        members: 0,
        teamMembers: [],
        // teamLeader: '',
    };
    selectedTeam: Team = {
        id: 0,
        name: '',
        members: 0,
        teamMembers: [],
        // teamLeader:'',

    };

    isModalOpen = false;
    isUpdateModalOpen = false;

    constructor(
        private teamService: TeamService,
        private employeeService: EmployeeService
    ) {} // Inject the EmployeeService

    ngOnInit(): void {
        this.loadTeams();
        this.loadEmployees();
    }

    loadTeams(): void {
        this.teamService.getTeams().subscribe(
            (data) => (this.teams = data),
            (error) => console.error('Failed to fetch teams:', error)
        );
    }

    loadEmployees(): void {
        this.employeeService.getEmployees().subscribe(
            (data) => (this.employees = data),
            (error) => console.error('Failed to fetch employees:', error)
        );
    }

    // Open Add Modal
    openModal(): void {
        const modal = document.getElementById('addTeamModal');
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'block';
            this.isModalOpen = true;
            this.resetTeamForm()
        }
    }

    // Close Add Modal
    closeModal(): void {
        const modal = document.getElementById('addTeamModal');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
            this.isModalOpen = false;
        }
    }

    // Add team
    onSubmit(): void {
        this.team.members = this.team.teamMembers ? this.team.teamMembers.length : 0;
        this.teamService.addTeam(this.team).subscribe(
            () => {
              console.log(this.team)
                this.loadTeams();
                console.log(this.loadTeams())
                this.closeModal();
                this.resetTeamForm();
            },
            (error) => console.error('Failed to add team:', error)
        );
    }

    resetTeamForm(): void {
        this.team = {
            id: 0,
            name: '',
            members: 0,
            teamMembers: [],
            teamLeader: undefined,
            //teamLeader:'',
        };
    }


    // Team Member Selection Logic
    toggleMemberSelection(employee: Employee): void {
        if (this.team.teamMembers) {
            if (this.isSelectedMember(employee)) {
                this.team.teamMembers = this.team.teamMembers.filter((m) => m.id !== employee.id);
            } else {
                this.team.teamMembers.push(employee);
            }
        }
        else {
            this.team.teamMembers = [employee];
        }

    }


  // toggleMemberSelection(employee: any) {
  //   this.loadEmployees()
  //   // const index = this.team.teamMembers?.findIndex((member) => member.id === employee.id);
  //   // if (index === -1) {
  //   //    this.team.teamMembers?.push(employee);
  //   //  } else {
  //   //    this.team.teamMembers?.splice(0, 1);
  //   //  }
  // }
    isSelectedMember(employee: Employee): boolean {
        return !!this.team.teamMembers?.find((m) => m.id === employee.id);
    }

    unselectMember(employee: Employee): void {
        if(this.team.teamMembers){
        this.team.teamMembers = this.team.teamMembers.filter((m) => m.id !== employee.id);
        }

    }

     // Team Leader Selection Logic (Add Modal)
    selectTeamLeader(employee: Employee): void {
        this.team.teamLeader = employee;
    }
    unselectTeamLeader(): void {
    this.team.teamLeader = undefined;
    }


    // Team Member Selection Logic (Update Modal)
    toggleUpdateMemberSelection(employee: Employee): void {
        if (this.selectedTeam.teamMembers) {
            if (this.isUpdateSelectedMember(employee)) {
                this.selectedTeam.teamMembers = this.selectedTeam.teamMembers.filter((m) => m.id !== employee.id);
            } else {
                this.selectedTeam.teamMembers.push(employee);
            }
        }
        else{
            this.selectedTeam.teamMembers = [employee]
        }

    }

    isUpdateSelectedMember(employee: Employee): boolean {
        return !!this.selectedTeam.teamMembers?.find((m) => m.id === employee.id);
    }
    unselectUpdateMember(employee: Employee): void {
        if(this.selectedTeam.teamMembers) {
            this.selectedTeam.teamMembers = this.selectedTeam.teamMembers.filter((m) => m.id !== employee.id);
        }

    }
    // Team Leader Selection Logic (Update Modal)
    selectUpdateTeamLeader(employee: Employee): void {
        console.log(employee.firstName);
        this.selectedTeam.teamLeader = employee;
    }
    unselectUpdateTeamLeader(): void {
    this.selectedTeam.teamLeader = undefined;
    }

    // Open Update Modal
    openUpdateModal(team: Team): void {
       this.selectedTeam = { ...team };

        const modal = document.getElementById('updateTeamModal');
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'block';
            this.isUpdateModalOpen = true;
        }
    }

    // Close Update Modal
    closeUpdateModal(): void {
        const modal = document.getElementById('updateTeamModal');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
            this.isUpdateModalOpen = false;
        }

    }

    // Update Employee
    onUpdateSubmit(): void {
         if (this.selectedTeam) {
            this.selectedTeam.members = this.selectedTeam.teamMembers ? this.selectedTeam.teamMembers.length : 0;
             this.teamService.updateTeam(this.selectedTeam.id, this.selectedTeam).subscribe(
                () => {
                    this.loadTeams();
                    this.closeUpdateModal();
                },
                (error) => console.error('Failed to update team:', error)
            );
        }
    }

    fetchEmployees(): void {
        this.teamService.getTeams().subscribe(
            (data) => {
                this.teams = data;
            },
            (error) => {
                console.error('Error fetching teams:', error);
            }
        );
    }

    deleteTeam(id: number): void {
        if (confirm('Are you sure you want to delete this team?')) {
            this.teamService.deleteTeam(id).subscribe(
                () => {
                    console.log(`team with ID ${id} deleted successfully.`);
                    this.fetchEmployees();
                },
                (error) => {
                    console.error('Error deleting team:', error);
                }
            );
        }
    }
}