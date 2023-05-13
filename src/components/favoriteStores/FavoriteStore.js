import { Link, useParams } from 'react-router-dom'

export const FavoriteStore = ({ favoriteStore }) => {
    const { storeId } = useParams()

    return <section className="favorite_store" key={`favorite_stores--${favoriteStore.id}`}>
        <Link className="store_info_link" to={`/stores/StorePage/${favoriteStore.id}`}>{favoriteStore.name}</Link>
        <div className="store_list_address">{favoriteStore.address}</div>
        <img className="store_list_img" src={favoriteStore.img} />

    </section>
}