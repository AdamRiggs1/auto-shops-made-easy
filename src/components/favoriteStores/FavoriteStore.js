import { Link, useParams } from 'react-router-dom'

export const FavoriteStore = ({ favoriteStore }) => {
    const { storeId } = useParams()

    return <section className="store" key={`customer--${favoriteStore.id}`}>
        <Link className="store_info_link" to={`/stores/StorePage/${favoriteStore.id}`}>{favoriteStore.name}</Link>
        <div>{favoriteStore.address}</div>

    </section>
}