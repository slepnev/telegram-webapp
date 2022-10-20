import styles from './App.module.scss';
import { useTelegram } from '../hooks/useTelegram';
import { useEffect } from 'react';
import Header from '../сomponents/Header/Header';
import { Route, Routes } from 'react-router-dom';
import CardList from './CardList/CardList';
import Form from './Form/Form';

export function App() {
  const { onClose, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  });

  return (
    <>
      <div className={styles['main']}>
        <Header />
        <Routes>
          <Route index element={<CardList />} />
          <Route path={'form'} element={<Form />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
