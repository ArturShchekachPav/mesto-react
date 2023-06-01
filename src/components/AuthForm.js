import {
	useEffect,
	useRef
} from 'react';
import * as validator from '../utils/FormValidator';

const AuthForm = ({
	onSubmit,
	setFormValue,
	buttonText,
	formValue,
	isLoading
}) => {
	
	const formRef = useRef();
	
	useEffect(() => {
			const formValidator = new validator.FormValidator(validator.loginFormConfig,
				formRef.current
			);
			
			formValidator.enableValidation();
		},
		[]
	);
	
	const handleChange = (e) => {
		const {
			name,
			value
		} = e.target;
		
		setFormValue({
			...formValue,
			[name]: value
		});
	};
	
	function handleSubmit(e) {
		e.preventDefault();
		
		onSubmit();
	}
	
	return (
		<form
			name="singIn"
			className="login__form"
			noValidate
			onSubmit={handleSubmit}
			ref={formRef}
		>
			<div className="login__form-item">
				<input
					type="email"
					name="email"
					id="email-input"
					className="login__input"
					placeholder="Email"
					value={formValue.email}
					onChange={handleChange}
					required
				/>
				<span className="login__error email-input-error"></span>
			</div>
			<div className="login__form-item">
				<input
					type="password"
					name="password"
					id="password-input"
					className="login__input"
					placeholder="Пароль"
					value={formValue.password}
					onChange={handleChange}
					required
				/>
				<span className="login__error password-input-error"></span>
			</div>
			<button
				type="submit"
				className="login__button"
			>{isLoading ?
				'Загрузка...' :
				buttonText}
			</button>
		</form>
	);
};

export default AuthForm;