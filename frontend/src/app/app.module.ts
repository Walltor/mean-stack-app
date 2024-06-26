import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { ReactiveFormsModule } from '@angular/forms'
import { SlickCarouselModule } from 'ngx-slick-carousel'

import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { BrowseComponent } from './browse/browse.component'
import { FeaturedComponent } from './featured/featured.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { SearchComponent } from './search/search.component'
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'
import { AddItemComponent } from './admin-dashboard/add-item/add-item.component'
import { AuthService } from './auth/auth.service'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { InfoComponent } from './info/info.component'
import { ContactComponent } from './contact/contact.component'
import { AboutComponent } from './about/about.component'
import { ItemDetailsComponent } from './item-details/item-details.component';
import { EditItemComponent } from './admin-dashboard/edit-item/edit-item.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BrowseComponent,
    FeaturedComponent,
    HomeComponent,
    LoginComponent,
    SearchComponent,
    AdminDashboardComponent,
    AddItemComponent,
    PageNotFoundComponent,
    InfoComponent,
    ContactComponent,
    AboutComponent,
    ItemDetailsComponent,
    EditItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SlickCarouselModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
