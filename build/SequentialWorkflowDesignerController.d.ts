import { DependencyList } from 'react';
import { Definition, Designer } from 'sequential-workflow-designer';
export declare class SequentialWorkflowDesignerController {
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
export declare function useSequentialWorkflowDesignerController(deps?: DependencyList): SequentialWorkflowDesignerController;
