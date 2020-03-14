import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing'

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NoticesComponent } from './components/notices/notices.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateComponent } from './components/create/create.component';
import { NoticeComponent } from './components/notice/notice.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { EntertainmentComponent } from './components/entertainment/entertainment.component';
import { WorldComponent } from './components/world/world.component';
import { SportsComponent } from './components/sports/sports.component';
import { EconomyComponent } from './components/economy/economy.component';
import { PoliticsComponent } from './components/politics/politics.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoticesComponent,
    ProfileComponent,
    RegisterComponent,
    CreateComponent,
    NoticeComponent,
    EditArticleComponent,
    ProfileUserComponent,
    EntertainmentComponent,
    WorldComponent,
    SportsComponent,
    EconomyComponent,
    PoliticsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
