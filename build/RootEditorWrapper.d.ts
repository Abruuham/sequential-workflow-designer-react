import { Context, ReactNode } from 'react';
import { Definition, RootEditorContext } from 'sequential-workflow-designer';
declare global {
    interface Window {
        sqdRootEditorContext?: Context<RootEditorWrapper<Definition> | null>;
    }
}
export interface RootEditorWrapper<TDefinition extends Definition> {
    readonly properties: TDefinition['properties'];
    readonly definition: TDefinition;
    readonly isReadonly: boolean;
    setProperty(name: keyof TDefinition['properties'], value: TDefinition['properties'][typeof name]): void;
}
export declare function useRootEditor<TDefinition extends Definition = Definition>(): RootEditorWrapper<TDefinition>;
export interface RootEditorWrapperContextProps {
    children: ReactNode;
    definition: Definition;
    context: RootEditorContext;
    isReadonly: boolean;
}
export declare function RootEditorWrapperContext(props: RootEditorWrapperContextProps): import("react/jsx-runtime").JSX.Element;
