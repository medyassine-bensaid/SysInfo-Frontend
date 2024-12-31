import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: 0,
    fonction: '',
    profile: '',
  };

  // selectedEmployee!: Employee ;

  selectedEmployee: Employee = {
    id: 0, // Example ID
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: 0,
    fonction: '',
    profile: '',

};

  isModalOpen = false;
  isUpdateModalOpen = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => (this.employees = data),
      (error) => console.error('Failed to fetch employees:', error)
    );
  }

  // Open Add Modal
  openModal(): void {
    const modal = document.getElementById('addEmployeeModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      this.isModalOpen = true;
    }
  }

  // Close Add Modal
  closeModal(): void {
    const modal = document.getElementById('addEmployeeModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.isModalOpen = false;
    }
  }

  // Add Employee
  onSubmit(): void {
    this.employeeService.addEmployee(this.employee).subscribe(
      () => {
        this.loadEmployees();
        this.closeModal();
        this.resetEmployeeForm();
      },
      (error) => console.error('Failed to add employee:', error)
    );
  }

  resetEmployeeForm(): void {
    this.employee = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: 0,
      fonction: '',
      profile: '',
    };
  }

  // Open Update Modal
  openUpdateModal(employee: Employee): void {
    this.selectedEmployee = { ...employee };

    const modal = document.getElementById('updateEmployeeModal');
    const backdrop = document.getElementById('updateModalBackdrop');

    if (modal && backdrop) {
      modal.classList.add('show');
      modal.style.display = 'block';
      this.isUpdateModalOpen = true;
      backdrop.classList.add('show');
      backdrop.style.display = 'block';
    }
  }

  // Close Update Modal
  closeUpdateModal(): void {
    const modal = document.getElementById('updateEmployeeModal');
    const backdrop = document.getElementById('updateModalBackdrop');
    if (modal && backdrop) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.isUpdateModalOpen = false;
      backdrop.classList.remove('show');
      backdrop.style.display = 'none';

    }

    this.selectedEmployee;
  }

  // Update Employee
  onUpdateSubmit(): void {
    if (this.selectedEmployee) {
      this.employeeService.updateEmployee(this.selectedEmployee.id, this.selectedEmployee).subscribe(
        () => {
          this.loadEmployees();
          this.closeUpdateModal();
        },
        (error) => console.error('Failed to update employee:', error)
      );
    }
  }

  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data; // Assuming `employees` is an array
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
  
  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        () => {
          console.log(`Employee with ID ${id} deleted successfully.`);
          this.fetchEmployees(); // Refresh the client list after deletion

        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );
    }
  }

}
