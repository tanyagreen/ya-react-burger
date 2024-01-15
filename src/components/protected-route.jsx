import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from './loader/loader';
import PropTypes from 'prop-types';

const Protected = ({ onlyUnAuth = false, component }) => {
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Loader/>;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;

};


export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);

Protected.propTypes = {
    onlyUnAuth: PropTypes.bool,
    component: PropTypes.element.isRequired
};

OnlyUnAuth.propTypes = {
    component: PropTypes.element.isRequired
}
