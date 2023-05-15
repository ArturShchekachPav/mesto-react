import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import {
	useState,
	useEffect
} from 'react';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);
	
	useEffect(() => {
			Promise.all([api.getInitialCards(),
				api.getProfileData()
			])
				.then(([cards, userData]) => {
					setCards(cards);
					
					setCurrentUser(userData);
				})
				.catch(err => {
					console.log(err);
				});
		},
		[]
	);
	
	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		
		api.changeLikeCardStatus(card._id,
			isLiked
		)
			.then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ?
					newCard :
					c));
			});
	}
	
	function handleCardDelete(card) {
		const isOwn = card.owner._id === currentUser._id;
		
		api.deleteCard(card._id,
			isOwn
		)
			.then(() => {
				setCards((state) => state.filter((c) => c._id !== card._id));
			});
	}
	
	function handleUpdateUser({
		name,
		about
	}) {
		api.editProfileData(name,
			about
		)
			.then((newUserData) => {
				setCurrentUser(newUserData);
				closeAllPopups();
			});
	}
	
	function handleUpdateAvatar({avatar}) {
		api.editAvatar(avatar)
			.then((newUserData) => {
				setCurrentUser(newUserData);
				
				closeAllPopups();
			});
	}
	
	function handleAddPlaceSubmit(name,
		link
	) {
		api.postNewCard(name,
			link
		)
			.then((newCard) => {
				setCards([newCard,
					...cards
				]);
				
				closeAllPopups();
			});
	}
	
	const handleEditAvatarClick = () => {
		setIsEditAvatarPopupOpen(true);
	};
	
	const handleEditProfileClick = () => {
		setIsEditProfilePopupOpen(true);
	};
	
	const handleAddPlaceClick = () => {
		setIsAddPlacePopupOpen(true);
	};
	
	const handleCardClick = (card) => {
		setSelectedCard(card);
	};
	
	const closeAllPopups = () => {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setSelectedCard({});
	};
	
	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Header/>
				<Main
					onEditAvatar={handleEditAvatarClick}
					onAddPlace={handleAddPlaceClick}
					onEditProfile={handleEditProfileClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
					onCardDelete={handleCardDelete}
					cards={cards}
				/>
				<Footer/>
				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>
				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlaceSubmit}
				/>
				<ImagePopup
					card={selectedCard}
					onClose={closeAllPopups}
				/>
				<section className="popup popup_type_delete-card">
					<div className="popup__container">
						<h2 className="popup__title">Вы уверены?</h2>
						<form
							name="deleteCardForm"
							className="popup__form popup__form_delete-card"
							noValidate
						>
							<button
								type="submit"
								className="popup__button"
							>Да
							</button>
						</form>
						<button
							aria-label="Закрыть"
							type="button"
							className="popup__close-button hover"
						></button>
					</div>
				</section>
				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
				/>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
