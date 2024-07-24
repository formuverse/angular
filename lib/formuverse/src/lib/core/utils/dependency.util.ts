import { AbstractControl } from "@angular/forms";
import { CriteriaEnum } from "../enums/form.enum";
import { dependenciesInterface, FormType } from "../interfaces/data.interface";

export class DependencyUtil {
    static isValidDependencies<T extends Record<string, any>>(dependencies: dependenciesInterface[], form: FormType<T>): boolean {
        return dependencies.every((dependency) => {
            const field = dependency.field as keyof typeof form;
            const control = form[field] as AbstractControl;
            if (!control) {
                return false;
            }
            switch (dependency.criteria) {
                case CriteriaEnum.EQUALS:
                    return control.value === dependency.value;
                case CriteriaEnum.NOT_EQUALS:
                    return control.value !== dependency.value;
                case CriteriaEnum.GREATER_THAN:
                    return control.value > dependency.value;
                case CriteriaEnum.LESS_THAN:
                    return control.value < dependency.value;
                case CriteriaEnum.GREATER_THAN_OR_EQUALS:
                    return control.value >= dependency.value;
                case CriteriaEnum.LESS_THAN_OR_EQUALS:
                    return control.value <= dependency.value;
                case CriteriaEnum.CONTAINS:
                    return control.value.includes(dependency.value);
                case CriteriaEnum.NOT_CONTAINS:
                    return !control.value.includes(dependency.value);
                default:
                    return false;
            }
        });
    }
}