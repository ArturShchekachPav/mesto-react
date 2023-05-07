function Card({card, onCardClick}) {
  function handleCardClick() {
    onCardClick(card);
  }

  return (
    <article
      className="element"
    >
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className="element__like-button hover"
          ></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;