import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { openAuthModal } from '../store/authSlice';

export default function RequireAuth({ children }) {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) dispatch(openAuthModal('login'));
  }, [user, dispatch]);

  if (!user) return <Navigate to="/" replace />;
  return children;
}
