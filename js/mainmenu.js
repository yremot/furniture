document.addEventListener('DOMContentLoaded',()=>{
    const menuBtn=document.querySelector('#menu_icon')
    const closeBtn=document.querySelector('#close_allmenu_btn')
    const allMenu=document.querySelector('#allmenu')
    const allMenuLi=document.querySelectorAll('#allmenu_list>li')
    const searchBtn=document.querySelector('#usermenu_list').children[0]
    const searchWrap=document.querySelector('#search_wrap')
    const searchCloseBtn=document.querySelector('.close_allmenu_btn')
    const body=document.querySelector('body')

    let selectedMenu=null;

    
    menuBtn.addEventListener('click',showAllMenu)
    closeBtn.addEventListener('click',closeAllMenu)
    searchBtn.addEventListener('click',showSearch)
    searchCloseBtn.addEventListener('click',hideSearch)

    function showSearch(){
        searchWrap.style.display='block'
        body.classList.add('stop_scrolling')
    }
    function hideSearch(){
        searchWrap.style.display='none'
        body.classList.remove('stop_scrolling')
    }

    for(const item of allMenuLi){
        item.addEventListener('mouseenter',activateMenu)
    }
    
    gsap.set(allMenu,{opacity:0,display:'none'})
    function showAllMenu(){
        gsap.to(allMenu,{opacity:1,display:'block',duration:0.2,ease:'power1.out'})
        selectedMenu=allMenuLi[0]
        selectedMenu.classList.add('selected')
    
    }
    function closeAllMenu(){
        gsap.set(allMenu,{opacity:0,display:'none'})
        if(selectedMenu!=null && selectedMenu!=this){
            selectedMenu.classList.remove('selected')
        }
    }
    function activateMenu(){
        if(selectedMenu!=null && selectedMenu!=this){
            selectedMenu.classList.remove('selected')
        }
        if(selectedMenu!=this){
            selectedMenu=this
            selectedMenu.classList.add('selected')
        }
    }




})