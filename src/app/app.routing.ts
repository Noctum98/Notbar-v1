import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

//Componentes
import { NoticesComponent } from './components/notices/notices.component';
import { LoginComponent } from './components/login/login.component';
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

const appRoutes:Routes = [
    {path:'',component:NoticesComponent},
    {path:'login',component:LoginComponent},
    {path:'notices',component:NoticesComponent},
    {path:'notices',component:NoticesComponent},
    {path:'profile',component:ProfileComponent},
    {path:'register',component:RegisterComponent},
    {path:'create',component:CreateComponent},
    {path:'notice/:id',component:NoticeComponent},
    {path:'edit-article/:id',component:EditArticleComponent},
    {path:'profile-user/:user',component:ProfileUserComponent},
    {path:'entertainment',component:EntertainmentComponent},
    {path:'world',component:WorldComponent},
    {path:'sports',component:SportsComponent},
    {path:'economy',component:EconomyComponent},
    {path:'politics',component:PoliticsComponent},
    {path:'**',component:NoticesComponent}
];

export const appRoutingProviders:any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);