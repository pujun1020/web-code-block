let wapper = document.querySelector('.wapper');
let loginlink = document.querySelector('.login-link');
let registerlink = document.querySelector('.register-link');
console.log(registerlink)
registerlink.addEventListener('click', (e) => {
    e.preventDefault();
    wapper.classList.add('active');
    }
)
loginlink.addEventListener('click', (e) => {
    e.preventDefault();
    wapper.classList.remove('active');
    })