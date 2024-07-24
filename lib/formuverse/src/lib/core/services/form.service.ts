import { ValidatorFn } from '@angular/forms';
import {
    FormControlsInterface,
    FormDataInterface,
    FormFieldMultipleInterface,
    FormGroupInterface,
    FormType,
    FormuverseAbstractControl,
} from '../interfaces/data.interface';
import { FormBase } from '../class/formBase';
import { Injectable } from '@angular/core';
import { FormFieldMultipleTypeEnum } from '../enums/form.enum';
import { FormuverseControl } from '../class/formControl';
import { FormuverseArray } from '../class/formArray';

@Injectable({
    providedIn: 'root'
  })
export class FormService {
    createForm<T extends Record<string, any>>(
        data: FormDataInterface | FormGroupInterface
    ): FormType<T> {
        return new FormBase<T>(this._createControls<T>(data), data) as FormType<T>;
    }

    private _createControls<T>(
        data: FormDataInterface | FormGroupInterface
    ): FormControlsInterface<T> {
        const allControls: FormControlsInterface<T> =
            {} as FormControlsInterface<T>;
        if (data.hasOwnProperty('fields')) {
            data = data as FormGroupInterface;
            this._createFromGroup(data).forEach((control, index) => {
                allControls[
                    (data as FormGroupInterface).fields[index].name as keyof T
                ] = control;
            });
        } else if (data.hasOwnProperty('groups')) {
            data = data as FormDataInterface;
            data.groups.forEach((group) =>
                this._createFromGroup(group).forEach((control, index) => {
                    allControls[group.fields[index].name as keyof T] = control;
                })
            );
        }
        return allControls;
    }

    private _createFromGroup(group: FormGroupInterface): FormuverseAbstractControl<any>[] {
        return group.fields.map((field) => {
            const validators: ValidatorFn[] = []
            if(field.validators){
                for (const validator in field.validators) {
                    validators.push(field.validators[validator].validator);
                }
            }
            if ([FormFieldMultipleTypeEnum.CHECKBOX, FormFieldMultipleTypeEnum.MULTISELECT].includes(field.type as FormFieldMultipleTypeEnum)
            ) {
                field = field as FormFieldMultipleInterface;
                const options =
                    field.options instanceof Array
                        ? field.options.map(
                              (option) => new FormuverseControl(option.value)
                          )
                        : [];
                return new FormuverseArray(
                    options,
                    validators
                );
            }
            return new FormuverseControl<any>(field.initialValue, validators);
        });
    }
}
