import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { ProjectComponent } from './project/project.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { SubTaskComponent } from './subTask/subtask.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

let routes: Routes;
routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'home/:filter',
		component: HomeComponent
	},
	{
		path:'projectView/:id',
		component: ProjectViewComponent
	}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuBarComponent,
	ProjectComponent,
	ProjectViewComponent,
	SubTaskComponent,
	CreateProjectComponent
  ],
  imports: [
  	BrowserModule,
	RouterModule.forRoot(routes),
	HttpClientModule,
	BrowserAnimationsModule,
	MatDialogModule,
	FormsModule
  ],
  providers: [
  	Title
  ],
  bootstrap: [AppComponent],
  entryComponents:[CreateProjectComponent]
})
export class AppModule { }
