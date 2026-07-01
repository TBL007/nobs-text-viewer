declare global {
    namespace TextViewer {
        interface Config {
            listItems: any[];

            icons?: {
                name: string;
                html: string;
            }[];
              filters?: {
                // The list of items to filter on.
                
                filterItems: FilterItem[];
                // The key of the list item to filter on.
                listItemKey: string;

                all:string;
            };
            defaultListItemComponent?: string;
            listItemComponents: ListItemComponent[];

            scriptNames: TextViewer.ScriptNames;

            // should be kept, or remove from log file.
            ignoreInfo: boolean;
            ignoreWarnings: boolean;
            searchkeys: string[];
            searchField: {
                instant: boolean,
                placeHolder: string,
                emptyButton:boolean,
                value:string,
            }
        }
    }

    // Make values accessible via window
    interface Window {
        _config?: TextViewer.Config;
    }
    interface FilterItem {
                    name:string,
                    value:string
                }
}

export {};



