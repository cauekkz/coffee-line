/* ---------------- Contact ---------------- */
function toggleContact(){
    const popup=document.getElementById('contact-popup')
    const button=document.getElementById('contact-button')
    if(popup.open){
        popup.close()
        button.setAttribute('aria-expanded','false')
    }
    else{
        popup.show()
        button.setAttribute('aria-expanded','true')
    }
}
document.addEventListener('click',(e)=>{
    const popup=document.getElementById('contact-popup')
    if(popup.open && !e.target.closest('#contact-item')) toggleContact()
})
document.addEventListener('keydown',(e)=>{
    if(e.key==='Escape' && document.getElementById('contact-popup').open) toggleContact()
})

/* ---------------- Helpers ---------------- */
const COUPONS={ 'HXW2':0.10, 'CAFE':0.15 }
const PLAN_NAMES={ basic:'Basic', premium:'Premium', vip:'VIP' }
const money=(v)=>v.toLocaleString('en-US',{style:'currency',currency:'BRL'})
const digitsOnly=(s)=>s.replace(/\D/g,'')

function maskCpf(v){
    return digitsOnly(v).slice(0,11)
        .replace(/(\d{3})(\d)/,'$1.$2')
        .replace(/(\d{3})(\d)/,'$1.$2')
        .replace(/(\d{3})(\d{1,2})$/,'$1-$2')
}
function maskPhone(v){
    const d=digitsOnly(v).slice(0,11)
    if(d.length<=2) return d.length ? `(${d}` : ''
    if(d.length<=6) return `(${d.slice(0,2)}) ${d.slice(2)}`
    if(d.length<=10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`
    return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`
}
function isValidCpf(v){
    const c=digitsOnly(v)
    if(c.length!==11 || /^(\d)\1{10}$/.test(c)) return false
    for(const t of [9,10]){
        let sum=0
        for(let i=0;i<t;i++) sum+=Number(c[i])*(t+1-i)
        const digit=(sum*10)%11%10
        if(digit!==Number(c[t])) return false
    }
    return true
}
function age(isoDate){
    const b=new Date(isoDate+'T00:00')
    const today=new Date()
    let a=today.getFullYear()-b.getFullYear()
    if(today.getMonth()<b.getMonth() || (today.getMonth()===b.getMonth() && today.getDate()<b.getDate())) a--
    return a
}

/* ---------------- Build one form per plan ---------------- */
const template=document.getElementById('form-template')

document.querySelectorAll('.signup-section').forEach((section)=>{
    const plan=section.dataset.plan
    const price=Number(section.dataset.price)
    const copy=template.content.cloneNode(true)

    // unique ids per plan (name -> name-basic) so the labels keep working
    copy.querySelectorAll('[id]').forEach(el=>{
        el.id=el.id.endsWith('-error') ? el.id.replace(/-error$/,`-${plan}-error`) : `${el.id}-${plan}`
    })
    copy.querySelectorAll('label[for]').forEach(el=>el.htmlFor=`${el.htmlFor}-${plan}`)
    copy.querySelectorAll('input:not([type=radio]):not([type=submit])').forEach(el=>{
        el.setAttribute('aria-describedby',`${el.id}-error`)
    })
    copy.querySelector('input[type=submit]').value=`sign up for ${PLAN_NAMES[plan]}`

    section.appendChild(copy)
    wireForm(section.querySelector('form'),plan,price)
})

function wireForm(form,plan,price){
    const field=(name)=>form.elements[name]
    const message=(name)=>form.querySelector(`#${field(name).id}-error`)
    const total=form.querySelector('.plan-total')

    // don't allow a date in the future
    field('birth').max=new Date().toISOString().slice(0,10)

    function setError(name,text){
        const el=message(name)
        field(name).setAttribute('aria-invalid',text ? 'true' : 'false')
        if(el){
            el.textContent=text || (el.dataset.default ?? '')
            el.classList.toggle('error',!!text)
            el.classList.toggle('hint',!text)
        }
        return !text
    }
    form.querySelectorAll('small').forEach(s=>s.dataset.default=s.textContent)

    const rules={
        name:(v)=>v.trim().split(/\s+/).length<2 ? 'Enter your first and last name.' : '',
        birth:(v)=>!v ? 'Enter your date of birth.' : age(v)<12 ? 'You must be at least 12 to sign up.' : age(v)>120 ? 'Please check the date.' : '',
        cpf:(v)=>!isValidCpf(v) ? 'Invalid CPF. Please check the numbers.' : '',
        email:(v)=>!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? 'Invalid email. E.g. name@email.com' : '',
        password:(v)=>v.length<6 ? 'The password needs at least 6 characters.' : '',
        password2:(v)=>v!==field('password').value ? "The passwords don't match." : '',
        phone:(v)=>digitsOnly(v).length<10 ? 'Phone with area code, e.g. (11) 98765-4321' : ''
    }
    const validate=(name)=>setError(name,rules[name](field(name).value))

    // validate when leaving the field; after the first error, revalidate while typing
    Object.keys(rules).forEach(name=>{
        field(name).addEventListener('blur',()=>{ if(field(name).value) validate(name) })
        field(name).addEventListener('input',()=>{
            if(field(name).getAttribute('aria-invalid')==='true') validate(name)
        })
    })
    field('cpf').addEventListener('input',(e)=>{ e.target.value=maskCpf(e.target.value) })
    field('phone').addEventListener('input',(e)=>{ e.target.value=maskPhone(e.target.value) })

    function updateTotal(){
        const code=field('coupon').value.trim().toUpperCase()
        field('coupon').value=code
        const discount=COUPONS[code]
        const notice=message('coupon')
        if(!code){
            notice.textContent=''
            total.textContent=money(price)
        }else if(discount){
            notice.textContent=`Coupon applied: ${discount*100}% off`
            notice.className='ok'
            total.innerHTML=`<s>${money(price)}</s> ${money(price*(1-discount))}`
        }else{
            notice.textContent=code.length===4 ? 'Coupon not found.' : ''
            notice.className='hint'
            total.textContent=money(price)
        }
    }
    field('coupon').addEventListener('input',updateTotal)
    updateTotal()

    form.addEventListener('submit',async(e)=>{
        e.preventDefault()
        const results=Object.keys(rules).map(validate)
        if(results.includes(false)){
            form.querySelector('[aria-invalid="true"]').focus()
            return
        }
        const button=form.querySelector('input[type=submit]')
        button.disabled=true
        const data=Object.fromEntries(new FormData(form))
        delete data.password2
        data.plan=plan
        const r=await Auth.signUp(data)
        button.disabled=false
        if(!r.ok){
            setError('email',r.error)
            field('email').focus()
            return
        }
        showAlert(data.email,plan)
    })
}

/* ---------------- Success alert ---------------- */
function showAlert(email,plan){
    const alert=document.getElementById('alert-email')
    document.getElementById('email-detail').textContent=
        `${PLAN_NAMES[plan]} plan signed up! We sent the confirmation to ${email}. Heading back to the site...`
    alert.show()
    setTimeout(()=>{ window.location.href='index.html' },3500)
}
