const debounce = (callback: Function) => {
    let timer: number | null = null

    return function () {
        if (timer !== null) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            callback.apply(this, arguments)
        }, 1000)
    }
}

export default debounce
