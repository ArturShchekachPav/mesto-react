const InfoTooltip = ({status}) => {
	return (
		<div className="info-tooltip">
			<div
				className={`info-tooltip__status ${status ?
					'info-tooltip__status_success' :
					'info-tooltip__status_fail'}`}
			></div>
			<h2 className="info-tooltip__title">{status ?
				'Вы успешно зарегистрировались!' :
				('Что-то пошло не так!\n' +
					'Попробуйте ещё раз.')}</h2>
		</div>
	);
};

export default InfoTooltip;