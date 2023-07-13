import { Injectable } from '@angular/core';
import { Student } from '../_models/student';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private firestore: AngularFirestore,
    private router: Router) { }

  createStudent(student: Student) {
    student.id = Math.floor(Math.random() * 1001)
    this.firestore.collection<Student>('students').doc(student.id.toString()).set(student).then(
      () => {
        this.router.navigate(['/view-students'])
      }
    )
  }

  getStudent(name: string, address: string) {
    this.firestore.collection('students').ref.where('name', '==', name).where('address', '==', address).get()
  }

  deleteStudent(student: Student) {
    this.firestore.collection('students').doc(String(student.id)).update({ isDelete: true })
  }

  update(data: any, id: any) {
    this.firestore.collection('students').doc(String(id)).update(data);
  }
}
