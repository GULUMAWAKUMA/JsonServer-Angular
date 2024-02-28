import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrl: './user-listing.component.css'
})
export class UserListingComponent {

  constructor(private service: AuthService, private dialog: MatDialog) {
    this.LoadUser();
  }

  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  LoadUser() {
    this.service.GetAll().subscribe(res => {
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }
  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'email', 'role', 'status', 'action'];

  UpdateUser(code: any) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        usercode: code
      }
    });
    popup.afterClosed().subscribe(result => {
      // if (result) {
      this.LoadUser();
      // }
    });
  }
  openDialog() { }






}
