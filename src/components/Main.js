import {useState, useEffect} from "react";
import api from "../utils/api";
import Card from "./Card";

function Main({onCardClick, onAddPlace, onEditProfile, onEditAvatar}) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getInitialCards(),
      api.getProfileData()
    ])
      .then(([cards, {
        about,
        avatar,
        name,
        _id
      }
             ]) => {
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);

        setCards(cards);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <main className="main page__main">
      <section className="profile">
        <div
          className="profile__avatar-button"
          onClick={onEditAvatar}
        >
          <img
            className="profile__avatar"
            src={userAvatar}
            alt="Фото профиля"
          />
        </div>
        <div className="profile__info">
          <div className="profile__header">
            <h1 className="profile__name">{userName}</h1>
            <button
              aria-label="Редактировать"
              className="profile__edit-button hover"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button
          aria-label="Добавить"
          className="profile__add-button hover"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements main__elements">
        {cards.map((card) => (
          <Card
            card={card}
            onCardClick={onCardClick}
            key={card._id}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;