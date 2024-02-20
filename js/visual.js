window.addEventListener('load',()=>{
    const visualLi=document.querySelectorAll('#visual_list>li')
    const visualInner=document.querySelector('#visual_inner')
    const visualLeftBtn=document.querySelector('#visual_left')
    const visualRightBtn=document.querySelector('#visual_right')
    const visualText=document.querySelectorAll('.visual_text_box')
    const slideBar=document.querySelector('#visual_bar_fill')
    const slideNum=document.querySelector('#visual_bar_index')

    let visualLength=visualLi.length
    let visualWidth=visualInner.offsetWidth

    let timer=null;

    let currentIndex=0;
    let nextIndex=currentIndex+1;

    gsap.set(visualLi,{left:visualWidth,opacity:0})
    gsap.set(visualLi[currentIndex],{left:0,opacity:1})


    window.addEventListener('resize',visualReset)
    visualRightBtn.addEventListener('click',slideVisualNext)
    visualLeftBtn.addEventListener('click',slideVisualPrev)

    visualRightBtn.addEventListener('mouseenter',stopAutoPlay)
    visualRightBtn.addEventListener('mouseleave',autoPlay)
    visualLeftBtn.addEventListener('mouseenter',stopAutoPlay)
    visualLeftBtn.addEventListener('mouseleave',autoPlay)


    visualReset()
    autoPlay()

    function visualReset(){
        visualWidth=visualInner.offsetWidth;
        gsap.set(visualLi,{width:visualWidth})
    }
    
    
    function slideVisualNext(){
        nextIndex=currentIndex+1;
        if(nextIndex>=visualLength){
            nextIndex=0
          }
        gsap.to(slideBar,{width:30*(nextIndex+1)})
        gsap.to(visualLi[currentIndex],{left:-visualWidth,opacity:0,duration:0.8,ease:'power1.out'})
        gsap.set(visualLi[nextIndex],{left:visualWidth,opacity:0})
        gsap.set(visualText[nextIndex],{top:50, opacity:0})
        gsap.to(visualLi[nextIndex],{left:0,opacity:1,duration:0.5,ease:'power1.out',onComplete:()=>{
            gsap.to(visualText[nextIndex],{top:0, opacity:1,duration:0.5,ease:'power1.out'})
        }})
        
        currentIndex=nextIndex
        slideNum.innerHTML=`${currentIndex+1}`


        
    }
    
    function slideVisualPrev(){
        nextIndex=currentIndex-1;
        if(nextIndex<0){
            nextIndex=visualLength-1
        }
        gsap.to(slideBar,{width:30*(nextIndex+1)})
        gsap.to(visualLi[currentIndex],{left:visualWidth,opacity:0,duration:0.8,ease:'power1.out'})
        gsap.set(visualText[nextIndex],{top:50, opacity:0})
        gsap.set(visualLi[nextIndex],{left:-visualWidth,opacity:0})
        gsap.to(visualLi[nextIndex],{left:0,opacity:1,duration:0.5,ease:'power1.out',onComplete:()=>{
            gsap.to(visualText[nextIndex],{top:0, opacity:1,duration:0.5,ease:'power1.out'})
        }})
        currentIndex=nextIndex
        slideNum.innerHTML=`${currentIndex+1}`
    }

    function autoPlay(){
        timer=setInterval(slideVisualNext,4000)
    }
    function stopAutoPlay(){
        clearInterval(timer)
    }



})

