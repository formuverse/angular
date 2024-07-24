import { Component, Input, OnInit } from '@angular/core';
import { FormFieldMultipleInterface, FormFieldOptionInterface, FormType } from '../../interfaces/data.interface';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'formuverse-multi-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './multi-field.component.html',
  styleUrl: './multi-field.component.scss'
})
export class MultiFieldComponent implements OnInit {
  @Input() field!: FormFieldMultipleInterface;
  @Input() form!: FormType<any>;
  options: FormFieldOptionInterface[] = [];

  constructor() {}

  ngOnInit(): void {
      if (this.field.options instanceof BehaviorSubject) {
          this.field.options.subscribe((options) => {
              this.options = options;
          });
      } else if (this.field.options instanceof Array) {
		  this.options = this.field.options;
	  }
  }

  public get control() {
    return this.form.get(this.field.name);
  }

  public get isEnabled() {
    return !this.field.disabled;
  }

  public get showField() {
    return this.control.showField;
  }

  public get errorMessage() {
    return this.form.getFirstErrorFromControl(this.field.name);
  }
}
