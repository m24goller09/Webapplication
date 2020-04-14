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
	}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuBarComponent,
	ProjectComponent,
	ProjectViewComponent,
	SubTaskComponent
  ],
  imports: [
  	BrowserModule,
	RouterModule.forRoot(routes),
	HttpClientModule
  ],
  providers: [
  	Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
