import { Component } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/_services/student.service';
import { Router } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent {

  navigation = 'select'
  showAlert = false

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    fname: new FormControl('', Validators.required),
    mname: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    regDate: new FormControl()
  })

  constructor(private student: StudentService, private router: Router, private auth: AuthenticationService) { }

  save() {
    if(!this.form.valid) {
      this.showAlert = true
      return
    }

    const regDate: NgbDateStruct = this.form.value.regDate
    const date = this.getFormattedDate(regDate)
    this.student.createStudent({
      id: 0,
      name: String(this.form.value.name),
      fatherName: String(this.form.value.fname),
      motherName: String(this.form.value.mname),
      age: Number(this.form.value.age),
      address: String(this.form.value.address),
      registrationDate: date,
      isDelete: false
    });
    this.showAlert = false
  }

  logout() {
    this.auth.logout()
  }

  getFormattedDate(date: NgbDateStruct): string {
    if (date) {
      const year = date.year.toString();
      const month = this.padZero(date.month);
      const day = this.padZero(date.day);
      return `${year}-${month}-${day}`;
    }
    return "";
  }

  padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
