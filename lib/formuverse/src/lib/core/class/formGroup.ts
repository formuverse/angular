import { AbstractControl, AsyncValidatorFn, FormGroup, ValidatorFn } from "@angular/forms";

export class FormuverseGroup extends FormGroup {
    private _showField = true;

    constructor(controls: { [key: string]: AbstractControl }, validatorOrOpts?: ValidatorFn | ValidatorFn[] | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
        super(controls, validatorOrOpts, asyncValidator);
    }

    public set showField(value: boolean) {
        this._showField = value;
    }

    public get showField() {
        return this._showField;
    }
}