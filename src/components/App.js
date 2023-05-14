import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import {useState, useEffect} from "react";
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext'

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  
  useEffect(() => {
  api.getProfileData().then(userData => setCurrentUser(userData));
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header/>
      <Main
      onEditAvatar={handleEditAvatarClick}
      onAddPlace={handleAddPlaceClick}
      onEditProfile={handleEditProfileClick}
      onCardClick={handleCardClick}
    />
      <Footer/>
      <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      buttonText='Сохранить'
    >
      <div className="popup__form-item">
        <input
          type="text"
          name="nameInput"
          id="name-input"
          className="popup__input popup__input_profile_name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__error name-input-error"></span>
      </div>
      <div className="popup__form-item">
        <input
          type="text"
          name="jobInput"
          id="job-input"
          className="popup__input popup__input_profile_job"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__error job-input-error"></span>
      </div>
    </PopupWithForm>
      <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      buttonText='Создать'
    >
      <div className="popup__form-item">
        <input
          type="text"
          name="titleInput"
          id="title-input"
          className="popup__input popup__input_card_title"
          placeholder="Название"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__error title-input-error"></span>
      </div>
      <div className="popup__form-item">
        <input
          type="url"
          name="linkInput"
          id="link-input"
          className="popup__input popup__input_card_link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__error link-input-error"></span>
      </div>
    </PopupWithForm>
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
      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText='Сохранить'
      >
        <div className="popup__form-item">
          <input
            type="url"
            name="avatarLinkInput"
            id="avatar-link-input"
            className="popup__input popup__input_avatar_link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__error avatar-link-input-error"></span>
        </div>
      </PopupWithForm>
    </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
