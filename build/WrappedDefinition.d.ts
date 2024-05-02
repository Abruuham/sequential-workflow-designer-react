import { Definition } from 'sequential-workflow-designer';
export interface WrappedDefinition<TDefinition extends Definition = Definition> {
    readonly value: TDefinition;
    readonly isValid: boolean | undefined;
}
export declare function wrapDefinition<TDefinition extends Definition = Definition>(value: TDefinition, isValid?: boolean): WrappedDefinition<TDefinition>;
