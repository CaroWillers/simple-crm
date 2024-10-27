import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatButtonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss'],
})
export class DialogEditAddressComponent {
  loading = false;
  user: User;
  userId: string | null;

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogEditAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User; userId: string | null }
  ) {
    this.user = new User(data.user);
    this.userId = data.userId;
  }

  async saveUser() {
    if (this.userId) {
      try {
        // Setze den Ladezustand auf true, um anzuzeigen, dass gespeichert wird
        this.loading = true;

        // Firestore-Dokument für den Benutzer aktualisieren
        const userDocRef = doc(this.firestore, `users/${this.userId}`);
        await updateDoc(userDocRef, this.user.toJson());

        console.log('User gespeichert und in Firestore aktualisiert:', this.user);

        // Den aktualisierten Benutzer zurückgeben und den Dialog schließen
        this.dialogRef.close(this.user);
      } catch (error) {
        console.error('Fehler beim Aktualisieren des Benutzers in Firestore:', error);
      } finally {
        // Setze den Ladezustand zurück
        this.loading = false;
      }
    } else {
      console.error('Keine Benutzer-ID vorhanden, kann den Benutzer nicht speichern.');
      this.dialogRef.close();
    }
  }
}
