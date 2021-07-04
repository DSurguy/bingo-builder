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