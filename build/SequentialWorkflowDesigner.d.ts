/// <reference types="react" />
import { Definition, ToolboxConfiguration, StepsConfiguration, DesignerExtension, CustomActionHandler, ValidatorConfiguration, RootEditorProvider, StepEditorProvider, KeyboardConfiguration } from 'sequential';
import { WrappedDefinition } from './WrappedDefinition';
import { SequentialWorkflowDesignerController } from './SequentialWorkflowDesignerController';
export type ReactToolboxConfiguration = Omit<ToolboxConfiguration, 'isCollapsed'>;
export interface SequentialWorkflowDesignerProps<TDefinition extends Definition> {
    definition: WrappedDefinition<TDefinition>;
    onDefinitionChange: (state: WrappedDefinition<TDefinition>) => void;
    selectedStepId?: string | null;
    onSelectedStepIdChanged?: (stepId: string | null) => void;
    isReadonly?: boolean;
    rootEditor: false | JSX.Element | RootEditorProvider;
    stepEditor: false | JSX.Element | StepEditorProvider;
    isEditorCollapsed?: boolean;
    onIsEditorCollapsedChanged?: (isCollapsed: boolean) => void;
    theme?: string;
    undoStackSize?: number;
    stepsConfiguration: StepsConfiguration;
    validatorConfiguration?: ValidatorConfiguration;
    toolboxConfiguration: false | ReactToolboxConfiguration;
    isToolboxCollapsed?: boolean;
    onIsToolboxCollapsedChanged?: (isCollapsed: boolean) => void;
    /**
     * @description If true, the control bar will be displayed.
     */
    controlBar: boolean;
    contextMenu?: boolean;
    keyboard?: boolean | KeyboardConfiguration;
    controller?: SequentialWorkflowDesignerController;
    customActionHandler?: CustomActionHandler;
    extensions?: DesignerExtension[];
}
export declare function SequentialWorkflowDesigner<TDefinition extends Definition>(props: SequentialWorkflowDesignerProps<TDefinition>): import("react/jsx-runtime").JSX.Element;
