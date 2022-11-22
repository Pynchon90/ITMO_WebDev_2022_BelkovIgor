const delay = (time) =>
  new Promise((resolve, reject) => {
    console.log('> delay -> created');
    setTimeout(() => {
      console.log('delay -> setTimeout: ready');
      resolve(time);
    }, time);
  });

const wrapDevOnlyConsoleLog = () => {
  const debug = console.log;
  console.log = (...args) => {
    if (import.meta.env.DEV) debug(...args);
  };
};

const $ = document.getElementById.bind(document);

export { delay, wrapDevOnlyConsoleLog, $ };
