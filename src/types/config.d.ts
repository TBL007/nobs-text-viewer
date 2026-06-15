declare global {
    namespace TextViewer {
        interface Config {
            value: string;

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

export {}