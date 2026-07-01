import { useConfig } from '@context/Config';
import { templateKey } from '@utils/getFieldValue';
import { warn } from '@utils/log';
import searchObject from '@utils/searchObject';
import { useMemo } from 'react';
import Field from './Field';
import ChevronLeft from 'jsx:@svg/chevron-left.svg';

const ListItem: FC<TextViewer.ListItem> = ({ ...props }) => {
    const config = useConfig()!;

    const component = useMemo(() => {
        let comp: TextViewer.ListItemComponent | undefined;

        if (props._component) {
            comp = config.listItemComponents?.find((c) => c.name === props._component);
            if (!comp) warn(`A component by the name ${props._component} was not found`, props);
        } else {
            const matchingComponents =
                config.listItemComponents?.filter(
                    (c) => c._filter && searchObject(props, c._filter)
                ) || [];
            if (matchingComponents.length > 1) {
                // More than one component matches, select the first with _filter (stricter is better)
                comp = matchingComponents.find((c) => !!c._filter) || matchingComponents[0];
            } else comp = matchingComponents[0];
        }

        if (!comp && config.defaultListItemComponent) {
            comp = config.listItemComponents?.find(
                (c) => c.name === config.defaultListItemComponent
            );
        }

        return comp;
    }, [props, config.defaultListItemComponent, config.listItemComponents]);

    if (!Object.keys(props).length) return null;

    if (!component) {
        warn('A component was not found for the following event', props);
        return null;
    }

    const style: React.CSSProperties = {
        cursor: config.scriptNames?.onListItemClick ? 'pointer' : undefined,
    };

    if (component.htmlTemplate && component.htmlTemplate[0] === '<') {
        const parsedHtml = component.htmlTemplate
            .replaceAll(/\{([^{}]*?(?:\\\{|\\\}|[^{}])*)\}/g, (_, key: string) =>
                templateKey(props, key.replaceAll('\\{', '{').replaceAll('\\}', '}'))
            )
            .replaceAll('\\{', '{')
            .replaceAll('\\}', '}');

        return (
            <div
                style={style}
                className="list-item"
                dangerouslySetInnerHTML={{ __html: parsedHtml ?? '' }}
            />
        );
    }

    return (
        <div className="list-item-wrapper">
            <div style={style} className="list-item">
                {component.fields?.map((field, i) => (
                    <Field key={i} listItem={props} {...field} />
                ))}
            </div>
            <ChevronLeft className="list-item-chevron" />
        </div>
    );
};

export default ListItem;
