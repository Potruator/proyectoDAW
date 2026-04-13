export default function  SortIcon({ field, currentSortField, currentSortDirection }) {
    if (currentSortField !== field) {
        return <span className='ml-1 opacity-20 hover:opacity-50 active:opacity-50'>↕</span>
    }
    return (<span className='ml-1 text-amber-400'>
            {
                currentSortDirection === 'asc'
                    ? '↑'
                    : '↓'
            }
        </span>
    )
}