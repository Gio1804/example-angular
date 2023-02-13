//Guards di tipo CanActivate, blocca l'accesso alle pagine dell'applicazione in caso di mancata autorizzazione (login non effettuato o scaduto) 
//e reindirizzando l’utente alla pagina di Login. (di solito viene usato un server che fa questo lavoro)

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const authentication = this.authenticationService.getAuthentication();//si recupera l’accesso da AuthenticationService 
      if (!authentication || authentication.expirationDate < new Date()) {  //ed eventualmente si esegue un controllo sulla data di scadenza impostata
        this.router.navigate(['/login']); //Il risultato di questa operazione comporta l’attivazione o meno della rotta Navigation sulla quale abbiamo abilitato la guardia.
      }
      return !!authentication;
  }
  
}
