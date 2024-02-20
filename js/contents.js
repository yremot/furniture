window.addEventListener('load', () => {
    newInfo()
    scrollTrigger()
    magazine()
    sofaSlide()
    best()
    showRoom()



})


//첫번째 new 영역
function newInfo(){
    const panel = document.querySelector('#new_panel_inner')
    const tabMenu = document.querySelectorAll('#new_tabmenu_list>li')
    const newWrap = document.querySelector('#new_wrap')
    let selectedTabMenu = tabMenu[0]


    //scrollTrigger부분
    gsap.set(panel,{y:100,opacity:0})
    gsap.to(panel,{y:0,opacity:1,duration:0.5, ease:'power1.out',scrollTrigger:{
        trigger:newWrap,
        // markers:true,
        start:'0% 10%',
        end:'80% 0%',
        toggleActions:'play reverse play reverse', 
    }})

    //패널 보이기
    showPanel(0)

    tabMenu.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            activateTabMenu(index)
            showPanel(index)
            e.preventDefault()

        })
    })
    
    function activateTabMenu(index) {   //탭메뉴 활성화
        if (selectedTabMenu != null && selectedTabMenu != tabMenu[index]) {
            selectedTabMenu.classList.remove('selected')
        }
        if (selectedTabMenu != tabMenu[index]) {
            selectedTabMenu = tabMenu[index]
            selectedTabMenu.classList.add('selected')
        }
    }
    
    function showPanel(index) {     //패널 불러오기
        axios.get(`/furniture/data/new0${index}.html`).then((res) => {
            panel.innerHTML = res.data;
            panelEffect()
            slideEffect()
        }, () => {
            panel.innerHTML = '네트워크오류';
        })
    }

    function panelEffect() {        //패널 올라오는 효과
        const title = document.querySelectorAll('.new_title')
        const text = document.querySelectorAll('.new_text')
        const btn = document.querySelectorAll('.new_btn')
        const item = document.querySelectorAll('.new_item_inner')

        gsap.set(title, { y: 100, opacity: 0 })
        gsap.set(text, { y: 100, opacity: 0 })
        gsap.set(btn, { y: 50, opacity: 0 })
        gsap.set(item, { y: 50, opacity: 0 })

        gsap.to(title, { y: 0, opacity: 1, duration: 0.5, ease: 'power1.out' })
        gsap.to(text, { y: 0, opacity: 1, duration: 0.5, ease: 'power1.out' })
        gsap.to(btn, { y: 0, opacity: 1, duration: 0.5, ease: 'power1.out', delay: 0.3, onComplete: () => { } })
        gsap.to(item, { y: 0, opacity: 1, duration: 0.5, ease: 'power1.out', delay: 0.5 })

    }

    function slideEffect() {        //패널 안 가구 슬라이드 효과
        const visualLi = document.querySelectorAll('.new_item_list>li')
        const leftBtn = document.querySelector('#new_left')
        const rightBtn = document.querySelector('#new_right')
        const slideNum = document.querySelector('#new_index_list').children[0]
        let currentIndex = 0;
        let nextIndex = currentIndex + 1
        let isPlay = false
        let visualLength = visualLi.length

        slideNum.innerHTML = `01`

        rightBtn.addEventListener('click', slideVisualNext)
        leftBtn.addEventListener('click', slideVisualPrev)

        gsap.set(visualLi, { y: 40, opacity: 0 })
        gsap.set(visualLi[currentIndex], { y: 0, opacity: 1 })


        function slideVisualNext() {
            if (isPlay == false) {
                isPlay = true;
                nextIndex = currentIndex + 1;
                if (nextIndex >= visualLength) {
                    nextIndex = 0
                }
                gsap.set(visualLi[currentIndex], { opacity: 0, y: 40 })
                gsap.set(visualLi[nextIndex], { y: 40, opacity: 0 })
                gsap.to(visualLi[nextIndex], {
                    y: 0, opacity: 1, duration: 0.5, ease: 'power1.out', onComplete: () => {
                        isPlay = false
                    }
                })

                currentIndex = nextIndex
                slideNum.innerHTML = `0${currentIndex + 1}`
                
            }
        }
        function slideVisualPrev() {
            if (isPlay == false) {
                isPlay = true;
                nextIndex = currentIndex - 1;
                if (nextIndex < 0) {
                    nextIndex = visualLength - 1
                }
                gsap.set(visualLi[currentIndex], { opacity: 0, y: 40 })
                gsap.set(visualLi[nextIndex], { y: 40, opacity: 0 })
                gsap.to(visualLi[nextIndex], {
                    y: 0, opacity: 1, duration: 0.5, ease: 'power1.out', onComplete: () => {
                        isPlay = false
                    }
                })

                currentIndex = nextIndex
                slideNum.innerHTML = `0${currentIndex + 1}`

            }
        }

    }
}



