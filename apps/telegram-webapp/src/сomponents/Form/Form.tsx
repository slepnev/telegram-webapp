import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import styles from './Form.module.scss';

const Form = () => {
  const [country, setCountry] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [subject, setSubject] = useState<string>('physical');
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      event: 'form',
      country,
      street,
      subject,
    };
    tg.sendData(JSON.stringify(data));
  }, [country, street, subject]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Отправить данные',
    });
  }, []);

  useEffect(() => {
    if (!street || !country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street]);

  const onChangeCountry = (e: ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const onChangeStreet = (e: ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value);
  };

  const onChangeSubject = (e: ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);
  };

  return (
    <div className={styles['form']}>
      <h3>Введите ваши данные</h3>
      <input
        className={styles['input']}
        type="text"
        placeholder={'Страна'}
        value={country}
        onChange={onChangeCountry}
      />
      <input
        className={styles['input']}
        type="text"
        placeholder={'Улица'}
        value={street}
        onChange={onChangeStreet}
      />
      <select value={subject} onChange={onChangeSubject} className={styles['select']}>
        <option value={'physical'}>Физ. лицо</option>
        <option value={'legal'}>Юр. лицо</option>
      </select>
    </div>
  );
};

export default Form;
