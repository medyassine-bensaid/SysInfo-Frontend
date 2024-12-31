import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  client: Client = {
    id: 0,
    name: '',
    email: '',
    phoneNumber: 0,
    clientType: '',
  };
  selectedClient: Client = {
    id: 0,
    name: '',
    email: '',
    phoneNumber: 0,
    clientType: '',

};

  isModalOpen = false;
  isUpdateModalOpen = false;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(
      (data) => (this.clients = data),
      (error) => console.error('Failed to fetch clients:', error)
    );
  }

  // Open Add Modal
  openModal(): void {
    const modal = document.getElementById('addClientModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      this.isModalOpen = true;
    }
  }

  // Close Add Modal
  closeModal(): void {
    const modal = document.getElementById('addClientModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.isModalOpen = false;
    }
  }

  // Add Client
  onSubmit(): void {
    this.clientService.addClient(this.client).subscribe(
      () => {
        this.loadClients();
        this.closeModal();
        this.resetClientForm();
      },
      (error) => console.error('Failed to add client:', error)
    );
  }

  resetClientForm(): void {
    this.client = {
      id: 0,
      name: '',
      email: '',
      phoneNumber: 0,
      clientType: '',
    };
  }



  

  
  // Open Update Modal
  openUpdateModal(client: Client): void {
    this.selectedClient = { ...client };

    const modal = document.getElementById('updateClientModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      this.isUpdateModalOpen = true;
    }
  }

  // Close Update Modal
  closeUpdateModal(): void {
    const modal = document.getElementById('updateClientModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      this.isUpdateModalOpen = false;
    }

    this.selectedClient;
  }

  // Update Employee
  onUpdateSubmit(): void {
    if (this.selectedClient) {
      this.clientService.updateClient(this.selectedClient.id, this.selectedClient).subscribe(
        () => {
          this.loadClients();
          this.closeUpdateModal();
        },
        (error) => console.error('Failed to update client:', error)
      );
    }
  }

  
  fetchEmployees(): void {
    this.clientService.getClients().subscribe(
      (data) => {
        this.clients = data; // Assuming `employees` is an array
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }
  
  deleteClient(id: number): void {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(id).subscribe(
        () => {
          console.log(`client with ID ${id} deleted successfully.`);
          this.fetchEmployees(); // Refresh the client list after deletion

        },
        (error) => {
          console.error('Error deleting client:', error);
        }
      );
    }
  }
}
