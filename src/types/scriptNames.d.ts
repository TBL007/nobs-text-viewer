declare global {
    namespace TextViewer {
        interface ScriptNames {
            /** Runs when an list item is clicked */
            onListItemClick?: string;

            /** Only used if the script result shall be returned to JS */
            onJsRequest?: string;
            onJsError?: string;
        }
    }
}

export {};
