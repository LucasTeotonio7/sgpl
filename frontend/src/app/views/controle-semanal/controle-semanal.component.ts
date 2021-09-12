import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'sgpl-controle-semanal',
  templateUrl: './controle-semanal.component.html',
  styleUrls: ['./controle-semanal.component.css']
})
export class ControleSemanalComponent implements OnInit {

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
