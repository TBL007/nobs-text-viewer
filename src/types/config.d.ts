declare global {
    namespace TextViewer {
        interface Config {
            listItems: any[];

            icons?: {
                name: string;
                html: string;
            }[];

            defaultListItemComponent?: string;
            listItemComponents: ListItemComponent[];

            scriptNames: TextViewer.ScriptNames;

            // should be kept, or remove from log file.
            ignoreInfo: boolean;
            ignoreWarnings: boolean;
        }
    }

    // Make values accessible via window
    interface Window {
        _config?: TextViewer.Config;
    }
}

export {};
