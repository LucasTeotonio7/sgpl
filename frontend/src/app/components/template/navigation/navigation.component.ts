import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'sgpl-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(".mat-list-item").on('click', function(){
      $(".mat-list-item").removeClass('active');
      $(this).addClass('active');
    });
  }

}
