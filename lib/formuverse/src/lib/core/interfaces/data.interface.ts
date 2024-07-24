import { AbstractControl, ValidatorFn } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { FormBase } from "../class/form-base.form";
import { FormTypeEnum } from "../enums/form.enum";

export type FormControlsInterface<T>  = {
    [K in keyof T]: AbstractControl<T[K] | null>
};

export type FormType<T extends Record<string, any>> = FormControlsInterface<T> & FormBase<T>;

export interface FormDataInterface {
    groups: FormGroupInterface[];
}

export interface FormGroupInterface {
    fields: FormFieldInterface[];
    title: string;
    subtitle: string;
}

export interface FormFieldInterface {
    name: string;
    initialValue: any;
    type: FormTypeEnum;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    options?: FormFieldOptionInterface[] | BehaviorSubject<FormFieldOptionInterface[]>;
    isMultiple?: boolean;
    validators?: Record<string, FormFieldValidatorInterface>;
}

export interface FormFieldOptionInterface {
    label: string;
    value: string;
}

export interface FormFieldValidatorInterface {
    validator: ValidatorFn;
    message: string;
}