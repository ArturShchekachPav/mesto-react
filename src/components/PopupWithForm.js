function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? ' popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={props.name}
          className={`popup__form popup__form_${props.name}`}
          noValidate
        >
          {props.children}
        </form>
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__close-button hover"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;