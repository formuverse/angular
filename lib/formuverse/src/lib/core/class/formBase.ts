import { FormGroup, ValidatorFn } from '@angular/forms';
import {
    FormControlsInterface,
    FormDataInterface,
    FormGroupInterface,
    FormType,
    FormuverseAbstractControl,
} from '../interfaces/data.interface';
import { DependencyUtil } from '../utils/dependency.util';

export class FormBase<T extends Record<string, any>> extends FormGroup {
    override controls: FormControlsInterface<T>;
    constructor(
        _controls: FormControlsInterface<T>,
        private _data: FormDataInterface | FormGroupInterface
    ) {
        super(_controls);
        this.controls = _controls;
        for (const key in _controls) {
            Object.defineProperty(this, key, {
                get: () => this.get(key) as FormuverseAbstractControl<T[keyof T]>,
                writable: true,
                enumerable: true,
                configurable: true,
            });
        }
        this._handleValidatorsByCriteria();
    }

    public getFirstError(): string | null {
        for (const key in this.controls) {
            const control = this.get(key);
            if (control && control.errors) {
                const errorKey = Object.keys(control.errors)[0];
                return control.getError(errorKey) as string;
            }
        }
        return null;
    }

    public getFirstErrorFromControl(controlName: string): string | null {
        const control = this.get(controlName);
        if (!control || !control.errors) {
            return null;
        }
        const errorKey = Object.keys(control.errors)[0];
        return (
            this._getErrorMessageFromData(controlName, errorKey) ??
            (control.getError(errorKey) as string)
        );
    }

    public getValue(): Record<string, any> {
        const formValue = this.value;
        for (const key in formValue) {
            if (formValue[key] === null || formValue[key] === '') {
                delete formValue[key];
            }
        }
        return formValue;
    }

    override get(controlName: string): FormuverseAbstractControl<T[keyof T]> {
        return super.get(controlName) as FormuverseAbstractControl<T[keyof T]>;
    }

    private _getErrorMessageFromData(
        name: string,
        error: string
    ): string | null {
        if (this._data.hasOwnProperty('fields')) {
            const field = (this._data as FormGroupInterface).fields.find(
                (field) => field.name === name
            );
            return (
                (field &&
                    field.validators &&
                    field.validators[error]?.message) ||
                null
            );
        } else if (this._data.hasOwnProperty('groups')) {
            for (const group of (this._data as FormDataInterface).groups) {
                const field = group.fields.find((field) => field.name === name);
                if (field) {
                    return (
                        (field &&
                            field.validators &&
                            field.validators[error]?.message) ||
                        null
                    );
                }
            }
        }
        return null;
    }

    private _handleValidatorsByCriteria(): void {
        this.valueChanges.subscribe(() => {
            if (this._data.hasOwnProperty('groups')) {
                this._handleValidatorsByGroup(this._data as FormDataInterface);
            } else if (this._data.hasOwnProperty('fields')) {
                this._handleValidatorsByField(this._data as FormGroupInterface);
            }
        });
    }

    private _handleValidatorsByGroup(data: FormDataInterface): void {
        data.groups.forEach((group) => {
            this._handleValidatorsByField(group);
        });
    }

    private _handleValidatorsByField(group: FormGroupInterface): void {
        group.fields.forEach((field) => {
            const control = this.get(field.name);
            if (control) {
                if (field.dependencies && field.dependencies.length) {
                    if (
                        DependencyUtil.isValidDependencies(
                            field.dependencies,
                            this as FormType<T>
                        )
                    ) {
                        control.enable();
                        control.showField = true;
                        const validators: ValidatorFn[] = [];
                        if (field.validators) {
                            for (const validator in field.validators) {
                                validators.push(
                                    field.validators[validator].validator
                                );
                            }
                        }
                        control.setValidators(validators);
                    } else {
                        control.disable();
                        control.clearValidators();
                        control.showField = false;
                    }
                }
            }
        });
    }
}
