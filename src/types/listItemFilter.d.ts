declare global {
    namespace TextViewer {
        /**
         * Use filterId or _filter if the filter should be handled only in the web component.
         * Otherwise, 'onEventFilterChange' will be ran.
         */
        type ListItemFilter = WithFilter<{
            id?: string;
            title?: string;
            areaName?: string;
            color?: string;

            /** Filter ID to link this filter to, when the target is changed by clicking, this one will also be */
            linkedTo?: string;

            /** Runs a JavaScript function to determine if an event is affected by the filter */
            eval?: string;

            /** Whether the filter is a divider instead of a normal filter */
            divider?: boolean;

            /** Whether the filter is currently being used or not */
            enabled?: boolean;

            /** Whether the filter's on/off state can be changed by the user */
            locked?: boolean;

            /** The order in which the filters should be displayed */
            sort?: number;

            /** Used when "reverse parsing" the index */
            _initialIndex?: number;

            /** script for own filtering */
            script?: string;

            /** True if the filter is hidden, will still work. Useful for programmatically enabling it */
            hidden?: boolean;

            /** If event has no color, this will be used */
            eventColor?:
                | string
                | {
                      /** The color to use for the background */
                      background?: string;

                      /** The color to use for the border */
                      border?: string;

                      /** The color to use for the text */
                      text?: string;
                  };

            /** Highest priority sets the event color, otherwise, the last affecting filter is used for the color */
            eventColorPriority?: number;
        }>;
    }
}

export {};
