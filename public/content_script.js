let email = document.querySelectorAll('input[type=email]')[0] || document.querySelectorAll('input[inputMode=email]')[0] || document.querySelectorAll('input[name=email]')[0] || document.querySelectorAll('input[id=username]')[0]
let password = document.querySelectorAll('input[type=password]')[0] ||  document.querySelectorAll('input[name=password]')[0];




chrome.runtime.onMessage.addListener(
    (request,sender,sendResponse) => {
        console.log(request.username);
        console.log(request.password);
        console.log(email);
        console.log(password);
        if(email){
            email.value = request.username;
        }
        if(password){
            password.value = request.password;
        }
        sendResponse({status:"done"});
    }
);
