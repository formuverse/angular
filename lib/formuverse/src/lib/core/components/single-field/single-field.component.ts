import { Component, Input } from '@angular/core';
import { FormFieldSingleInterface, FormType } from '../../interfaces/data.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'formverse-single-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './single-field.component.html',
  styleUrl: './single-field.component.scss'
})
export class SingleFieldComponent {
  @Input() field!: FormFieldSingleInterface;
  @Input() form!: FormType<any>;

  constructor() {}

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
