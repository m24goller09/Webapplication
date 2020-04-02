import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
	@Input() title:string;
  constructor() {

  }

  ngOnInit(): void {
  }

}
