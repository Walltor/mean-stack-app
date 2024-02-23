import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowseComponent } from './browse/browse.component'; 
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddItemComponent } from './admin-dashboard/add-item/add-item.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'add-item', component: AddItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
