function Card(props) {
  function handleCardClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="element" key={props.card._id}>
      <img
        className="element__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />
      <div className="element__info">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className="element__like-button hover"
          ></button>
          <p className="element__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;