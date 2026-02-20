const bill = 40;
const tipPoint = 50 <= bill && bill <= 300 ? 15 : 20;
const tip = bill * tipPoint / 100;
const totalBill = bill + tip;
console.log(`the bill was ${bill}, the tip was ${tip}, and the total value ${totalBill}`);