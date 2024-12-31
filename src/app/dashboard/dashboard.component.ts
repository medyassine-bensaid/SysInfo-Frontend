import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    this.renderAreaChart();
    this.renderPieChart();
  }

  renderAreaChart() {
    new Chart('areaChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Earnings',
            data: [10000, 15000, 8000, 12000, 17000, 20000],
            borderColor: '#4e73df',
            backgroundColor: 'rgba(78, 115, 223, 0.1)'
          }
        ]
      }
    });
  }

  renderPieChart() {
    new Chart('pieChart', {
      type: 'doughnut',
      data: {
        labels: ['Direct', 'Referral', 'Social'],
        datasets: [
          {
            data: [55, 30, 15],
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc']
          }
        ]
      }
    });
  }
}
