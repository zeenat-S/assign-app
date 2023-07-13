import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { ViewListComponent } from './_components/view-list/view-list.component';
import { EditComponent } from './_components/edit/edit.component';
import { StudentFormComponent } from './_components/student-form/student-form.component';
import { LoginComponent } from './_components/login/login.component';
import { authGuard } from './_guard/auth.guard';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "view-students", component: ViewListComponent, canActivate: [authGuard] },
  { path: "student-form", component: StudentFormComponent, canActivate: [authGuard] },
  { path: "edit/:id", component: EditComponent, canActivate: [authGuard] },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
