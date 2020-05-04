import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
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
import { RegisterComponent } from './register/register.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { ConfigService } from './shared/config.service';

let routes: Routes;
routes = [
	{
		path: '',
		redirectTo:'register',
		pathMatch: 'full'
	},
	{
		path: 'register',
		component:RegisterComponent
	},
	{
		path: 'login',
		redirectTo:'register',
		pathMatch: 'full'
	},
	{
		path: 'home/:filter',
		component: HomeComponent
	},
	{
		path: 'home',
		redirectTo:'home/def',
		pathMatch:'full'
	},
	{
		path:'projectView/:id',
		component: ProjectViewComponent
	},
	{
		path: 'auth-callback',
		component: AuthCallbackComponent
	},
	{
		path:'**', redirectTo:'',pathMatch:'full'
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
	CreateProjectComponent,
	RegisterComponent,
	AuthCallbackComponent,
  ],
  imports: [
  	BrowserModule,
	RouterModule.forRoot(routes),
	HttpClientModule,
	BrowserAnimationsModule,
	MatDialogModule,
	FormsModule,
	CoreModule,
	SharedModule,
  ],
  exports:[RouterModule],
  providers: [
	  Title,
	  ConfigService
  ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent],
  entryComponents:[CreateProjectComponent]
})
export class AppModule { }
