function ImagePopup(props) {
  return (
    <section className={`popup popup_type_image ${props.isOpen ? ' popup_opened' : ''}`}>
      <figure className="popup__figure">
        <img
          className="popup__image"
          src={props.card.link || "#"}
          alt={props.card.name || ''}
        />
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__close-button hover"
          onClick={props.onClose}
        ></button>
        <figcaption className="popup__figcaption">{props.card.name || ''}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;