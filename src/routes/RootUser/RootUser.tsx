/* eslint-disable prefer-destructuring */
import { Navigate, Outlet } from 'react-router-dom';

import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import './RootUser.scss';
import MobileNav from '../../components/MobileNav/MobileNav';
import UserMenu from '../../components/UserMenu/UserMenu';

import { useAppDispatch } from '../../hooks/redux';
import { changeUserisConnected } from '../../store/reducers/loginForm';
import { LocalStorage } from '../../utils/LocalStorage';
import UserMenuDesktop from '../../components/UserMenuDesktop/UserMenuDesktop';

function RootUser() {
  const dispatch = useAppDispatch();

  const user = LocalStorage.getItem('user');

  useEffect(() => {
    if (!user) {
      dispatch(changeUserisConnected(false));
    }
    if (user) {
      dispatch(changeUserisConnected(true));
    }
  }, [dispatch, user]);

  // if (userIsConnected) {
  //   return <Navigate to="/user/dashboard" />;
  // }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="root__user">
      <UserMenu />
      <UserMenuDesktop />
      <div className="right__section">
        <Header />
        <Outlet />
      </div>
      <MobileNav />
    </div>
  );
}

export default RootUser;
