import { ValidatorFn } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { FormBase } from "../class/formBase";
import { FormFieldSingleTypeEnum, FormFieldMultipleTypeEnum, CriteriaEnum } from "../enums/form.enum";
import { FormuverseControl } from "../class/formControl";
import { FormuverseArray } from "../class/formArray";
import { FormuverseGroup } from "../class/formGroup";

export type FormControlsInterface<T extends Record<string, any>>  = {
    [K in keyof T]: FormuverseAbstractControl<T[K]>
};

export type FormuverseAbstractControl<T extends Record<string, any>> = FormuverseControl<T> | FormuverseArray | FormuverseGroup;

export type FormType<T extends Record<string, any>> = FormControlsInterface<T> & FormBase<T>;

export interface FormDataInterface {
    groups: FormGroupInterface[];
}

export interface FormGroupInterface {
    fields: FormFieldType[];
    title: string;
    subtitle: string;
    dependencies?: dependenciesInterface[];
}

export interface dependenciesInterface {
    field: string;
    value: string;
    criteria: CriteriaEnum;
}

export type FormFieldType = FormFieldMultipleInterface | FormFieldSingleInterface;

export interface FormFieldMultipleInterface extends FormFieldBaseInterface {
    type: FormFieldMultipleTypeEnum;
    options: FormFieldOptionInterface[] | BehaviorSubject<FormFieldOptionInterface[]>;
}

export interface FormFieldSingleInterface extends FormFieldBaseInterface {
    type: FormFieldSingleTypeEnum;
    placeholder?: string;
}

interface FormFieldBaseInterface {
    name: string;
    initialValue: any;
    label: string;
    disabled?: boolean;
    readonly?: boolean;
    validators?: Record<string, FormFieldValidatorInterface>;
    dependencies?: dependenciesInterface[];
}

export interface FormFieldOptionInterface {
    label: string;
    value: string;
}

export interface FormFieldValidatorInterface {
    validator: ValidatorFn;
    message: string;
}