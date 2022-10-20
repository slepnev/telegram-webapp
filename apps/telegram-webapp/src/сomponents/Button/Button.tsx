import React, { PropsWithChildren } from 'react';
import styles from './Button.module.scss';

interface OwnProps {
  className?: string;
  onClick?: () => void;
}

type Props = OwnProps;

const Button = (props: PropsWithChildren<Props>) => {
  return (
    <button {...props} className={styles['button'] +' ' + props.className}/>
  );
};

export default Button;
