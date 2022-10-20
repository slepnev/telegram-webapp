import React from 'react';
import Button from '../Button/Button';
import './CardItem.scss';

export interface Card {
  id: string;
  title: string;
  description: string;
  balance: string;
}

interface OwnProps {
  className?: string;
  card: Card;
  onView: (card: Card) => void;
}

type Props = OwnProps;

const CardItem = (props: Props) => {
  const { card, className, onView } = props;

  const onAddHandler = () => {
    onView(card);
  };

  return (
    <div className={'product ' + className}>
      <div className={'img'} />
      <div className={'title'}>{card?.title}</div>
      <div className={'description'}>{card?.description}</div>
      <div className={'price'}>
        <span>
          Баланс: <b>***</b>
        </span>
      </div>
      <Button className={'add-btn'} onClick={onAddHandler}>
        Проверить баланс
      </Button>
    </div>
  );
};

export default CardItem;
