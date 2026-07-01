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
    const All = {name:(config?.filters?.all ?? "All"), value:"All"}
    const [search, setSearch] = useState(config?.searchField.value || '');
    const [parsedSearch, setParsedSearch] = useState('');
    const [filter, setFilter] = useState<string[]>([All.value]);
    const startSearch = () =>
        setFilteredItems(
            (config?.listItems || []).filter((item) => {
                if (typeof item === 'string') {
                    return item.includes(parsedSearch);
                } else if (typeof item === 'object') {
                    if (
                        config?.filters?.listItemKey &&
                        !filter.includes(All.value) &&
                        !filter.includes(item[config?.filters.listItemKey])
                    )
                        return false;
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
    }, [search, filter]);

    const enterPressed = (event: any) => {
        if (event.key === 'Enter') startSearch();
    };

    function FilterItem({ cat }: { cat: FilterItem }) {
        return (
            <div
                onClick={() =>
                    setFilter((prev) =>
                        cat.value === All.value
                            ? [cat.value]
                            : [
                                  ...prev.filter((category) => {
                                      if (category === (All.value))
                                          return false;
                                      return true;
                                  }),
                                  cat.value,
                              ]
                    )
                }
                style={
                    filter.includes(cat.value)
                        ? { background: '#D2EDF5', borderColor: '#71C8DF' }
                        : undefined
                }
            >
                {filter.includes(cat.value) ? <div /> : undefined}
                {cat.name}
            </div>
        );
    }
    return (
        <div className="search">
            <div className="search-field">
                <input
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    placeholder={config?.searchField.placeHolder}
                    onKeyDown={(event) => enterPressed(event)}
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

            <div className="filters">
                
                   
                
                {[All, ...(config?.filters?.filterItems ?? [])].map((key, ndx) => (
                    <FilterItem cat={key} key={ndx} />
                ))}
            </div>
        </div>
    );
};

export default Search;

// gjøre så man kan ha flere filtere samtidig
// ? toggle av alle når man klikker noe annet? og motsatt
// man kan ha value og tittle per filter item så man kan ha forskjellige shown tags og faktiske tags
