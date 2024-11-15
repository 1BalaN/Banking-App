'use strict' 

const account1 = {
    userName: 'Дмитрий Николаев',
    transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
    transactionsDate: [
        '2021-11-13T11:48:50.942Z',
        '2021-11-14T12:00:50.942Z',
        '2021-12-01T14:12:50.942Z',
        '2021-12-26T18:08:50.942Z',
        '2022-01-02T13:02:00.942Z',
        '2022-01-26T13:08:50.942Z',
        '2022-02-02T10:02:15.942Z',
        '2022-02-26T14:08:50.942Z'
    ],
    pin: 1111
};

const account2 = {
    userName: 'Анна Смирнова',
    transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
    transactionsDate: [
        '2022-01-13T11:48:50.942Z',
        '2022-01-14T12:00:50.942Z',
        '2022-01-17T14:12:50.942Z',
        '2022-01-26T18:08:50.942Z',
        '2022-02-02T13:02:00.942Z',
        '2022-03-26T13:08:50.942Z',
        '2022-03-02T10:02:15.942Z',
        '2022-03-26T14:08:50.942Z'
    ],
    pin: 2222
};

const account3 = {
    userName: 'Сергей Ковалев',
    transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
    transactionsDate: [
        '2021-12-13T11:48:50.942Z',
        '2021-12-14T12:00:50.942Z',
        '2021-12-01T14:12:50.942Z',
        '2021-12-26T18:08:50.942Z',
        '2022-01-02T13:02:00.942Z',
        '2022-01-26T13:08:50.942Z',
        '2022-02-02T10:02:15.942Z',
        '2022-03-02T14:08:50.942Z'
    ],
    pin: 3333
};

const account4 = {
    userName: 'Елена Федорова',
    transactions: [530, 1300, 500, 40, 190],
    transactionsDate: [
        '2021-10-11T10:00:50.942Z',
        '2021-11-14T15:00:50.942Z',
        '2021-11-25T14:12:50.942Z',
        '2021-12-02T08:08:50.942Z',
        '2022-01-23T19:02:00.942Z'
    ],
    pin: 4444
};

const account5 = {
    userName: 'Андрей Иванов',
    transactions: [630, 800, 300, 50, 120],
    transactionsDate: [
        '2022-02-01T06:40:50.942Z',
        '2022-02-14T22:04:50.942Z',
        '2022-02-01T14:12:50.942Z',
        '2022-03-06T12:08:50.942Z',
        '2022-03-10T13:02:00.942Z'
    ],
    pin: 5555
};

const accounts = [account1, account2, account3, account4, account5];
let currentAccount

const form = document.forms.form;
const transactionContainer = document.querySelector('.bank-item1');
const balans = document.querySelector('.balans');
const form2 = document.forms.transaction;
const form3 = document.forms.credit;


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.name.value;
    const password = +form.pass.value;
    currentAccount = accounts.find((item) => item.userName === name);
    if(currentAccount) {
        if(currentAccount.pin === password) {
            document.querySelector('.registr').style.display = 'none';
            document.querySelector('.bank').style.display = 'block';
            document.querySelector('.head').innerHTML = `Добро пожаловать, ${currentAccount.userName}`;
            document.querySelector('.info-date').innerHTML = `на ${new Date().toLocaleString()}`;

            displayTransaction();
            displayTotal();
        }
        else {
            alert('Неверный пароль, попробуйте еще раз');
            form.pass.value = '';
        }
    }
    else {
        alert('Пользователь не найден');
        form.name.value = '';
        form.pass.value = '';
    }
})

function displayTransaction() {
    transactionContainer.innerHTML = '';
    currentAccount.transactions.forEach((item, index) => {
        const date = new Date(currentAccount.transactionsDate[index]).toLocaleDateString();
        const type = item > 0 ? 'deposit' : 'withdrawal';
        transactionContainer.innerHTML += `
            <div class="transactions__row">
                <div class="typeDate">
                    <div class="transactions__date">${date}</div>
                    <div class="transactions__type--${type}">${type}</div>
                    <div class="transactions__value">${item}</div>
                </div>
            </div>`
    })
}

function displayTotal() {
    const totalBalans = currentAccount.transactions.reduce((a, b) => a + b, 0);
    currentAccount.total = totalBalans;
    balans.innerHTML = `${totalBalans}$`;
    let deposit = currentAccount.transactions.filter(el => el > 0);
    let withdrawal = currentAccount.transactions.filter(el => el < 0);
    if(deposit.length > 0) {
        deposit = deposit.reduce((a, b) => a + b);
    }
    if(withdrawal.length > 0) {
        withdrawal = withdrawal.reduce((a, b) => a + b);
    }
    
    document.querySelector('.total__value--in').innerHTML = `${Array.isArray(deposit) ? '0$' : `${deposit}$`}`;
    document.querySelector('.total__value--out').innerHTML = `${Array.isArray(withdrawal) ? '0$' : `${withdrawal}$`}`;
    
}

function makeTransactions() {
    const recepient = document.querySelector('#recipient').value;
    const sum = Number(document.querySelector('#sum').value);
    if(currentAccount.userName !== recepient) {
        if(accounts.find(item => item.userName === recepient)) {
            if(sum <= currentAccount.total) {
                currentAccount.transactions.push(-sum);
                currentAccount.transactionsDate.push(new Date().toISOString());
                displayTransaction();
                displayTotal();
            }
            else {
                alert('Не хватает средств на балансе !');
                document.querySelector('#sum').value = '';
            }
        }
        else {
            alert('Пользователь не найден');
            document.querySelector('#recipient').value = '';
        }
    }
    else {
        alert('Вы не можете перевести деньги самому себе');
        document.querySelector('#recipient').value = '';
    }
}
document.querySelector('#but2').addEventListener('click', (event) => {
    event.preventDefault();
    makeTransactions();
});

document.querySelector('#but3').addEventListener('click', (event) => {
    event.preventDefault();
    const sum = Number(document.querySelector('#recipient3').value);
    if(currentAccount.transactions.some(el => el >= sum * 0.1)) {
        alert('Займ одобрен')
        currentAccount.transactions.push(sum);
        currentAccount.transactionsDate.push(new Date().toISOString());
        displayTransaction();
        displayTotal();
    }
    else {
        alert('Займ отклонен ! Уменьшите сумму.');
        document.querySelector('#recipient3').value = '';
    }
})

document.querySelector('#but4').addEventListener('click', (event) => {
    event.preventDefault();
    const name = document.querySelector('#rep_name').value;
    const pin = Number(document.querySelector('#pin').value);
    if(currentAccount.userName === name && currentAccount.pin === pin) {
        const id = accounts.findIndex(el => el.userName === name);
        accounts.splice(id, 1);
        document.querySelector('.bank').style.display = 'none';
        document.querySelector('.registr').style.display = 'flex';
    }
    else {
        alert('Неверный логин или пароль');
        document.querySelector('#rep_name').value = '';
        document.querySelector('#pin').value = '';
    }
})

// document.querySelector('#but4').addEventListener('click', (event) => {
//     event.preventDefault();
//     const name = document.querySelector('#rep_name').value;
//     const pin = +document.querySelector('#pin').value;
//     if(name = currentAccount.userName && pin === currentAccount.pin) {
//         const index = accounts.findIndex(i => i.userName === name);
//         accounts.splice(index, 1);
//         document.querySelector('.bank').style.display = 'none';
//         document.querySelector('registr').style.block = 'block'; 
//     }
//     else {
//         alert('Неверно введены данные !');
//     }
// })