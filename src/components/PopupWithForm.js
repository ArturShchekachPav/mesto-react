function PopupWithForm({
	name,
	title,
	onClose,
	isOpen,
	buttonText,
	children,
	onSubmit
}) {
	return (
		<section
			className={`popup popup_type_${name} ${isOpen ?
				' popup_opened' :
				''}`}
		>
			<div className="popup__container">
				<h2 className="popup__title">{title}</h2>
				<form
					name={name}
					className={`popup__form popup__form_${name}`}
					noValidate
					onSubmit={onSubmit}
				>
					{children}
					<button
						type="submit"
						className="popup__button"
					>{buttonText}
					</button>
				</form>
				<button
					aria-label="Закрыть"
					type="button"
					className="popup__close-button hover"
					onClick={onClose}
				></button>
			</div>
		</section>
	);
}

export default PopupWithForm;