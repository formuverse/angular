import { Component, input } from '@angular/core';
import {
    FormFieldSingleInterface,
    FormType,
} from '../../interfaces/data.interface';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'formverse-single-field',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './single-field.component.html',
    styleUrl: './single-field.component.scss',
})
export class SingleFieldComponent {
    public fieldSignal = input.required<FormFieldSingleInterface>({
        alias: 'field',
    });
    public formSignal = input.required<FormType<any>>({ alias: 'form' });

    constructor() {}

    public get field() {
        return this.fieldSignal();
    }

    public get form() {
        return this.formSignal();
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
