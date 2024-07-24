import { AbstractControl, FormGroup } from '@angular/forms';
import { FormControlsInterface, FormDataInterface, FormGroupInterface } from '../interfaces/data.interface';

export class FormBase<T> extends FormGroup {
    override controls: FormControlsInterface<T>;
    constructor(_controls: FormControlsInterface<T>, private _data: FormDataInterface | FormGroupInterface) {
        super(_controls);
        this.controls = _controls;
        for (const key in _controls) {
            Object.defineProperty(this, key, {
                get: () => this.get(key) as AbstractControl,
                writable: true,
                enumerable: true,
                configurable: true,
            });
        }
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
        return this._getErrorMessageFromData(controlName, errorKey) ?? control.getError(errorKey) as string;
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

    private _getErrorMessageFromData(name: string, error: string): string | null {
        if (this._data.hasOwnProperty('fields')) {
            const field = (this._data as FormGroupInterface).fields.find(
                (field) => field.name === name
            );
            return field && field.validators && field.validators[error]?.message || null;
        } else if (this._data.hasOwnProperty('groups')) {
            for (const group of (this._data as FormDataInterface).groups) {
                const field = group.fields.find((field) => field.name === name);
                if (field) {
                    return field && field.validators && field.validators[error]?.message || null;
                }
            }
        }
        return null;
    }
}