function scrollTrigger(){       //패널 트리거 효과 모음
    //프로모션영역 
    const promotion=document.querySelector('#promotion_wrap')
    const promotionText=document.querySelector('#promotion')

    gsap.set(promotionText,{y:100,opacity:0})

    gsap.to(promotionText,{y:0,opacity:1,duration:0.5, ease:'power1.out',scrollTrigger:{
        trigger:promotion,
        // markers:true,
        start:'0% 0%',
        end:'100% 50%',
        toggleActions:'play reverse play reverse', 
    }})

    //브랜드 글자영역
    const brand=document.querySelector('#brand_wrap')
    const brandText=document.querySelector('#brand p')

    let startX=window.innerWidth
    let endX=startX+brandText.clientWidth

    gsap.set(brandText,{left:startX})

    gsap.to(brandText,{x:-endX,scrollTrigger:{
        trigger:brand,
        // markers:true,
        start:'0% 0%',
        end:'500% 0%',
        scrub:1,
        pin:true
    }})

    //컬렉션 영역

    const collection = document.querySelector('#collection_wrap')
    const colImgLeftWrap= document.querySelector('#col_left')
    const colImgRightWrap= document.querySelector('#col_right')

    endY=colImgLeftWrap.offsetHeight-collection.offsetHeight-600;
    endY2=colImgLeftWrap.offsetHeight-collection.offsetHeight-380;


    gsap.to(colImgLeftWrap,{y:-endY,scrollTrigger:{
        trigger:collection,
        // markers:true,
        start:'0% 0%',
        end:'200% 0%',
        scrub:5,
    }})

    gsap.set(colImgRightWrap,{top:-endY2})

    gsap.to(colImgRightWrap,{top:0,scrollTrigger:{
        trigger:collection,
        // markers:true,
        start:'0% 0%',
        end:'200% 0%',
        scrub:1,
        pin:true
    }})

    
    //정보 글 영역(designer)

    const infoWrap=document.querySelector('#info_wrap')

    gsap.set(infoWrap,{background:'black'})
    gsap.to(infoWrap,{background:'#FCFCFC',scrollTrigger:{
        trigger:infoWrap,
        // markers:true,
        start:'0% 0%',
        end:'100% 0%',
        scrub:true,
        pin:true
    }})
 


    //주방영역
    const kitchen=document.querySelector('#kitchen_wrap')
    const kitchenText=document.querySelectorAll('#kitchen p')
    const kitchenBtn=document.querySelector('#kitchen button')
    

    gsap.set(kitchenText,{y:100,opacity:0})
    gsap.set(kitchenBtn,{y:100,opacity:0})

    gsap.to(kitchenText,{y:0,opacity:1,duration:0.5, ease:'power1.out',scrollTrigger:{
        trigger:kitchen,
        start:'0% 10%',
        end:'60% 0%',
        toggleActions:'play reverse play reverse', 
    }})
    gsap.to(kitchenBtn,{y:0,opacity:1,duration:0.5, ease:'power1.out',scrollTrigger:{
        trigger:kitchen,
        // markers:true,
        start:'0% 10%',
        end:'60% 0%',
        toggleActions:'play reverse play reverse', 
    }})


}

