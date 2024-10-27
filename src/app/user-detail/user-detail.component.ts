import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { MatIcon } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIcon,
    MatIconModule,
    MatMenuModule,
    DialogEditAddressComponent,
    DialogEditUserComponent,
    MatDialogModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userId: string | null = null;
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Abrufen der Benutzer-ID aus der URL
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id');
      if (this.userId) {
        this.getUser();
      }
    });
  }

  getUser() {
    if (this.userId) {
      // Abrufen des Benutzers aus Firestore
      const userDoc = doc(this.firestore, `users/${this.userId}`);
      docData(userDoc).subscribe((userData: any) => {
        this.user = new User(userData);
        console.log('Retrieved user:', this.user);
      });
    }
  }

  editUserDetail() {
    // Öffnen des Dialogs und Übergabe der Benutzerdaten als Kopie, um das Original nicht direkt zu ändern
    const dialogRef = this.dialog.open(DialogEditUserComponent, {
      data: { user: new User({ ...this.user }), userId: this.userId },
    });

    // Wenn der Dialog geschlossen wird und Änderungen gemacht wurden
    dialogRef.afterClosed().subscribe((updatedUser: User | undefined) => {
      if (updatedUser) {
        this.user = new User(updatedUser); // Ersetzen des Benutzerobjekts, um das UI zu aktualisieren
      }
    });
  }

  editMenu() {
    // Öffnen des Dialogs und Übergabe der Benutzerdaten als Kopie, um das Original nicht direkt zu ändern
    const dialogRef = this.dialog.open(DialogEditAddressComponent, {
      data: { user: new User({ ...this.user }), userId: this.userId },
    });

    // Wenn der Dialog geschlossen wird und Änderungen gemacht wurden
    dialogRef.afterClosed().subscribe((updatedUser: User | undefined) => {
      if (updatedUser) {
        this.user = new User(updatedUser); // Aktualisieren des Benutzerobjekts, um das UI zu aktualisieren
      }
    });
  }
}
