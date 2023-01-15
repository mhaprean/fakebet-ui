import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useGetMyProfileQuery } from '../redux/features/iguDetaApi';
import { logoutDeta } from '../redux/features/iguDetaAuthSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const IguWraper = () => {
  const iguDetaAuthState = useAppSelector((state) => state.iguDetaAuth);

  const dispatch = useAppDispatch();

  const { data: userData, isLoading, isError } = useGetMyProfileQuery(
    {},
    { skip: !iguDetaAuthState.isAuth, refetchOnReconnect: true }
  );

  useEffect(() => {

    if (isError) {
      dispatch(logoutDeta());
    }

  }, [isError])

  return <Outlet />;
};

export default IguWraper;
