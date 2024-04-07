const throttle = (callback: Function) => {
    let timer: number | null = null
    
    return function(){
        if(timer){
            return 
        }
        timer = setTimeout(() => {
            callback.apply(this, arguments)
            timer = null;
        }, 100)
    }
}

export default throttle