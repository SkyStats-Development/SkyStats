const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter 1 or 2: ', (answer) => {
  if (answer === '1') {
    console.log('You entered 1');
  } else if (answer === '2') {
    console.log('You entered 2');
  } else {
    console.log('Invalid input');
  }

  rl.close();
});