function magazine(){        //매거진 영역
    const magazine=document.querySelector('#magazine_wrap')
    const magRightImg=document.querySelector("#mag_right_img")
    const magBottomImg=document.querySelector("#mag_bottom_img")
    const magBottomText=document.querySelectorAll('#mag_bottom_text')
    const magTitle=document.querySelector('#magazine_title')
    const whiteTitle=document.querySelector('.white_title')
    const white=document.querySelectorAll('.mag_text .white')
    const magText0=document.querySelector('.mag0')
    var endText=magText0.offsetWidth

    //글자 하나씩 채워지기
    gsap.to(whiteTitle,{width:magTitle.offsetWidth,scrollTrigger:{
        trigger:magTitle,
        // markers:true,
        start:'0% 60%',
        end:'100% 50%',
        scrub:true,
    }})
    white.forEach((item,index)=>{
        gsap.to(item,{width:endText, delay:0.5*(index+1),scrollTrigger:{
            trigger:magazine,
            // markers:true,
            start:'0% 60%',
            end:'100% 50%',
            toggleActions:'play reverse play reverse',
        }})
    })


    //글자와 이미지 올라오기

    gsap.set(magBottomText,{y:100,opacity:0})
    gsap.to(magBottomText,{y:0,opacity:1,scrollTrigger:{
        trigger:magBottomText,
        start: "top 60%",
        end: "bottom 0%",
        toggleActions: 'play reverse play reverse'
    }})



    gsap.set(magRightImg,{y:100, opacity:0})
    gsap.set(magBottomImg,{y:100, opacity:0})

    gsap.to(magRightImg,{y:0,opacity:1,scrollTrigger:{
        trigger:magazine,
        // markers:true,
        start:'0% 30%',
        end:'100% 0%',
        toggleActions:'play reverse play reverse', 
        
    }})
    gsap.to(magBottomImg,{y:-0,opacity:1,scrollTrigger:{
        trigger:magazine,
        // markers:true,
        start:'0% -50%',
        end:'100% 0%',
        toggleActions:'play reverse play reverse', 
        
    }})


}


function sofaSlide() {        //소파 슬라이드 효과
    const visualLi=document.querySelectorAll('#sofa_item_list>li')
    const visualInner=document.querySelector('#sofa_item_inner')
    const visualImg=document.querySelectorAll('#sofa_item_list>li img')
    const visualLeftBtn=document.querySelector('.sofa_left_btn')
    const visualRightBtn=document.querySelector('.sofa_right_btn')

    let visualLength=visualLi.length
    let visualWidth=visualInner.offsetWidth

    let timer=null;
    let currentIndex=0;
    let nextIndex=currentIndex+1;

    gsap.set(visualLi,{opacity:0,display:'none'})
    gsap.set(visualLi[currentIndex],{opacity:1,display:'block'})

    window.addEventListener('resize',visualReset)
    visualRightBtn.addEventListener('click',slideVisualNext)
    visualRightBtn.addEventListener('mouseenter',stopAutoPlay)
    visualRightBtn.addEventListener('mouseleave',autoPlay)
    visualLeftBtn.addEventListener('click',slideVisualPrev)
    visualLeftBtn.addEventListener('mouseenter',stopAutoPlay)
    visualLeftBtn.addEventListener('mouseeleave',autoPlay)


    visualReset()
    autoPlay()

    function visualReset(){
        visualWidth=visualInner.offsetWidth;
        gsap.set(visualLi,{width:visualWidth})
        gsap.set(visualImg,{width:visualWidth})

    }
    
    
    function slideVisualNext(){
        nextIndex=currentIndex+1;
        if(nextIndex>=visualLength){
            nextIndex=0
          }
        gsap.to(visualLi[currentIndex],{opacity:0,display:'none',duration:0.5,ease:'power1.out'})
        gsap.set(visualLi[nextIndex],{opacity:0})
        gsap.to(visualLi[nextIndex],{opacity:1,display:'block',duration:0.5,ease:'power1.out'})
        
        currentIndex=nextIndex

    }
    
    function slideVisualPrev(){
        nextIndex=currentIndex-1;
        if(nextIndex<0){
            nextIndex=visualLength-1
        }
        gsap.to(visualLi[currentIndex],{opacity:0,display:'none',duration:0.5,ease:'power1.out'})
        gsap.set(visualLi[nextIndex],{opacity:0})
        gsap.to(visualLi[nextIndex],{opacity:1,display:'block',duration:0.5,ease:'power1.out'})
        currentIndex=nextIndex
    }
    function autoPlay(){
        timer=setInterval(slideVisualNext,4000)
    }
    function stopAutoPlay(){
        clearInterval(timer)
    }

}

