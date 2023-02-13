import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'; //template di navigazione(barra di navigazione)
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog'; //utilizzato per aprire finestre di dialogo modali (finestra figlia che richiede all'utente di interagire con essa prima di ritornare alla finestra madre impedendo il lavoro)con stili e animazioni con material Design
import { MatFormFieldModule } from '@angular/material/form-field'; //componente che avvolge diversi componenti angular material e applica diversi stili (sottolineatura,messaggi di suggerimento,floating label è un tipo di stile)
import { MatInputModule } from '@angular/material/input'; //è una direttiva che permetti agli elementi nativi (textarea, input) di lavorare con MatFormField 
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';//servizio per la visualizzazione di notifiche snack-bar
import { MatMenuModule } from '@angular/material/menu'; // aggiunge un menu alla barra di navigazione



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule
  ],
  exports: [ // chiedere a Daniele perche non era presente 
    CommonModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } } //duration imposta la durata (in millisecondi) dello snack bar
  ]
})
export class MaterialModule { }
