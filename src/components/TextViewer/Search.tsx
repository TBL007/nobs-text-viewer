import { useConfig } from '@context/Config';
import { EventHandler, useEffect, useState } from 'react';
import { stringify } from 'uuid';
import SearchIcon from 'jsx:@svg/search.svg';
import Crossmark from 'jsx:@svg/crossmark.svg';
interface SearchProps {
    setFilteredItems: (items: any[]) => void;
}

const Search: FC<SearchProps> = ({ setFilteredItems }) => {
    const config = useConfig();

    const [search, setSearch] = useState(config?.searchField.value || '');
    const [parsedSearch, setParsedSearch] = useState('');

    const startSearch = () =>
        setFilteredItems(
            (config?.listItems || []).filter((item) => {
                if (typeof item === 'string') {
                    return item.includes(parsedSearch);
                } else if (typeof item === 'object') {
                    if (!config?.searchkeys) return;
                    const keysToSearch =
                        Array.isArray(config?.searchkeys) && config.searchkeys.length !== 0
                            ? config?.searchkeys
                            : Object.keys(item);
                    return keysToSearch.some((key) => {
                        
                        if (item[key] !== undefined && item[key] !== null) {
                            return String(item[key]).toLowerCase().includes(parsedSearch);
                        }
                        return false;
                    });
                } else {
                    console.log(item);
                    return true;
                }
            })
        );

    useEffect(() => {
        setParsedSearch(search.toLowerCase());
        console.log(config?.searchkeys);

        if (config?.searchField.instant) startSearch();
    }, [search]);
    const enterPressed = (event:any) =>{
        if (event.key === 'Enter') startSearch()
    }
    return (
        <div className="search-field">
            <input
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                placeholder={config?.searchField.placeHolder}
                onKeyDown={(event)=> enterPressed(event)}
            />
            {config?.searchField.instant === false && <SearchIcon onClick={startSearch} />}
            {config?.searchField.emptyButton !== false && (
                <Crossmark
                    onClick={() => {
                        setSearch('');
                    }}
                />
            )}
        </div>
    );
};

export default Search;

