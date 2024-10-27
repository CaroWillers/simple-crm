import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';  
import { MatNativeDateModule } from '@angular/material/core';  
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    FormsModule,
    MatProgressBarModule,
    MatCardModule
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent implements OnInit {
  user = new User();   
  loading = false;  
  
  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {}

  async saveUser() {
    this.loading = true;   
    try {
      const usersCollection = collection(this.firestore, 'users');
      const result = await addDoc(usersCollection, {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        birthDate: this.user.birthDate,
        street: this.user.street,
        zipCode: this.user.zipCode,
        city: this.user.city
      });
      console.log('User successfully added:', result);
    } catch (error) {
      console.error('Error adding user:', error);
    } finally {
      this.loading = false;  
      this.dialogRef.close(); 
    }
  }
}