function best(){            // 베스트제품 영역
    const panel = document.querySelector('#best_list_inner')
    const tabMenu = document.querySelectorAll('#best_tabmenu_list>li')
    let selectedTabMenu = tabMenu[0]

    showPanel(0)

    tabMenu.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            activateTabMenu(index)
            showPanel(index)
            e.preventDefault()

        })
    })
    
    function activateTabMenu(index) {   //탭메뉴 활성화
        if (selectedTabMenu != null && selectedTabMenu != tabMenu[index]) {
            selectedTabMenu.classList.remove('selected')
        }
        if (selectedTabMenu != tabMenu[index]) {
            selectedTabMenu = tabMenu[index]
            selectedTabMenu.classList.add('selected')
        }
    }
    
    function showPanel(index) {     //패널 불러오기
        axios.get(`/furniture/data/best0${index}.html`).then((res) => {
            panel.innerHTML = res.data;
            slideEffect()
        }, () => {
            panel.innerHTML = '네트워크오류';
        })
    }

    function slideEffect(){ //슬라이드효과
        const visualInner = document.querySelector('#best_list_inner')
        const visualList = document.querySelectorAll('#best_list')
        const visualLi = document.querySelectorAll('#best_list>li')
        const leftBtn = document.querySelector('#best_left_btn')
        const rightBtn = document.querySelector('#best_right_btn')
        let isSlide = false
        let visualLength = visualLi.length

        let visualWidth=visualInner.offsetWidth
        let currentIndex=0;
        let nextIndex=currentIndex+1



        window.addEventListener('resize',visualReset)
        rightBtn.addEventListener('click', slideVisualNext)
        leftBtn.addEventListener('click', slideVisualPrev)

        visualReset()
    
        function visualReset(){
            visualWidth=visualInner.offsetWidth;
            gsap.set(visualLi,{width:visualWidth})
            gsap.set(visualLi,{x:visualWidth})
            gsap.set(visualLi[currentIndex],{x:0})
            gsap.set(visualList,{width:visualWidth*visualLength})
        }
        
        
        function slideVisualNext(){
            if(isSlide==false){
                isSlide=true
                nextIndex=currentIndex+1;
                if(nextIndex>=visualLength){
                    nextIndex=0
                }
                gsap.to(visualLi[currentIndex],{x:-visualWidth,duration:0.5,ease:'power1.out'})
                gsap.set(visualLi[nextIndex],{x:visualWidth})
                gsap.to(visualLi[nextIndex],{x:0,duration:0.5,ease:'power1.out',onComplete:()=>{
                    isSlide=false
                }})
                currentIndex=nextIndex
                
            }
        }
        
        function slideVisualPrev(){
            if(isSlide==false){
                isSlide=true;
                nextIndex=currentIndex-1;
                if(nextIndex<0){
                    nextIndex=visualLength-1
                }
                gsap.to(visualLi[currentIndex],{x:visualWidth,duration:0.5,ease:'power1.out'})
                gsap.set(visualLi[nextIndex],{x:-visualWidth})
                gsap.to(visualLi[nextIndex],{x:0,duration:0.5,ease:'power1.out',onComplete:()=>{
                    isSlide=false
                }})
                currentIndex=nextIndex
                
            }
        }

    }
}

// 쇼룸영역
function showRoom(){
    const room=document.querySelector('.online_showroom')
    const roomWrap=document.querySelector('#online_showroom_wrap')
    const filmList=document.querySelector('#film_list')
    const filmLi=document.querySelectorAll('#film_list>li')
    var selectedImg=filmLi[0];


    endY=filmList.offsetHeight-room.offsetHeight
    gsap.set(filmList,{y:0})


    gsap.to(filmList,{y:-endY,scrollTrigger:{
        trigger:roomWrap,
        // markers:true,
        start:'top 0%',
        end:'400% 0%',
        scrub:1,
        pin:true
    }})

    filmLi.forEach((item,index)=>{
       item.addEventListener('click',()=>{

        activateImg(index)
        changeImg(index)
       })
    })
    
    function changeImg(index){

        let newImg=document.createElement('div'); 
        newImg.classList.add('online_showroom')
        newImg.style.background=`url(/furniture/images/show_bg_${index}.jpg)`
        roomWrap.prepend(newImg); 
        
        gsap.to(roomWrap.children[1], {opacity:0, duration:0.5, ease:'power1.out', onComplete:()=>{
          roomWrap.removeChild(roomWrap.children[1]) 
        }})
    }

    function activateImg(index){
        if (selectedImg != null && selectedImg != filmLi[index]) {
            selectedImg.classList.remove('selected')
        }
        if (selectedImg != filmLi[index]) {
            selectedImg = filmLi[index]
            selectedImg.classList.add('selected')
        }
    }


}

