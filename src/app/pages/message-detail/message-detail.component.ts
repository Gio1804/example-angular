import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router'; //ActivatedRoute è l'oggetto della libreria che permette ad Angular Routing di recuperare tutti i parametri del percorso
import { catchError, map, switchMap } from 'rxjs/operators';
import { Message } from 'src/app/model/message';
import { MessageService } from 'src/app/services/message.service';
import { TitleService } from 'src/app/services/title.service';


@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {

  message?: Message;

  constructor(
    private readonly route: ActivatedRoute,//percorso privato di sola lettura,con ActivatedRoute recuperiamo l'ID del messaggio
    private readonly messageService: MessageService,
    private readonly router: Router, //
    private readonly titleService: TitleService,
    private readonly snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.route.params
    .pipe(
      switchMap(params => this.messageService.get(+params['id'])), //si utilizza il parametro id dato dalla sottoscrizione con ActivatedRoute per comporre il titolo della pagina
      catchError(err => {
        this.router.navigate(['/']); //se la chiamata get di MessageService fallisce, ovvero non viene trovato nessun messaggio con l’ID specificato, si torna alla pagina iniziale
        this.snackBar.open(`Errore: ${err}`);
        throw err;
  }),
  map((message: Message) => { //operatore map invio della notifica
    this.message = message;
    this.titleService.title.next(`Messaggio ${message.id}`);
  })
)
  .subscribe();
 }
 delete(message: Message): void { //cancella messaggio
  this.messageService.remove(message.id)
    .subscribe(
      () => {
        console.log(`${message.title} rimosso!`);
        this.snackBar.open(`Messaggio ${message.id} rimosso con successo`)
        this.router.navigate(['/']);
      },
      err =>  {
      console.error(err);
      this.snackBar.open(`Errore: ${err}`);
      }
    );
}
}
