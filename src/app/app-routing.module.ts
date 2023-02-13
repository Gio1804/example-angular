import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './pages/login/login.component';
import { MessageDetailComponent } from './pages/message-detail/message-detail.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { AuthenticationGuard } from './services/guards/authentication.guard';

const routes: Routes = [
  {
    path: 'login', //rotta principale
    component: LoginComponent 
  },
  {
    path:'', //path di default 
    component: NavigationComponent, //aggiunge il contenuto del componente Navigation all'interno della direttiva <router-outlet> 
    canActivate: [AuthenticationGuard],
    children:[ //nuove rotte del percorso definito per il componente Navigation 
      {
        path:'',
        component: MessagesComponent
      },              //vogliamo sostituire il contenuto della direttiva router-outlet all’interno del template Navigation con il contenuto delle nuove pagine
      {
        path:'message/:id',
        component: MessageDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
