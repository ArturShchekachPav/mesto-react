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
import ConfirmDeleteCardPopup from './ConfirmDeleteCardPopup';

function App() {
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);
	const [cardToDelete, setCardToDelete] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	
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
	
	function handleCardDeleteClick(card) {
		setIsConfirmDeletePopupOpen(true);
		setCardToDelete(card);
	}
	
	function handleCardDelete() {
		const isOwn = cardToDelete.owner._id === currentUser._id;
		
		api.deleteCard(cardToDelete._id,
			isOwn
		)
			.then(() => {
				setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
				closeAllPopups();
			})
			.catch(err => {
				console.log(err);
			});
	}
	
	function handleUpdateUser({
		name,
		about
	}) {
		
		setIsLoading(true);
		
		api.editProfileData(name,
			about
		)
			.then((newUserData) => {
				setCurrentUser(newUserData);
				closeAllPopups();
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}
	
	function handleUpdateAvatar({avatar}) {
		setIsLoading(true);
		
		api.editAvatar(avatar)
			.then((newUserData) => {
				setCurrentUser(newUserData);
				
				closeAllPopups();
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}
	
	function handleAddPlaceSubmit(name,
		link
	) {
		setIsLoading(true);
		
		api.postNewCard(name,
			link
		)
			.then((newCard) => {
				setCards([newCard,
					...cards
				]);
				
				closeAllPopups();
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				setIsLoading(false);
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
		setIsConfirmDeletePopupOpen(false);
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
					onCardDelete={handleCardDeleteClick}
					cards={cards}
				/>
				<Footer/>
				<EditProfilePopup
					isLoading={isLoading}
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>
				<AddPlacePopup
					isLoading={isLoading}
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlaceSubmit}
				/>
				<ImagePopup
					card={selectedCard}
					onClose={closeAllPopups}
				/>
				<ConfirmDeleteCardPopup
					isOpen={isConfirmDeletePopupOpen}
					onClose={closeAllPopups}
					onConfirmDelete={handleCardDelete}
				/>
				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
					isLoading={isLoading}
				/>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
