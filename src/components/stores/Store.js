import { Link } from 'react-router-dom'

export const Store = ({ store }) => {

    return <section className="store" key={`customer--${store.id}`}>
        <Link className="store_info_link" to={`/stores/StorePage/${store.id}/:reviewId`}>{store.name}</Link>
        <div>{store.address}</div>

    </section>
}