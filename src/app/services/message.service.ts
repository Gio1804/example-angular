import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MOCK_MESSAGES } from '../mock/mock-messages';
import { Message } from '../model/message';

export const DEMO_MESSAGES_STORE = 'demo_messages_store'; //localStorage ci permetti di tenere traccia degli aggiornamenti fatti dall’utente ad ogni riavvio e quindi di salvare i dati utilizzando il browser.

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  messages: Message[] = [];

  constructor() { 
    const stored: string | null = localStorage.getItem(DEMO_MESSAGES_STORE);
    this.messages = stored ? JSON.parse(stored) : this.save(MOCK_MESSAGES);
  }
  getAll(): Observable<Message[]> { //getAll restituisce la lista completa dei messaggi 
    return of(this.messages);
  }
  get(id: number): Observable<Message> { //get riceve in ingresso l’ID del messaggio
    const message = this.messages.find(m => m.id === id); //lo ricerca nella lista 
    return message ? of(message) : throwError(`Messaggio con id ${id} non trovato!`); //restituisce il messaggio se questo viene trovato, altrimenti un errore.
  }
  add(message: Message): Observable<Message> { //inserimento messaggio. add riceve un nuovo oggetto Message e lo aggiunge alla lista e ritorna observable contenente lo stesso oggetto
    this.messages.push(message);
    return of(message)
    .pipe(finalize(() => this.save(this.messages)));
  }
  
  remove(id: number): Observable<void> { // rimuove/cancella messaggio,remove ricerca il messaggio richiesto e, se questo viene trovato, lo rimuove dalla lista.
    const messageIndex = this.messages.findIndex(m => m.id === id);
    if (messageIndex !== -1) {
      this.messages.splice(messageIndex, 1);
      return of(undefined)
      .pipe(finalize(() => this.save(this.messages)));
    }
    return throwError(`Errore: messaggio con id ${id} non trovato!`);
  }
  private save(messages: Message[]): Message[] { //il browser memorizzerà la nostra lista di messaggi rendendoli disponibili e invariati ad ogni riavvio.
    localStorage.setItem(DEMO_MESSAGES_STORE, JSON.stringify(messages));
    return messages;
  }
}
