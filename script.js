function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function joinPassword(startPassword, charCodeItem) {
    const passwordLength = getRandomInRange(0, startPassword.length);
    let password = [];
    password.push(startPassword.slice(0, passwordLength));
    password.push(String.fromCharCode(charCodeItem));
    password.push(startPassword.slice(passwordLength));
    return password.join('')
}

// Действие на нажатие кнопки "генерация"
const btn = document.getElementById('generate_btn');
btn.addEventListener('click', ()=>{
    random()
    document.querySelector('.generation-password').innerHTML = `<p class="password">${password}</p>`;
})

// Создание таблицы знаков
const sign = ['!','@','"','#','$','%','^','&','*','(', ')','-','=','+','/','№',';','?']
let chooseSign = [];
const table = document.querySelector('.generation-table');
for (let i = 0; i < sign.length; i++) {
    table.insertAdjacentHTML('beforeend',`<div class="cell">${sign[i]}</div>`);
}
table.addEventListener('click', e=>{
    if (e.target.classList.contains('cell')) {
        if (e.target.classList.contains('choose-cell')) {
            e.target.classList.remove('choose-cell')
            chooseSign.splice(chooseSign.indexOf(e.target.innerHTML), 1)
        }
        else{
            e.target.classList.add('choose-cell')
            chooseSign.push(e.target.innerHTML)
        }
    }
})


//ГЛАВНАЯ ПЕРЕМЕННАЯ ДЛЯ ХРАНЕНИЯ ПАРОЛЯ
let password = ''
function random () {
    password = ''
    // генерация цифр в пароле
    let sizeNumber = document.getElementById('size_number').value;
    for (let i = 0; i < sizeNumber; i++) {
        password += Math.floor(Math.random()*10);
    }
    
    // генерация букв в пароле
    const firstChar = document.getElementById('first_letter').value;
    const lastChar = document.getElementById('last_letter').value;
    const sizeLetter = document.getElementById('size_letter').value;
    for (let i = 0; i < sizeLetter; i++) {
        const randomNumber = getRandomInRange(firstChar.charCodeAt(0), lastChar.charCodeAt(0))
        password = joinPassword(password, randomNumber)
    }

    // генерация символов в пароле
    chooseSign.forEach(element => {
        password = joinPassword(password, element.charCodeAt(0))
    });
};