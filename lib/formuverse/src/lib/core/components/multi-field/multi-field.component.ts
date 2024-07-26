import { Component, input, OnInit } from '@angular/core';
import {
    FormFieldMultipleInterface,
    FormFieldOptionInterface,
    FormType,
} from '../../interfaces/data.interface';
import { BehaviorSubject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldMultipleTypeEnum } from '../../enums/form.enum';

@Component({
    selector: 'formuverse-multi-field',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './multi-field.component.html',
    styleUrl: './multi-field.component.scss',
})
export class MultiFieldComponent implements OnInit {
    public fieldSignal = input.required<FormFieldMultipleInterface>({
        alias: 'field',
    });
    public formSignal = input.required<FormType<any>>({ alias: 'form' });
    public options: FormFieldOptionInterface[] = [];
    public fieldTypeEnum = FormFieldMultipleTypeEnum;

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
