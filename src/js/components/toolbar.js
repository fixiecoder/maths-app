import React from 'react';
import { Link } from 'react-router';
import Trophy from 'react-icons/lib/fa/trophy';
import titleWhiteImage from '../../assets/title_white.svg';
import {
  PRACTICE_MENU,
  CHALLENGE_MENU,
  PRACTICE_QUESTION,
  CHALLENGE_QUESTION,
  COMPLETED_CHALLENGE,
} from '../constants/pages';
import BackIcon from 'react-icons/lib/fa/arrow-circle-left';
import CloseIcon from 'react-icons/lib/fa/close';
import MessageIcon from 'react-icons/lib/fa/envelope';

export default function Toolbar(props) {
  let questionMenuItems;

  switch(props.currentPage) {
    case CHALLENGE_MENU:
    case PRACTICE_MENU:
      questionMenuItems = (
        <div className="toolbar-menu-item">
          <Link to="/app/menu"><BackIcon size={50} fill={'#fff'} /></Link>
        </div>
      );
      break;

    case PRACTICE_QUESTION:
      questionMenuItems = (
        <div className="toolbar-menu-item">
          <Link to="/app/practice"><BackIcon size={50} fill={'#fff'} /></Link>
        </div>
      );
      break;

    case COMPLETED_CHALLENGE:
    case CHALLENGE_QUESTION:
      questionMenuItems = (
        <div className="toolbar-menu-item">
          <Link to="/app/challenge"><BackIcon size={50} fill={'#fff'} /></Link>
        </div>
      );
      break;

    default:
      questionMenuItems = undefined;
  }

  return (
    <div className="main-toolbar">
      <div className="main-toolbar-left">
        <img className="main-toolbar-title" src={titleWhiteImage} alt="" />
      </div>
      <div className="main-toolbar-right">
        <div className="toolbar-user">
          <p>Hi {props.user.get('name')}</p>
        </div>
        {questionMenuItems}
        <div className="toolbar-messages" onClick={props.toggleMessagesOpen} >
          <MessageIcon fill={'#fff'} size={30} />
        </div>
        <button className="main-toolbar-logout-button" onClick={() => props.setShowModal(true)}>
          <CloseIcon size={50} fill={'red'} />
        </button>
      </div>
    </div>
  );
}
