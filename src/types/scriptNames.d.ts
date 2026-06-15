declare global {
    namespace TextViewer {
        interface ScriptNames {
            /** Only used if the script result shall be returned to JS */
            onJsRequest?: string;
            onJsError?: string;            
        }
    }
}

export {};