import { FormGroup, ValidatorFn } from '@angular/forms';
import {
    FormControlsInterface,
    FormDataInterface,
    FormFieldMultipleInterface,
    FormFieldOptionInterface,
    FormGroupInterface,
    FormType,
    FormuverseAbstractControl,
} from '../interfaces/data.interface';
import { FormBase } from '../class/formBase';
import { Injectable } from '@angular/core';
import { FormFieldMultipleTypeEnum } from '../enums/form.enum';
import { FormuverseControl } from '../class/formControl';
import { BehaviorSubject } from 'rxjs';
import { FormuverseGroup } from '../class/formGroup';

@Injectable({
    providedIn: 'root'
  })
export class FormService {
    async createForm<T extends Record<string, any>>(
        data: FormDataInterface | FormGroupInterface
    ): Promise<FormType<T>> {
        return new FormBase<T>(await this._createControls<T>(data), data) as FormType<T>;
    }

    private async _createControls<T extends Record<string, any>>(
        data: FormDataInterface | FormGroupInterface
    ) {
        const allControls: FormControlsInterface<T> =
            {} as FormControlsInterface<T>;
        if (data.hasOwnProperty('fields')) {
            data = data as FormGroupInterface;
            const formGroup = await this._createFromGroup(data)
            formGroup.forEach((control, index) => {
                allControls[
                    (data as FormGroupInterface).fields[index].name as keyof T
                ] = control;
            });
        } else if (data.hasOwnProperty('groups')) {
            data = data as FormDataInterface;
            data.groups.forEach(async (group) => {
                const formGroup = await this._createFromGroup(group)
                formGroup.forEach((control, index) => {
                    allControls[group.fields[index].name as keyof T] = control;
                })
            }
            );
        }
        return allControls;
    }

    private _createFromGroup(group: FormGroupInterface): Promise<FormuverseAbstractControl<any>[]> {
        const promises = group.fields.map(async (field) => {
            const validators: ValidatorFn[] = []
            if(field.validators){
                for (const validator in field.validators) {
                    validators.push(field.validators[validator].validator);
                }
            }
            if ([FormFieldMultipleTypeEnum.CHECKBOX, FormFieldMultipleTypeEnum.MULTISELECT].includes(field.type as FormFieldMultipleTypeEnum)
            ) {
                field = field as FormFieldMultipleInterface;
                return await this._createFormGroupForOptions(field.options, validators);
            }
            return new FormuverseControl<any>(field.initialValue, validators);
        });
        return Promise.all(promises);
    }

    private _createFormGroupForOptions(options: FormFieldOptionInterface[] | BehaviorSubject<FormFieldOptionInterface[]>, validators: ValidatorFn[]): Promise<FormuverseGroup> {
        return new Promise<FormuverseGroup>((resolve, reject) => {
            if (options instanceof BehaviorSubject) {
                options.subscribe((options) => {
                    return resolve(new FormuverseGroup(this._createFormControlsForOptions(options), validators));
                });
            } else {
                resolve(new FormuverseGroup(this._createFormControlsForOptions(options)));
            }

        });
    }

    private _createFormControlsForOptions(options: FormFieldOptionInterface[]) {
        const formControls: Record<string, FormuverseControl<boolean>> = {};
        options.forEach((option) => (formControls[option.value] = new FormuverseControl(option.value)))
        return formControls;
    }
}
