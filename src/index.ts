import app from './app';

async function main() {
  const steps = [
    // '1-1',
    // '1-2',
    // '2-1',
    // '2-2',
    // '3-1',
    // '3-2',
    // '4-1',
    // '4-2',
    // '5-1',
    // '5-2',
    // '6-1',
    // '6-2',
    // '7-1',
    // '7-2',
    // '8-1',
    '8-2',
  ];

  steps.forEach((v) => app.start(v));
}

main();