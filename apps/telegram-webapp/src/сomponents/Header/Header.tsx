import React from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import Button from '../Button/Button';
import styles from './Header.module.scss';

interface OwnProps {
  className?: string;
}

type Props = OwnProps;

const Header = (props: Props) => {
  const { user, onClose } = useTelegram();

  return (
    <div className={styles['header']}>
      <div>
        <Button onClick={onClose}>Закрыть</Button>
      </div>
      <div>
        <span className={styles['username']}>
          {user?.first_name} {user?.last_name}
        </span>
        <br />
        <span className={styles['username']}>{user?.usernames}</span>
      </div>
    </div>
  );
};

export default Header;
