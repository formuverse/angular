import { AbstractControl, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import {
    FormControlsInterface,
    FormDataInterface,
    FormGroupInterface,
    FormType,
} from '../interfaces/data.interface';
import { FormBase } from '../class/form-base.form';
import { Injectable } from '@angular/core';
import { FormTypeEnum } from '../enums/form.enum';

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

    private _createFromGroup(group: FormGroupInterface): AbstractControl[] {
        return group.fields.map((field) => {
            if (
                field.type === FormTypeEnum.CHECKBOX ||
                (field.type === FormTypeEnum.SELECT && field.isMultiple)
            ) {
                const options =
                    field.options instanceof Array
                        ? field.options.map(
                              (option) => new FormControl(option.value)
                          )
                        : [];
                const validators: ValidatorFn[] = []
                if(field.validators){
                    for (const validator in field.validators) {
                        validators.push(field.validators[validator].validator);
                    }
                }
                return new FormArray<any>(
                    options,
                    validators
                );
            }
            return new FormControl<any>(field.initialValue);
        });
    }
}
