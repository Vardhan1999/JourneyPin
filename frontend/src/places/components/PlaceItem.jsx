import './PlaceItem.css';
import Card from "../../shared/components/UIElements/Card";
import Button from '../../shared/components/FormElements/Button';
import { useContext, useState } from 'react';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import AuthContext from '../../shared/store/AuthContext';

export default function PlaceItem({
  id,
  image,
  title,
  address,
  description,
  creatorId,
  coordinates,
  onDelete // 👈 pass delete handler from parent
}) {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const authContext = useContext(AuthContext);

  // Handlers for Map modal
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  // Handlers for Delete modal
  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log(`Deleting place with id: ${id}`);

  };

  return (
    <>
      {/* Map Modal */}
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE MAP</Button>}
      >
        <div className="map-container">
          <Map center={coordinates} zoom={10} />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place?
          <br />
          <strong>Please note that it can't be undone thereafter.</strong>
        </p>
      </Modal>

      {/* Place Item */}
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={image} alt={`Place: ${title}`} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            {authContext.isLoggedIn && <Button to={`/places/${id}`}>EDIT</Button>}
            {authContext.isLoggedIn && <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>}
          </div>
        </Card>
      </li>
    </>
  );
}
