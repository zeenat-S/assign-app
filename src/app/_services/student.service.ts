import { Injectable } from '@angular/core';
import { Student } from '../_models/student';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private firestore: AngularFirestore, private router: Router) { }

  students = [
    { studentName: "JJ", fatherName: "BB", motherName: "KK", age: 12, address: "21 Street Pigs Ave", registerDate: "21/05/23" },
    { studentName: "Sam", fatherName: "Jam", motherName: "Pam", age: 11, address: "901 Street 2 Saint Ave", registerDate: "21/05/23" },
    { studentName: "Mike", fatherName: "Gale", motherName: "Sara", age: 12, address: "51 Juane Ave", registerDate: "21/05/23" },
    { studentName: "Miley", fatherName: "Ronn", motherName: "Lenny", age: 12, address: "6 NY Ave", registerDate: "21/05/23" },
  ]

  createStudent(student: Student) {
    student.id = Math.floor(Math.random()*1001)
    this.firestore.collection<Student>('students').doc(student.id.toString()).set(student).then(
      () => {
        this.router.navigate(['/view-students'])
      }
    )
  }

  getStudent(name: string, address: string) {
    this.firestore.collection('students').ref.where('name','==',name).where('address', '==', address).get()
  }

  deleteStudent(student: Student) {
    this.firestore.collection('students').doc(String(student.id)).update({isDelete: true})
  }

  update(data: any, id: any) {
    this.firestore.collection('students').doc(String(id)).update(data);
  }
}
