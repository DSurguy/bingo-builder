export async function timeout(callback: Function = () => {}, duration: number = 0) {
  return new Promise<void>((resolve, reject) => { 
    setTimeout(() => {
      try {
        callback();
        resolve();
      } catch (e) {
        reject(e);
      }
    }, duration);
  });
}

export async function waitUntil(callback: () => boolean) {
  return new Promise<void>((resolve, reject) => { 
    const internalLoop = () => {
      setTimeout(() => {
        try {
          if( callback() ) resolve();
          else internalLoop();
        } catch (e) {
          reject(e);
        }
      }, 1);
    }
    internalLoop();
  });
}