import Popup from './Popup';
import InfoTooltip from './InfoTooltip';

const InfoTooltipPopup = ({
	isOpen,
	onClose,
	status,
	successAction
}) => {
	function handleClose() {
		onClose();
		
		if (status) {
			successAction();
		}
	}
	
	return (
		<Popup
			isOpen={isOpen}
			onClose={handleClose}
			containerElement="div"
			containerClass="popup__container"
		>
			<InfoTooltip status={status}/>
		</Popup>
	);
};

export default InfoTooltipPopup;