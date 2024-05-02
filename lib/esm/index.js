import ReactDOM from 'react-dom/client';
import { jsx } from 'react/jsx-runtime';
import { createContext, useContext, useState, useRef, useEffect, isValidElement, useMemo } from 'react';
import { Designer } from 'sequential-workflow-designer';

var Presenter = /** @class */ (function () {
    function Presenter() {
    }
    Presenter.render = function (className, rootRef, element) {
        Presenter.tryDestroy(rootRef);
        var container = document.createElement('div');
        container.className = className;
        rootRef.current = ReactDOM.createRoot(container);
        rootRef.current.render(element);
        return container;
    };
    Presenter.tryDestroy = function (rootRef) {
        if (rootRef.current) {
            var oldRoot_1 = rootRef.current;
            rootRef.current = null;
            setTimeout(function () { return oldRoot_1.unmount(); });
        }
    };
    return Presenter;
}());

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

if (!window.sqdRootEditorContext) {
    window.sqdRootEditorContext = createContext(null);
}
var rootEditorContext = window.sqdRootEditorContext;
function useRootEditor() {
    var wrapper = useContext(rootEditorContext);
    if (!wrapper) {
        throw new Error('Cannot find root editor context');
    }
    return wrapper;
}
function RootEditorWrapperContext(props) {
    var _a = useState(function () { return createWrapper(); }), wrapper = _a[0], setWrapper = _a[1];
    function createWrapper() {
        return {
            properties: props.definition.properties,
            definition: props.definition,
            isReadonly: props.isReadonly,
            setProperty: setProperty
        };
    }
    function forward() {
        setWrapper(createWrapper());
    }
    function setProperty(name, value) {
        props.definition.properties[name] = value;
        props.context.notifyPropertiesChanged();
        forward();
    }
    return jsx(rootEditorContext.Provider, __assign({ value: wrapper }, { children: props.children }));
}

if (!window.sqdStepEditorContext) {
    window.sqdStepEditorContext = createContext(null);
}
var stepEditorContext = window.sqdStepEditorContext;
function useStepEditor() {
    var wrapper = useContext(stepEditorContext);
    if (!wrapper) {
        throw new Error('Cannot find step editor context');
    }
    return wrapper;
}
function StepEditorWrapperContext(props) {
    var _a = useState(function () { return createWrapper(); }), wrapper = _a[0], setWrapper = _a[1];
    function createWrapper() {
        return {
            id: props.step.id,
            type: props.step.type,
            componentType: props.step.componentType,
            name: props.step.name,
            properties: props.step.properties,
            step: props.step,
            definition: props.definition,
            isReadonly: props.isReadonly,
            setName: setName,
            setProperty: setProperty,
            notifyPropertiesChanged: notifyPropertiesChanged,
            notifyChildrenChanged: notifyChildrenChanged
        };
    }
    function forward() {
        setWrapper(createWrapper());
    }
    function setName(name) {
        props.step.name = name;
        notifyNameChanged();
    }
    function setProperty(name, value) {
        props.step.properties[name] = value;
        notifyPropertiesChanged();
    }
    function notifyNameChanged() {
        props.context.notifyNameChanged();
        forward();
    }
    function notifyPropertiesChanged() {
        props.context.notifyPropertiesChanged();
        forward();
    }
    function notifyChildrenChanged() {
        props.context.notifyChildrenChanged();
        forward();
    }
    return jsx(stepEditorContext.Provider, __assign({ value: wrapper }, { children: props.children }));
}

function wrapDefinition(value, isValid) {
    return {
        value: value,
        isValid: isValid
    };
}

