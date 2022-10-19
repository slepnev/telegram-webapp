import styles from './app.module.scss';
import { TelegramWebApps } from 'telegram-webapps-types';
import { useEffect } from 'react';

const tg = ((window as any).Telegram as TelegramWebApps.SDK).WebApp;

export function App() {
  useEffect(() => {
    tg.ready();
  });

  const onClose = () => {
    tg.close();
  };

  return (
    <>
      <div className={styles['main']}>
        Telegram Web APP

        <div>
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </>
  );
}

export default App;
