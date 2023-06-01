const Popup = ({
	isOpen,
	onClose,
	containerElement: Component,
	containerClass,
	children
}) => {
	
	return (
		<section
			onMouseDown={(e) => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			}}
			className={`popup popup_type_info-tooltip ${isOpen ?
				' popup_opened' :
				''}`}
		>
			<Component className={containerClass}>
				{children}
				<button
					aria-label="Закрыть"
					type="button"
					className="popup__close-button hover"
					onClick={onClose}
				></button>
			</Component>
		</section>
	);
};

export default Popup;