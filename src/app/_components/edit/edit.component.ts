import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Student } from 'src/app/_models/student';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  navigation = 'select'
  id!: number
  public student!: Student

  constructor(
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private firestore: AngularFirestore,
    private studentService: StudentService) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    })
    this.getStudent()
  }

  ngOnInit(): void { }

  getStudent() {
    this.firestore.collection<Student>('students').doc(String(this.id)).valueChanges().subscribe((data) => {
      this.student = data!;
      console.log(this.student)
    })
  }

  name!: string
  fname!: string
  mname!: string
  age!: number
  address!: string
  date!: NgbDateStruct

  studentName = false
  ageInput = false
  addressinput = false
  mNameInput = false
  fNameInput = false
  dateInput = false

  logout() {
    this.auth.logout()
  }

  handleName() {
    this.studentName = !this.studentName
  }

  handleAge() {
    this.ageInput = !this.ageInput
  }

  handlefname() {
    this.fNameInput = !this.fNameInput
  }

  handlemname() {
    this.mNameInput = !this.mNameInput
  }

  handleAddress() {
    this.addressinput = !this.addressinput
  }

  handledate() {
    this.dateInput = !this.dateInput
  }

  saveName() {
    this.studentService.update({ name: this.name }, this.id)
    this.studentName = !this.studentName
  }

  saveFname() {
    this.studentService.update({ fatherName: this.fname }, this.id)
    this.fNameInput = !this.fNameInput
  }

  saveMname() {
    this.studentService.update({ motherName: this.mname }, this.id)
    this.mNameInput = !this.mNameInput
  }

  saveAge() {
    this.studentService.update({ age: this.age }, this.id)
    this.ageInput = !this.ageInput
  }

  saveAddress() {
    this.studentService.update({ address: this.address }, this.id)
    this.addressinput = !this.addressinput
  }

  savedate() {
    this.studentService.update({ registrationDate: this.getFormattedDate(this.date) }, this.id)
    this.dateInput = !this.dateInput
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
