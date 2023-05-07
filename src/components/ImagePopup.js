function ImagePopup({card, onClose}) {
  return (
    <section className={`popup popup_type_image ${card.link ? ' popup_opened' : ''}`}>
      <figure className="popup__figure">
        <img
          className="popup__image"
          src={card.link || "#"}
          alt={card.name || ''}
        />
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__close-button hover"
          onClick={onClose}
        ></button>
        <figcaption className="popup__figcaption">{card.name || ''}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;