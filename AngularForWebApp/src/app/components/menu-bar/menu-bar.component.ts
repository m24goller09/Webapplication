import { Component, OnInit, Input } from '@angular/core';
import {ServerDataService} from '../../services/server-data.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
	@Input() title:string;
	running: string;
	constructor(private dataService:ServerDataService) {
	}

	ngOnInit(): void {
		// running parameter as an observable
		this.dataService.currentRunning.subscribe(currentRunning => this.running = currentRunning);
	}
	changeRunning(running: string){
		this.dataService.changeRunning(running);
	}
}
