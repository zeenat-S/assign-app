import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Student } from 'src/app/_models/student';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css']
})
export class ViewListComponent implements OnInit {

  students!: Student[]
  auth = inject(AuthenticationService)

  constructor(private router: Router, private student: StudentService,
    private scroll: ViewportScroller, private firestore: AngularFirestore) {}

 ngOnInit(): void {
  this.firestore.collection<Student>('students').valueChanges().subscribe(data => {
    this.students = data
  })
 }

 pageYoffset = 0;
 filter= false;
 search!: string
 filteredStudents : Student[] = []
 cityFilter: boolean = false
 nameFilter: boolean = false
 dateFilter: boolean = false
 showSearchResults = false

 @HostListener('window:scroll', ['$event']) onScroll(event: any) {
  this.pageYoffset = window.scrollY;
 }

 logout() {
  this.auth.logout()
 }

 scrollToTop() {
  this.scroll.scrollToPosition([0,0]);
 }

 deleteStudent(student: Student) {
  this.student.deleteStudent(student)
 }

 edit(id: any) {
  this.router.navigate(['/edit', id])
 }

 print() {
  window.print()
 }

 handleFilter() {
  this.filter = !this.filter
 }

 searchButton() {

  this.showSearchResults = true

  this.filteredStudents = this.students;

  if(this.cityFilter) {
    this.filteredStudents = this.students.filter(s => s.address.toLowerCase().includes(this.search.toLowerCase()))
  }

  if(this.nameFilter) {
    this.filteredStudents = this.students.filter(s => s.name.toLowerCase().includes(this.search.toLowerCase()))
  }

  if(this.dateFilter) {
    this.filteredStudents = this.students.filter(s => s.registrationDate.toLowerCase().includes(this.search.toLowerCase()))
  }

  if(this.cityFilter === false && this.dateFilter === false && this.nameFilter === false) {
    window.alert("No filter selected! Select a filter.")
    this.showSearchResults = false
    return
  }

  if(this.cityFilter && this.nameFilter) {
    window.alert("Choose only one filter at a time")
    this.showSearchResults = false
    return
  }

  if(this.cityFilter && this.dateFilter) {
    window.alert("Choose only one filter at a time")
    this.showSearchResults = false
    return
  }

  if(this.dateFilter && this.nameFilter) {
    window.alert("Choose only one filter at a time")
    this.showSearchResults = false
    return
  }

  if(this.cityFilter && this.dateFilter && this.nameFilter) {
    this.showSearchResults = false
    return
  }
 }

 closeSearch() {
  this.showSearchResults = false;
  this.cityFilter = false
  this.nameFilter = false
  this.dateFilter = false
  this.filter = false
  this.search = ""
 }
}
