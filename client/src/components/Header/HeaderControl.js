import AddCircleIcon from '@material-ui/icons/AddCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GLOBALTYPES } from '../../redux/types/globalTypes';
import NotifyModal from '../NotifyModal';

const MenuControl = () => {
  const navLinksHome = [{ label: 'Home', icon: 'home', path: '/' }];

  const navLinksMessage = [
    { label: 'Message', icon: 'message', path: '/message' },
  ];
  const dispatch = useDispatch();
  const { auth, notify } = useSelector((state) => state);

  return (
    <div className="menu menu-middle">
      <ul className="header-menu-middle">
        {navLinksHome.map((link, index) => (
          <li className="menu-middle-item " key={index}>
            <Link to={link.path}>
              <span
                className="material-icons"
                style={{ fontSize: 'inherit', color: '#002f77' }}
              >
                {link.icon}
              </span>
            </Link>
          </li>
        ))}
        <li
          className="menu-middle-item"
          onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
        >
          <AddCircleIcon style={{ fontSize: 'inherit', color: '#002f77' }} />
        </li>

        {navLinksMessage.map((link, index) => (
          <li className="menu-middle-item " key={index}>
            <Link to={link.path}>
              <i
                className="fab fa-facebook-messenger"
                style={{ fontSize: '98%%', color: '#002F77' }}
              />
            </Link>
          </li>
        ))}
        <li className="menu-middle-item menu-middle-item_bell">
          <NotificationsIcon
            style={{
              fontSize: 'inherit',
              color: '#002f77',
              marginRight: '5px',
            }}
          />

          <span
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="notify_length">{notify.data.length}</span>
          </span>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdown"
            style={{ transform: 'translateX(60px)', border: 'none' }}
          >
            <NotifyModal />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MenuControl;
