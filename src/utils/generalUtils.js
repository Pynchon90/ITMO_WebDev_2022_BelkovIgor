const delay = (time) =>
  new Promise((resolve, reject) => {
    console.log('> delay -> created');
    setTimeout(() => {
      console.log('delay -> setTimeout: ready');
      resolve(time);
    }, time);
  });

export { delay };
