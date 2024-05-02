import { Context, ReactNode } from 'react';
import { StepEditorContext, Step, Definition } from 'sequential';
declare global {
    interface Window {
        sqdStepEditorContext?: Context<StepEditorWrapper | null>;
    }
}
export interface StepEditorWrapper<TStep extends Step = Step, TDefinition extends Definition = Definition> {
    readonly id: string;
    readonly type: TStep['type'];
    readonly componentType: TStep['componentType'];
    readonly name: string;
    readonly properties: TStep['properties'];
    readonly step: TStep;
    readonly definition: TDefinition;
    readonly isReadonly: boolean;
    setName(name: string): void;
    setProperty(name: keyof TStep['properties'], value: TStep['properties'][typeof name]): void;
    notifyPropertiesChanged(): void;
    notifyChildrenChanged(): void;
}
export declare function useStepEditor<TStep extends Step = Step, TDefinition extends Definition = Definition>(): StepEditorWrapper<TStep, TDefinition>;
export interface StepEditorWrapperContextProps {
    children: ReactNode;
    step: Step;
    definition: Definition;
    context: StepEditorContext;
    isReadonly: boolean;
}
export declare function StepEditorWrapperContext(props: StepEditorWrapperContextProps): import("react/jsx-runtime").JSX.Element;
