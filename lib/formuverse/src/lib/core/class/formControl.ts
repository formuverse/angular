import { AsyncValidatorFn, FormControl, FormControlOptions, ValidatorFn } from "@angular/forms";

export class FormuverseControl<TValue> extends FormControl {
    private _showField = true;

    constructor(value: any, validatorOrOpts?: ValidatorFn | ValidatorFn[] | FormControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
        super(value, validatorOrOpts, asyncValidator);
    }

    public set showField(value: boolean) {
        this._showField = value;
    }

    public get showField() {
        return this._showField;
    }
}