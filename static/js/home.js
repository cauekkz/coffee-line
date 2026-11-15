const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------------- Contact (header popup) ---------------- */
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
// close the contact popup when clicking outside it or pressing Esc
document.addEventListener('click',(e)=>{
    const popup=document.getElementById('contact-popup')
    if(popup && popup.open && !e.target.closest('#contact-item')){
        toggleContact()
    }
})
document.addEventListener('keydown',(e)=>{
    const popup=document.getElementById('contact-popup')
    if(e.key==='Escape' && popup && popup.open) toggleContact()
})

function scrollToTop(){
    window.scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'})
}

/* ---------------- Banner (top slides) ---------------- */
const slides=[
    document.getElementById('slide-1'),
    document.getElementById('slide-2'),
    document.getElementById('slide-3')
]
const dots=document.querySelectorAll('.slide-dot')
let currentSlide=0
let slideTimer=null
let animationEnd=null

function placeSlides(animate){
    slides.forEach((slide,i)=>{
        // position relative to the current slide: 0 = on screen, 1 = next, 2 = after that
        const pos=(i-currentSlide+slides.length)%slides.length
        const offset=pos===slides.length-1 && animate ? -100 : pos*100
        slide.style.transition=animate && !reduceMotion ? 'transform 1.4s ease-in-out' : 'none'
        slide.style.transform=`translateX(${offset}%)`
        slide.setAttribute('aria-hidden',pos!==0)
    })
    dots.forEach((d,i)=>d.setAttribute('aria-current',i===currentSlide))
}

function goToSlide(index){
    currentSlide=(index+slides.length)%slides.length
    placeSlides(true)
    // after the animation, the slide that left on the left goes to the back of the line (no animation)
    clearTimeout(animationEnd)
    animationEnd=setTimeout(()=>placeSlides(false),1450)
    restartTimer()
}

function nextSlide(){
    goToSlide(currentSlide+1)
}

function restartTimer(){
    clearInterval(slideTimer)
    if(!reduceMotion) slideTimer=setInterval(nextSlide,6000)
}

dots.forEach((d,i)=>d.addEventListener('click',()=>goToSlide(i)))
placeSlides(false)
restartTimer()

/* ---------------- Menu ---------------- */
const categories=Object.keys(MENU)
let currentCategory=0
const formatPrice=(v)=>v.toLocaleString('en-US',{style:'currency',currency:'BRL'})

function changeCategory(event){
    const direction=event.currentTarget.id==='right' ? 1 : -1
    currentCategory=(currentCategory+direction+categories.length)%categories.length
    renderMenu()
}

function renderMenu(){
    const name=categories[currentCategory]
    const items=MENU[name]
    document.getElementById('menu-category').innerText=name

    const grid=document.getElementById('menu-grid')
    grid.innerHTML=''
    items.forEach((item,i)=>{
        const button=document.createElement('button')
        button.type='button'
        button.className='menu-item'
        button.id=item.id
        button.setAttribute('aria-label',`${item.name}, ${formatPrice(item.price)}`)
        button.addEventListener('click',()=>showItem(i))

        const img=document.createElement('img')
        img.src=item.img
        img.alt=''
        img.loading='lazy'
        if(!item.banner) img.className='pixel'
        button.appendChild(img)
        grid.appendChild(button)
    })
    showItem(0)
}

function showItem(index){
    const item=MENU[categories[currentCategory]][index]
    const banner=document.getElementById('menu-banner')

    document.querySelectorAll('.menu-item').forEach((b,i)=>b.setAttribute('aria-pressed',i===index))

    if(item.banner){
        banner.classList.remove('banner-pixel')
        banner.style.backgroundImage=`url(${item.banner})`
    }else{
        // items without a photo use the pixel art sprite over the doodle background
        banner.classList.add('banner-pixel')
        banner.style.backgroundImage=`url(${item.img}), url(static/img/background-black.png)`
    }
    banner.setAttribute('aria-label',item.name)

    document.getElementById('product-name').innerText=item.name
    document.getElementById('product-price').innerText=formatPrice(item.price)
    document.getElementById('product-info').innerText=item.info

    const info=document.querySelector('.menu-info')
    if(!reduceMotion){
        info.classList.remove('switching')
        void info.offsetWidth
        info.classList.add('switching')
    }
}

renderMenu()

/* ---------------- Footer ---------------- */
document.getElementById('current-year').innerText=new Date().getFullYear()