var externalEditorClassName = 'sqd-editor-react';
function SequentialWorkflowDesigner(props) {
    var _a = useState(null), placeholder = _a[0], setPlaceholder = _a[1];
    var onDefinitionChangeRef = useRef(props.onDefinitionChange);
    var onSelectedStepIdChangedRef = useRef(props.onSelectedStepIdChanged);
    var onIsEditorCollapsedChangedRef = useRef(props.onIsEditorCollapsedChanged);
    var onIsToolboxCollapsedChangedRef = useRef(props.onIsToolboxCollapsedChanged);
    var rootEditorRef = useRef(props.rootEditor);
    var stepEditorRef = useRef(props.stepEditor);
    var controllerRef = useRef(props.controller);
    var customActionHandlerRef = useRef(props.customActionHandler);
    var designerRef = useRef(null);
    var editorRootRef = useRef(null);
    var definition = props.definition;
    var selectedStepId = props.selectedStepId;
    var isReadonly = props.isReadonly;
    var theme = props.theme;
    var undoStackSize = props.undoStackSize;
    var steps = props.stepsConfiguration;
    var validator = props.validatorConfiguration;
    var toolbox = props.toolboxConfiguration;
    var isEditorCollapsed = props.isEditorCollapsed;
    var isToolboxCollapsed = props.isToolboxCollapsed;
    var controlBar = props.controlBar;
    var contextMenu = props.contextMenu;
    var keyboard = props.keyboard;
    var extensions = props.extensions;
    if (props.controlBar === undefined) {
        throw new Error('The "controlBar" property is not set');
    }
    if (props.globalEditor) {
        throw new Error('The "globalEditor" property is renamed to "rootEditor"');
    }
    function forwardDefinition() {
        if (designerRef.current) {
            var wd = wrapDefinition(designerRef.current.getDefinition(), designerRef.current.isValid());
            onDefinitionChangeRef.current(wd);
        }
    }
    function rootEditorProvider(def, context, isReadonly) {
        if (!rootEditorRef.current) {
            throw new Error('Root editor is not provided');
        }
        if (isValidElement(rootEditorRef.current)) {
            return Presenter.render(externalEditorClassName, editorRootRef, jsx(RootEditorWrapperContext, __assign({ definition: def, context: context, isReadonly: isReadonly }, { children: rootEditorRef.current })));
        }
        return rootEditorRef.current(def, context, isReadonly);
    }
    function stepEditorProvider(step, context, def, isReadonly) {
        if (!stepEditorRef.current) {
            throw new Error('Step editor is not provided');
        }
        if (isValidElement(stepEditorRef.current)) {
            return Presenter.render(externalEditorClassName, editorRootRef, jsx(StepEditorWrapperContext, __assign({ step: step, definition: def, context: context, isReadonly: isReadonly }, { children: stepEditorRef.current })));
        }
        return stepEditorRef.current(step, context, def, isReadonly);
    }
    function customActionHandler(action, step, sequence, context) {
        if (customActionHandlerRef.current) {
            customActionHandlerRef.current(action, step, sequence, context);
        }
    }
    function tryDestroy() {
        Presenter.tryDestroy(editorRootRef);
        if (controllerRef.current) {
            controllerRef.current.setDesigner(null);
        }
        if (designerRef.current) {
            designerRef.current.destroy();
            designerRef.current = null;
            // console.log('sqd: designer destroyed');
        }
    }
    useEffect(function () {
        onDefinitionChangeRef.current = props.onDefinitionChange;
    }, [props.onDefinitionChange]);
    useEffect(function () {
        onSelectedStepIdChangedRef.current = props.onSelectedStepIdChanged;
    }, [props.onSelectedStepIdChanged]);
    useEffect(function () {
        onIsEditorCollapsedChangedRef.current = props.onIsEditorCollapsedChanged;
    }, [props.onIsEditorCollapsedChanged]);
    useEffect(function () {
        onIsToolboxCollapsedChangedRef.current = props.onIsToolboxCollapsedChanged;
    }, [props.onIsToolboxCollapsedChanged]);
    useEffect(function () {
        rootEditorRef.current = props.rootEditor;
    }, [props.rootEditor]);
    useEffect(function () {
        stepEditorRef.current = props.stepEditor;
    }, [props.stepEditor]);
    useEffect(function () {
        customActionHandlerRef.current = props.customActionHandler;
    }, [props.customActionHandler]);
    useEffect(function () {
        if (!placeholder) {
            return;
        }
        if (designerRef.current) {
            var isNotChanged = definition.value === designerRef.current.getDefinition();
            if (isNotChanged) {
                if (selectedStepId !== undefined && selectedStepId !== designerRef.current.getSelectedStepId()) {
                    if (selectedStepId) {
                        designerRef.current.selectStepById(selectedStepId);
                    }
                    else {
                        designerRef.current.clearSelectedStep();
                    }
                    // console.log('sqd: selected step updated');
                }
                if (isReadonly !== undefined && isReadonly !== designerRef.current.isReadonly()) {
                    designerRef.current.setIsReadonly(isReadonly);
                    // console.log('sqd: isReadonly updated');
                }
                if (isToolboxCollapsed !== undefined && isToolboxCollapsed !== designerRef.current.isToolboxCollapsed()) {
                    designerRef.current.setIsToolboxCollapsed(isToolboxCollapsed);
                    // console.log('sqd: isToolboxCollapsed updated');
                }
                if (isEditorCollapsed !== undefined && isEditorCollapsed !== designerRef.current.isEditorCollapsed()) {
                    designerRef.current.setIsEditorCollapsed(isEditorCollapsed);
                    // console.log('sqd: isEditorCollapsed updated');
                }
                return;
            }
            tryDestroy();
        }
        var designer = Designer.create(placeholder, definition.value, {
            theme: theme,
            undoStackSize: undoStackSize,
            toolbox: toolbox
                ? __assign(__assign({}, toolbox), { isCollapsed: isToolboxCollapsed }) : false,
            steps: steps,
            validator: validator,
            controlBar: controlBar,
            contextMenu: contextMenu,
            keyboard: keyboard,
            editors: rootEditorRef.current && stepEditorRef.current
                ? {
                    isCollapsed: isEditorCollapsed,
                    rootEditorProvider: rootEditorProvider,
                    stepEditorProvider: stepEditorProvider
                }
                : false,
            customActionHandler: customActionHandlerRef.current && customActionHandler,
            extensions: extensions,
            isReadonly: isReadonly
        });
        if (controllerRef.current) {
            controllerRef.current.setDesigner(designer);
        }
        if (selectedStepId) {
            designer.selectStepById(selectedStepId);
        }
        // console.log('sqd: designer rendered');
        designer.onReady.subscribe(forwardDefinition);
        designer.onDefinitionChanged.subscribe(forwardDefinition);
        designer.onSelectedStepIdChanged.subscribe(function (stepId) {
            if (onSelectedStepIdChangedRef.current) {
                onSelectedStepIdChangedRef.current(stepId);
            }
        });
        designer.onIsToolboxCollapsedChanged.subscribe(function (isCollapsed) {
            if (onIsToolboxCollapsedChangedRef.current) {
                onIsToolboxCollapsedChangedRef.current(isCollapsed);
            }
        });
        designer.onIsEditorCollapsedChanged.subscribe(function (isCollapsed) {
            if (onIsEditorCollapsedChangedRef.current) {
                onIsEditorCollapsedChangedRef.current(isCollapsed);
            }
        });
        designerRef.current = designer;
    }, [
        placeholder,
        definition,
        selectedStepId,
        isReadonly,
        theme,
        undoStackSize,
        toolbox,
        isToolboxCollapsed,
        isEditorCollapsed,
        contextMenu,
        keyboard,
        controlBar,
        steps,
        validator,
        extensions
    ]);
    useEffect(function () {
        return tryDestroy;
    }, []);
    return jsx("div", { ref: setPlaceholder, "data-testid": "designer", className: "sqd-designer-react" });
}

