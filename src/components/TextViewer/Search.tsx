import { useConfig } from '@context/Config';
import { useEffect, useState } from 'react';

interface SearchProps {
    setFilteredItems: (items: any[]) => void;
}

const Search: FC<SearchProps> = ({ setFilteredItems }) => {
    const config = useConfig();

    const [search, setSearch] = useState('');

    useEffect(() => {
        setFilteredItems(
            (config?.listItems || []).filter((item) => {
                if (typeof item === 'string') {
                    return item.includes(search);
                } else return true;
            })
        );
    }, [search]);

    return (
        <div>
            <input
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
        </div>
    );
};

export default Search;
