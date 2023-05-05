import { Link } from 'react-router-dom'
import "./Store.css"

export const Store = ({ store }) => {

    return <section className="single-store" key={`store--${store.id}`}>
        <Link className="store_info_link" to={`/stores/StorePage/${store.id}`}>{store.name}</Link>
        <div>{store.address}</div>

    </section>
}