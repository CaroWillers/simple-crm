import { Component, OnInit } from '@angular/core';  
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';  
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule,  MatNativeDateModule, MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule], 
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {  

  user = new User();   


  constructor(public dialog: MatDialog) {}
 
  ngOnInit(): void { 
  }

  openDialog() {
    console.log('Opening dialog...');
    this.dialog.open(DialogAddUserComponent);
  }
}
