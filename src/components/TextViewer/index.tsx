import { useConfig } from '@context/Config';
import ListItem from './ListItem';
import Search from './Search';
import { useState } from 'react';

const TextViewer: FC = () => {
    const config = useConfig();

    const [filteredItems, setFilteredItems] = useState(config?.listItems || []);

    return (
        <div>
            <Search setFilteredItems={setFilteredItems} />
            {filteredItems.length > 0 ? (
                filteredItems.map((item: TextViewer.ListItem, index) => (
                    <ListItem key={index} {...item} />
                ))
            ) : (
                <p>Ingen resultater.</p>
            )}
        </div>
    );
};

export default TextViewer;
