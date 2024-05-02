/// <reference types="react" />
import { MutableRefObject, Context, ReactNode, DependencyList } from 'react';
import ReactDOM from 'react-dom/client';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { Definition, RootEditorContext, Designer, ToolboxConfiguration, RootEditorProvider, StepEditorProvider, StepsConfiguration, ValidatorConfiguration, KeyboardConfiguration, CustomActionHandler, DesignerExtension, Step, StepEditorContext } from 'sequential-workflow-designer';

declare class Presenter {
    static render(className: string, rootRef: MutableRefObject<ReactDOM.Root | null>, element: JSX.Element): HTMLElement;
    static tryDestroy(rootRef: MutableRefObject<ReactDOM.Root | null>): void;
}

declare global {
    interface Window {
        sqdRootEditorContext?: Context<RootEditorWrapper<Definition> | null>;
    }
}
interface RootEditorWrapper<TDefinition extends Definition> {
    readonly properties: TDefinition['properties'];
    readonly definition: TDefinition;
    readonly isReadonly: boolean;
    setProperty(name: keyof TDefinition['properties'], value: TDefinition['properties'][typeof name]): void;
}
declare function useRootEditor<TDefinition extends Definition = Definition>(): RootEditorWrapper<TDefinition>;
interface RootEditorWrapperContextProps {
    children: ReactNode;
    definition: Definition;
    context: RootEditorContext;
    isReadonly: boolean;
}
declare function RootEditorWrapperContext(props: RootEditorWrapperContextProps): react_jsx_runtime.JSX.Element;

interface WrappedDefinition<TDefinition extends Definition = Definition> {
    readonly value: TDefinition;
    readonly isValid: boolean | undefined;
}
declare function wrapDefinition<TDefinition extends Definition = Definition>(value: TDefinition, isValid?: boolean): WrappedDefinition<TDefinition>;

declare class SequentialWorkflowDesignerController {
    static create(): SequentialWorkflowDesignerController;
    private designer;
    private constructor();
    /**
     * @description Moves the viewport to the step with the animation.
     */
    readonly moveViewportToStep: (stepId: string) => void;
    /**
     * @description Updates all badges.
     */
    readonly updateBadges: () => void;
    /**
     * @description Rerender the root component and all its children.
     */
    readonly updateRootComponent: () => void;
    /**
     * Replaces the current definition with a new one and adds the previous definition to the undo stack.
     * @param definition A new definition.
     */
    readonly replaceDefinition: (definition: Definition) => Promise<void>;
    /**
     * @returns `true` if the controller is ready to be used, `false` otherwise.
     */
    isReady(): boolean;
    setDesigner(designer: Designer | null): void;
    private getDesigner;
}
declare function useSequentialWorkflowDesignerController(deps?: DependencyList): SequentialWorkflowDesignerController;

type ReactToolboxConfiguration = Omit<ToolboxConfiguration, 'isCollapsed'>;
interface SequentialWorkflowDesignerProps<TDefinition extends Definition> {
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
declare function SequentialWorkflowDesigner<TDefinition extends Definition>(props: SequentialWorkflowDesignerProps<TDefinition>): react_jsx_runtime.JSX.Element;

declare global {
    interface Window {
        sqdStepEditorContext?: Context<StepEditorWrapper | null>;
    }
}
interface StepEditorWrapper<TStep extends Step = Step, TDefinition extends Definition = Definition> {
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
declare function useStepEditor<TStep extends Step = Step, TDefinition extends Definition = Definition>(): StepEditorWrapper<TStep, TDefinition>;
interface StepEditorWrapperContextProps {
    children: ReactNode;
    step: Step;
    definition: Definition;
    context: StepEditorContext;
    isReadonly: boolean;
}
declare function StepEditorWrapperContext(props: StepEditorWrapperContextProps): react_jsx_runtime.JSX.Element;

export { Presenter, ReactToolboxConfiguration, RootEditorWrapper, RootEditorWrapperContext, RootEditorWrapperContextProps, SequentialWorkflowDesigner, SequentialWorkflowDesignerController, SequentialWorkflowDesignerProps, StepEditorWrapper, StepEditorWrapperContext, StepEditorWrapperContextProps, WrappedDefinition, useRootEditor, useSequentialWorkflowDesignerController, useStepEditor, wrapDefinition };
