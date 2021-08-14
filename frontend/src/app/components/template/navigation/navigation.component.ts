import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sgpl-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(){
    const menuToggle = document.querySelector(".mat-list-item base");
    menuToggle.classList.toggle("active");
  }


}
