import React, { useEffect } from 'react';
import './CardList.scss';
import CardItem, { Card } from '../CardItem/CardItem';
import { useTelegram } from '../../hooks/useTelegram';

const cards: Card[] = [
  {
    id: '1',
    title: '**** 84 56',
    balance: '5 000',
    description: 'Синего цвета, кредитная',
  },
  {
    id: '2',
    title: '**** 22 56',
    balance: '12 000',
    description: 'Зеленого цвета, дебетовая',
  },
  {
    id: '3',
    title: '**** 84 33',
    balance: '5 000',
    description: 'Синего цвета, кредитная',
  },
  {
    id: '4',
    title: '**** 11 56',
    balance: ' 122',
    description: 'Зеленого цвета, дебетовая',
  },
  {
    id: '5',
    title: '**** 22 56',
    balance: '5 000',
    description: 'Синего цвета, кредитная',
  },
  {
    id: '6',
    title: '**** 55 56',
    balance: ' 600',
    description: 'Зеленого цвета, дебетовая',
  },
  {
    id: '7',
    title: '**** 66 56',
    balance: '5 500',
    description: 'Синего цвета, кредитная',
  },
  {
    id: '8',
    title: '**** 77 56',
    balance: '12 000',
    description: 'Зеленого цвета, дебетовая',
  },
];

interface OwnProps {
  className?: string;
}

type Props = OwnProps;

const CardList = (props: Props) => {
  const { tg, queryId } = useTelegram();

  const onSendData = (card: Card) => {
    const data = {
      event: 'card',
      cardNumber: card.title,
      cardBalance: card.balance,
      queryId,
    };
    tg.sendData(JSON.stringify(data));

    // fetch('http://example/card', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data)
    // })
  };

  const onSendCredit = () => {
    const data = {
      event: 'unknown',
    };
    tg.sendData(JSON.stringify(data));
  };

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendCredit);
    return () => {
      tg.offEvent('mainButtonClicked', onSendCredit);
    };
  }, [onSendData]);

  const onView = (card: Card) => {
    tg.MainButton.show();
    tg.MainButton.setParams({
      text: `Взять кредит`,
    });
  };

  return (
    <div className={'list'}>
      {cards.map((item) => (
        <CardItem card={item} onView={onView} className={'item'} />
      ))}
    </div>
  );
};

export default CardList;
