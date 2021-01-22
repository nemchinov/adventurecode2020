import app from './app';

async function main() {
  const steps = [
    // '1-1',
    // '1-2',
    '2-1',
  ];

  steps.forEach((v) => app.start(v));
}

main();