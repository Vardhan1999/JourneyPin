import Avatar from '../../shared/components/UIElements/Avatar'
import Card from '../../shared/components/UIElements/Card'
import { Link } from 'react-router-dom'
import './UserItem.css'
export default function UserItem({ id, image, name, placeCount }) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const imageUrl = image ? `${backendUrl}/${image.replace(/\\/g, '/')}` : '';
    return (
        <li className='user-item'>

            <Card className='user-item__content'>
                <Link to={`/${id}/places`}>
                    <div className='user-item__image'>
                        <Avatar image={imageUrl} alt={name} />
                    </div>
                    <div className='user-item__info'>
                        <h2>{name}</h2>
                        <h3>{placeCount} {placeCount === 1 ? 'Place' : 'Places'}</h3>
                    </div>
                </Link>
            </Card>

        </li>
    )
}