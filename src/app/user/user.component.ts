import { Component, OnInit } from '@angular/core';  
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';  
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms'; 
import { MatCardModule } from '@angular/material/card';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, MatNativeDateModule, MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, MatCardModule], 
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {  
  user = new User();
  allUsers: any[] = [];
  users$!: Observable<any[]>; 

  constructor(public dialog: MatDialog, private firestore: Firestore, private router: Router) {}

  ngOnInit(): void { 
    const usersCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(usersCollection, { idField: 'customIdName' });

    this.users$.subscribe(changes => {
      console.log('Receive Changes:', changes);
      this.allUsers = changes;
    });
  }

  openDialog() {
    console.log('Opening dialog...');
    this.dialog.open(DialogAddUserComponent);
  }

  goToUser(customIdName: string) {
    this.router.navigate(['/user', customIdName]);
  }
}
