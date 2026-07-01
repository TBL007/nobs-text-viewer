import { createContext, useContext, useEffect, useState } from 'react';

import { loadCallbacks } from '@utils/performScript';

const defaultConfig: Partial<TextViewer.Config> = {
    listItems: ['adsf', 'adsf', 'adsf', 'adsf', 'adsf', 'adsf', 'adsf'],
    defaultListItemComponent: 'default',

    // set each field  with a template or value with key
    filters: {
        // The list of items to filter on.
        filterItems: [
            {
                name: 'Medisinsk',
                value: 'Medisinsk',
            },
            {
                name:"Bilde",
                value:"Bilde"
            }
        ],

        // The key of the list item to filter on.
        listItemKey: 'value',

        all: 'Alle', // Which tag counts as All / no filter
    },
    listItemComponents: [
        {
            name: 'default',
            fields: [
                {
                    value: 'title',
                },
                {
                    template: 'Desc: {value}',
                },
                {
                    template: 'Id: {id}',
                },
                {
                    value: 'account',
                },
                {
                    value: 'name',
                },
            ],
        },
    ],
    searchkeys: ['title'],
    searchField: {
        instant: true, // if searching is instant
        placeHolder: 'Search', // Search bar placeholder
        emptyButton: true,
        value: '', // default search
    },
};

// Parses the JSON from FileMaker into a readable config
const parseConfig = (cfg: string = '{}') => {
    try {
        const config = JSON.parse(cfg) as TextViewer.Config;

        Object.keys(defaultConfig).forEach((key) => {
            (config as RSAny)[key] ??= defaultConfig[key as keyof TextViewer.Config];
        });

        return config;
    } catch (err) {
        console.error(err);
    }
};

// Runs any script that was attempted called before the config was loaded
const runLoadCallbacks = () =>
    loadCallbacks.length &&
    loadCallbacks.forEach((cb) => {
        cb();
        loadCallbacks.splice(loadCallbacks.indexOf(cb), 1);
    });

// FileMaker may call init before useEffect can assign the function
// This acts as a failsafe
window.init = (cfg) => {
    const parsedConfig = parseConfig(cfg);
    if (!parsedConfig) return;

    window._config = parsedConfig;
    runLoadCallbacks();
};

const ConfigContext = createContext<State<TextViewer.Config | null>>([null, () => {}]);
const ConfigProvider: FC = ({ children }) => {
    const [config, setConfig] = useState<TextViewer.Config | null>(null);

    useEffect(() => {
        if (window._config !== undefined) setConfig(window._config);

        window.init = (cfg) => {
            const parsedConfig = parseConfig(cfg);
            if (!parsedConfig) return;

            window._config = parsedConfig;
            setConfig(parsedConfig);

            runLoadCallbacks();
        };
    }, []);

    // Update window._config upon change
    useEffect(() => {
        window._config = config || undefined;
    }, [config]);

    //if (!config) return null;
    return <ConfigContext.Provider value={[config, setConfig]}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => {
    const [config] = useContext(ConfigContext);
    return config;
};

export const useConfigState = () => {
    const ctx = useContext(ConfigContext);
    return ctx;
};

export default ConfigProvider;
