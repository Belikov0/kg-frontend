

function _bem(prefixName: string, blockSuffix: string, element: string, modifier: string) {
    if (blockSuffix) {
        prefixName += `-${blockSuffix}`
    }

    if (element) {
        prefixName += `__${element}`
    }

    if (modifier) {
        prefixName += `--${modifier}`
    }

    return prefixName
}

function createBEM(prefixName: string) {
    const b = (blockSuffix: string = '') => _bem(prefixName, blockSuffix, '', '')
    const e = (element: string = '') => (element ? _bem(prefixName, '', element, '') : '')
    const m = (modifier: string = '') => (modifier ? _bem(prefixName, '', '', modifier) : '')
    const be = (blockSuffix: string, element: string) =>
        blockSuffix && element ? _bem(prefixName, blockSuffix, element, '') : ''
    const bm = (blockSuffix: string, modifier: string) =>
        blockSuffix && modifier ? _bem(prefixName, blockSuffix, '', modifier) : ''
    const em = (element: string, modifier: string) =>
        element && modifier ? _bem(prefixName, '', element, modifier) : ''
    const bem = (blockSuffix: string, element: string, modifier: string) =>
        blockSuffix && modifier && element ? _bem(prefixName, blockSuffix, element, modifier) : ''
    const is = (name: string, state: string | boolean) => (state ? `is-${name}` : '')
    return {
        b,
        e,
        m,
        be,
        bm,
        em,
        bem,
        is
    }
}

export function useNamespace(name: string) {
    const prefixName = `kg-${name}`
    return createBEM(prefixName)
}

// const bem = createNamespace("icon");
// console.log(bem.b("box"))
// console.log(bem.e('elem'))
// console.log(bem.m('modifier'))
// console.log(bem.bem('box', 'elem', 'modifier'))
// console.log(bem.is('checked', true))
