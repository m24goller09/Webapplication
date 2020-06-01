import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
import { AddButtonComponent } from './add-button/add-button.component';
import { CreateSubTaskComponent } from './create-sub-task/create-sub-task.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

let routes: Routes;
routes = [
	{
		path: '',
		redirectTo:'home/def',
		pathMatch: 'full'
	},
	{
		path: 'register',
		component:RegisterComponent
	},
	{
		path: 'login',
		redirectTo:'home/def',
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
	AddButtonComponent,
	CreateSubTaskComponent,
	ConfirmDialogComponent,
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        SharedModule,
        MatButtonModule,
        MatInputModule,
        MatSliderModule,
        MatOptionModule,
        MatSelectModule,
        MatProgressSpinnerModule,
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
