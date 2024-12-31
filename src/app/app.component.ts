import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoginPage: boolean = false;
  

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(
        // Filter only for NavigationEnd events
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        // Check if the current route is '/login'
        this.isLoginPage = event.urlAfterRedirects === '/login';
      });
  }
}
