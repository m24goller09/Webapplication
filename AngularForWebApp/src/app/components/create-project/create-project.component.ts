import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { ServerDataService } from '../../services/server-data.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

	@ViewChild('nameInput') nameInput: ElementRef;
	@ViewChild('descInput') descInput: ElementRef;

	count:number=0;

	constructor(private dataService: ServerDataService) { }

  	ngOnInit(): void {
	}



	submit(){
		/* NOT WORKING
		let tempName:string = this.nameInput.nativeElement.value;
		let tempDescription:string = this.descInput.nativeElement.value;
		let tempCreator = "me" + ++this.count;
		alert(tempName + tempCreator + tempDescription);
		this.dataService.addData(tempName,tempCreator,tempDescription);

		*/

	}


}
