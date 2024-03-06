import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component'
import { BrowseComponent } from './browse/browse.component' 
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'
import { AddItemComponent } from './admin-dashboard/add-item/add-item.component'
import { authGuard } from './auth/auth.guard'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { NotFoundError } from 'rxjs'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard],
    // children: [
    //   { path: '**', component: PageNotFoundComponent }
    // ]
  },
  { path: 'add-item', component: AddItemComponent, canActivate: [authGuard], 
    // children: [
    //   { path: '**', component: PageNotFoundComponent }
    // ]
  },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})  
export class AppRoutingModule { }
