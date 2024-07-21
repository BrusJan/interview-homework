import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * This component has been copied from https://angular-tailwind-datepicker.stackblitz.io
 * TODO: It is fit for refactoring mostly to remove heavy usage of 'any' type
 */

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  exportAs: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: [ './date-picker.component.scss' ]
})
export class DatePickerComponent implements OnInit {
  
  MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  showDatepicker: boolean = false;
  datepickerValue: any = '';
  month: any = '';
  year: any = '';
  no_of_days: any = [];
  blankdays: any = [];
  days: any = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  @Output() dateChange = new EventEmitter<Date>();
  
  constructor(){}

  ngOnInit(): void {
    this.initDate();
  }

  initDate() {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.datepickerValue = new Date(this.year, this.month, today.getDate()).toDateString();
    this.getNoOfDays()
  }

  isToday(date: number) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);
    return today.toDateString() === d.toDateString() ? true : false;
  }

  getDateValue(date: number) {
    let selectedDate = new Date(this.year, this.month, date);
    this.datepickerValue = selectedDate.toDateString();
    this.dateChange.emit(selectedDate);
    // this.$refs.date.value = selectedDate.getFullYear() +"-"+ ('0'+ selectedDate.getMonth()).slice(-2) +"-"+ ('0' + selectedDate.getDate()).slice(-2);
    // console.log(this.$refs.date.value);

    this.showDatepicker = false;
    }

  getNoOfDays() {
    let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    // find where to start calendar day of week
    let dayOfWeek = new Date(this.year, this.month).getDay();
    let blankdaysArray = [];
    for ( var i=1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for ( var i=1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    this.blankdays = blankdaysArray;
    this.no_of_days = daysArray;
  }
}
