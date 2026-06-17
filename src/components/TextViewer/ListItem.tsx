import { useConfig } from "@context/Config";

interface ListItemProps {
    item: any
}

const ListItem: FC<ListItemProps> = ({ item }) => {
    const config = useConfig();
    
    return <div>
        {item}
    </div>
}

export default ListItem;