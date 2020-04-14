import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

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
		path: ' ',
		component: HomeComponent
	},
	{
		path: 'home/:filter',
		component: HomeComponent
	},
	{
		path:'projectView/:id/:name/:desc/:creator/:status',
		component: ProjectViewComponent
	},
	{
		path: 'createProject',
		component: CreateProjectComponent
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
	BrowserAnimationsModule
  ],
  providers: [
  	Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
