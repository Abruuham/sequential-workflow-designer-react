import { MutableRefObject } from 'react';
import ReactDOM from 'react-dom/client';
export declare class Presenter {
    static render(className: string, rootRef: MutableRefObject<ReactDOM.Root | null>, element: JSX.Element): HTMLElement;
    static tryDestroy(rootRef: MutableRefObject<ReactDOM.Root | null>): void;
}
