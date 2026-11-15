/* ---------------- Login ---------------- */
const loginDialog=document.getElementById('login-dialog')
const loginForm=document.getElementById('login-form')
const loginError=document.getElementById('login-error')

function openLogin(){
    loginError.innerText=''
    loginDialog.showModal()
    document.getElementById('login-email').focus()
}
function closeLogin(){
    loginDialog.close()
}

// clicking the dark backdrop outside the form closes the login
loginDialog.addEventListener('click',(e)=>{
    if(e.target===loginDialog) closeLogin()
})

loginForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    const email=document.getElementById('login-email').value
    const password=document.getElementById('login-password').value
    if(!email || !password){
        loginError.innerText='Fill in your email and password.'
        return
    }
    const button=document.getElementById('login-submit')
    button.disabled=true
    const r=await Auth.logIn(email,password)
    button.disabled=false
    if(!r.ok){
        loginError.innerText=r.error
        document.getElementById('login-password').select()
        return
    }
    loginForm.reset()
    closeLogin()
    updateUser()
})

document.querySelectorAll('.social-login').forEach(b=>b.addEventListener('click',()=>{
    loginError.innerText='Social login coming soon! For now, use email and password.'
}))

/* ---------------- Logged-in user in the header ---------------- */
function updateUser(){
    const user=Auth.currentUser()
    const loginButton=document.getElementById('login-button')
    const greeting=document.getElementById('greeting')
    if(user){
        const firstName=(user.name||'').split(' ')[0]
        greeting.hidden=false
        greeting.querySelector('span').innerText=`Hi, ${firstName}`
        loginButton.hidden=true
    }else{
        greeting.hidden=true
        loginButton.hidden=false
    }
}
function logout(){
    Auth.logOut()
    updateUser()
}

updateUser()
