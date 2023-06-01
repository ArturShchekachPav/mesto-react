import {
	useEffect,
	useRef
} from 'react';
import * as validator from '../utils/FormValidator';
import Popup from './Popup';

function PopupWithForm({
	name,
	title,
	onClose,
	isOpen,
	buttonText,
	children,
	onSubmit
}) {
	
	const formRef = useRef();
	
	useEffect(() => {
			const formValidator = new validator.FormValidator(validator.formConfig,
				formRef.current
			);
			
			formValidator.enableValidation();
		},
		[]
	);
	
	return (
		<Popup
			isOpen={isOpen}
			onClose={onClose}
			containerElement="div"
			containerClass="popup__container"
		>
			<h2 className="popup__title">{title}</h2>
			<form
				name={name}
				className={`popup__form popup__form_${name}`}
				noValidate
				onSubmit={onSubmit}
				ref={formRef}
			>
				{children}
				<button
					type="submit"
					className="popup__button"
				>{buttonText}
				</button>
			</form>
		</Popup>
	);
}

export default PopupWithForm;