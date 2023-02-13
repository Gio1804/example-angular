import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';//un componente notifica un aggiornamento a tutti gli altri componenti sottoscritti.


@Injectable({
  providedIn: 'root'
})
export class TitleService {

  title = new BehaviorSubject<string>('');


  constructor() { }
}
