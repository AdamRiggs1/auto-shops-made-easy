import { Link } from 'react-router-dom'
//import "./Store.css"
import "./StoreList.css"

export const Store = ({ store }) => {

    return <section className="single-store" key={`store--${store.id}`}>
        <Link className="store_info_link" to={`/stores/StorePage/${store.id}`}>{store.name}</Link>
        <div className="store_list_address">{store.address}</div>
        <img className="store_list_img" src={store.img} />

    </section>
}