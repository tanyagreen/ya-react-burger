import { useSelector } from '../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from './loader/loader';

interface IProtectedProps {
    onlyUnAuth?: boolean;
    component: JSX.Element;
}

const Protected = ({ onlyUnAuth = false, component }: IProtectedProps) => {
    const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
    const user = useSelector((store) => store.user.user);
    const location = useLocation();

    if (!isAuthChecked) {
        return <Loader />;
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: '/' } };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to='/login' state={{ from: location }} />;
    }

    return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: IProtectedProps) => <Protected onlyUnAuth={true} component={component} />;
