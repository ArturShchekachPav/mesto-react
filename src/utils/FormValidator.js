export class FormValidator {
	constructor(formConfig,
		formElement
	) {
		this._formConfig = formConfig;
		this._formElement = formElement;
	}
	
	_showInputError = (inputElement,
		errorMessage
	) => {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		
		inputElement.classList.add(this._formConfig.inputErrorClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.add(this._formConfig.errorClass);
	};
	
	_hideInputError = (inputElement) => {
		const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
		
		inputElement.classList.remove(this._formConfig.inputErrorClass);
		errorElement.classList.remove(this._formConfig.errorClass);
		errorElement.textContent = '';
	};
	
	_checkInputValidity = (inputElement) => {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement,
				inputElement.validationMessage
			);
		} else {
			this._hideInputError(inputElement);
		}
	};
	
	_hasInvalidInput = () => {
		return this._inputList.some(inputElement => {
			return !inputElement.validity.valid;
		});
	};
	
	_toggleButtonState = () => {
		if (this._hasInvalidInput()) {
			this._buttonElement.classList.add(this._formConfig.inactiveButtonClass);
			this._buttonElement.setAttribute('disabled',
				'true'
			);
		} else {
			this._buttonElement.classList.remove(this._formConfig.inactiveButtonClass);
			this._buttonElement.removeAttribute('disabled');
		}
	};
	
	resetValidation = () => {
		this._toggleButtonState();
		
		this._inputList.forEach((inputElement) => {
			this._hideInputError(inputElement);
		});
	};
	
	enableValidation = () => {
		this._inputList = Array.from(this._formElement.querySelectorAll(this._formConfig.inputSelector));
		this._buttonElement = this._formElement.querySelector(this._formConfig.submitButtonSelector);
		
		this._toggleButtonState();
		
		this._inputList.forEach(inputElement => {
			inputElement.addEventListener('input',
				() => {
					this._checkInputValidity(inputElement);
					this._toggleButtonState();
				}
			);
		});
	};
}

export const formConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
};

export const loginFormConfig = {
	formSelector: '.login__form',
	inputSelector: '.login__input',
	submitButtonSelector: '.login__button',
	inactiveButtonClass: 'login__button_disabled',
	inputErrorClass: 'login__input_type_error',
	errorClass: 'login__error_visible'
};