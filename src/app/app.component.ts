import { Component, inject } from '@angular/core';import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common'; 
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,  
    RouterModule,
    MatToolbarModule, 
    MatSidenavModule, 
    MatIconModule,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  title = 'SIMPLE-CRM';

  constructor() {
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
  }
}
