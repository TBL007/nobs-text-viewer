import { useConfig } from '@context/Config';
import { useEffect, useState } from 'react';
import { stringify } from 'uuid';

interface SearchProps {
    setFilteredItems: (items: any[]) => void;
}

const Search: FC<SearchProps> = ({ setFilteredItems }) => {
    const config = useConfig();

    const [search, setSearch] = useState('');

    useEffect(() => {
        const parsedsearch = search.toLowerCase();
        console.log(config?.searchkeys)
        setFilteredItems(
            (config?.listItems || []).filter((item) => {
                if (typeof item === 'string') {
                    return item.includes(parsedsearch);
                } else if (typeof item === 'object') {
                    if (!config?.searchkeys) return 
                    const keysToSearch = Array.isArray(config?.searchkeys && config.searchkeys.length !== 0)
                        ? config?.searchkeys
                        : Object.keys(item);
                    return keysToSearch.some((key) => {
                      
                        // Sjekk at nøkkelen faktisk eksisterer på objektet før vi leser verdien
                        if (item[key] !== undefined && item[key] !== null) {
                            return String(item[key]).toLowerCase().includes(parsedsearch);
                        }
                        return false;
                    });
                } else {
                    console.log(item)
                    return true;
                }
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
// søke gjennom alle keys for vedien
// definere i config hvilke keys som kan bli søket på