var SequentialWorkflowDesignerController = /** @class */ (function () {
    function SequentialWorkflowDesignerController() {
        var _this = this;
        this.designer = null;
        /**
         * @description Moves the viewport to the step with the animation.
         */
        this.moveViewportToStep = function (stepId) {
            _this.getDesigner().moveViewportToStep(stepId);
        };
        /**
         * @description Updates all badges.
         */
        this.updateBadges = function () {
            _this.getDesigner().updateBadges();
        };
        /**
         * @description Rerender the root component and all its children.
         */
        this.updateRootComponent = function () {
            _this.getDesigner().updateRootComponent();
        };
        /**
         * Replaces the current definition with a new one and adds the previous definition to the undo stack.
         * @param definition A new definition.
         */
        this.replaceDefinition = function (definition) {
            return _this.getDesigner().replaceDefinition(definition);
        };
        // Nothing...
    }
    SequentialWorkflowDesignerController.create = function () {
        return new SequentialWorkflowDesignerController();
    };
    /**
     * @returns `true` if the controller is ready to be used, `false` otherwise.
     */
    SequentialWorkflowDesignerController.prototype.isReady = function () {
        return !!this.designer;
    };
    SequentialWorkflowDesignerController.prototype.setDesigner = function (designer) {
        if (designer && this.designer) {
            throw new Error('Designer is already set');
        }
        this.designer = designer;
    };
    SequentialWorkflowDesignerController.prototype.getDesigner = function () {
        if (!this.designer) {
            throw new Error('Designer is not ready yet');
        }
        return this.designer;
    };
    return SequentialWorkflowDesignerController;
}());
function useSequentialWorkflowDesignerController(deps) {
    return useMemo(function () { return SequentialWorkflowDesignerController.create(); }, deps || []);
}

export { Presenter, RootEditorWrapperContext, SequentialWorkflowDesigner, SequentialWorkflowDesignerController, StepEditorWrapperContext, useRootEditor, useSequentialWorkflowDesignerController, useStepEditor, wrapDefinition };
