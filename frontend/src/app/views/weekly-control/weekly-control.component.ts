import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'sgpl-weekly-control',
  templateUrl: './weekly-control.component.html',
  styleUrls: ['./weekly-control.component.css']
})
export class WeeklyControlComponent implements OnInit {

  constructor(private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Controle Semanal',
      icon: 'event_available',
      routeUrl: 'controle-semanal'
    }
  }

  ngOnInit(): void {
  }

}
