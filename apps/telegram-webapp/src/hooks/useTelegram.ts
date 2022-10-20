import { TelegramWebApps } from 'telegram-webapps-types';
import { useEffect } from 'react';

const tg = ((window as any).Telegram as TelegramWebApps.SDK).WebApp;

export function useTelegram() {

  const onClose = () => {
    tg.close()
  }

  const onToggleButton = () => {
    if(tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }

  return {
    onClose,
    onToggleButton,
    tg,
    user: tg.initDataUnsafe?.user,
    queryId: tg.initDataUnsafe?.query_id,
  }
}
