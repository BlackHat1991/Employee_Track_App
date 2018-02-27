import { Routes, RouterModule } from '@angular/router';
import { DataResolver } from './app.resolver';
import { AuthGuard } from './_guards';

import { HomeComponent } from './home';
import { GroupComponent } from './group';
import { AccountComponent } from './account';
import { DashBoardComponent } from './dashBoard';
import { CustomerComponent } from './customer';
import { LocationComponent } from './location';
import { UserComponent } from './user';
import { AppConstantComponent } from './applicationConstants';


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'group', component: GroupComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'dashBoard', component: DashBoardComponent, canActivate: [AuthGuard] },
  { path: 'employee', component: CustomerComponent, canActivate: [AuthGuard] },
  { path: 'location', component: LocationComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] }, 
  { path: 'applicationConstants', component: AppConstantComponent, canActivate: [AuthGuard] },
  /*{
    path: 'detail', loadChildren: () => System.import('./detail').then((comp: any) => {
      return comp.default;
    })
    ,
  },*/
  { path: '**',   redirectTo: ''  },
];
