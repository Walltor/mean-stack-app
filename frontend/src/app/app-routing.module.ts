import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component'
import { BrowseComponent } from './browse/browse.component' 
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'
import { AddItemComponent } from './admin-dashboard/add-item/add-item.component'
import { EditItemComponent } from './admin-dashboard/edit-item/edit-item.component'
import { authGuard } from './auth/auth.guard'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { ContactComponent } from './contact/contact.component'
import { AboutComponent } from './about/about.component'
import { ItemDetailsComponent } from './item-details/item-details.component'

const routes: Routes = [
  { path: 'admin', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent},
  { path: 'about', component: AboutComponent},
  { path: 'browse', component: BrowseComponent },
  { path: 'admin/admin-dashboard', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: 'admin/add-item', component: AddItemComponent, canActivate: [authGuard] },
  { path: 'admin/edit-item/:id', component: EditItemComponent, canActivate: [authGuard] },
  { path: 'item-details/:id', component: ItemDetailsComponent },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})  
export class AppRoutingModule { }
