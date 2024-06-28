export const loadData = (): Promise<{ [key: string]: string }> =>
  new Promise((resolve, reject) => {
    window.Telegram.WebApp.CloudStorage.getKeys((error, keys) => {
      if (error || !keys) {
        reject(error);
        return;
      }
      window.Telegram.WebApp.CloudStorage.getItems(keys, (error, items) => {
        if (error || !items) {
          reject(error);
          return;
        }
        resolve(items);
      });
    });
  });

export const deleteItem = (key: string): Promise<void> =>
  new Promise((resolve, reject) => {
    window.Telegram.WebApp.CloudStorage.removeItem(key, (error, result) => {
      if (error || !result) {
        reject(error);
        return;
      }
      resolve();
    });
  });

export const clearData = (): Promise<void> =>
  new Promise((resolve, reject) => {
    window.Telegram.WebApp.CloudStorage.getKeys((error, keys) => {
      if (error || !keys) {
        reject(error);
        return;
      }
      window.Telegram.WebApp.CloudStorage.removeItems(keys, (error, result) => {
        if (error || !result) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  });
