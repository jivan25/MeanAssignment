import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName:string='';
  constructor(private router:Router) { }

  ngOnInit() {
    this.userName=sessionStorage.getItem('userInfo')
  }

  onLogout(){
    sessionStorage.removeItem('userInfo')
    localStorage.removeItem('token')
    localStorage.removeItem('isRefresh')
      this.router.navigateByUrl('/login')
  }
}
