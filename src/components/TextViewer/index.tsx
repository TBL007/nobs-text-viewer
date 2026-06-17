import { useConfig } from '@context/Config';
import ListItem from './ListItem';
import Search from './Search';
import { useState } from 'react';

const TextViewer: FC = () => {
    const config = useConfig();

    const [filteredItems, setFilteredItems] = useState(config?.listItems || []);

    return (
        <div>
            <Search filteredItems={filteredItems} setFilteredItems={setFilteredItems} />
            {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                    <div key={index}>
                        <ListItem item={item} />
                    </div>
                ))
            ) : (
                <p>Ingen resultater.</p>
            )}
        </div>
    );
};

export default TextViewer;
