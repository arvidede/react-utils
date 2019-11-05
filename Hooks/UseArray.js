import { useState, useMemo, useCallback } from 'react'

function getInitialState(value) {
    if (typeof value === 'string') return [value]
    else if (Array.isArray(value)) return value
    else return []
}

export function useArray(initialValue) {
    const [array, setArray] = useState(getInitialState(initialValue))

    const handleGetFromArray = useCallback(
        function(startOfArray) {
            const copy = [...array]
            const item = startOfArray ? copy.shift() : copy.pop() // Will return undefined if empty. If it's ok with ECMA it's ok with me
            setArray(copy)
            return item
        },
        [array]
    )

    const handleSpliceArray = useCallback(
        function(first, count, item = null) {
            const copy = [...array]
            const items =
                item === null
                    ? copy.splice(first, count)
                    : copy.splice(first, count, item)
            setArray(copy)
            return items
        },
        [array]
    )

    const handleAddToArray = useCallback(
        function(startOfArray, item) {
            const copy = startOfArray ? [item, ...array] : [...array, item]
            setArray(copy)
        },
        [array]
    )

    return useMemo(
        () => ({
            value: array,
            setValue: setArray,
            pop: () => handleGetFromArray(false),
            push: item => handleAddToArray(false, item),
            shift: () => handleGetFromArray(true),
            unshift: item => handleAddToArray(true, item),
            splice: handleSpliceArray,
            replace: (index, item) => handleSpliceArray(index, 1, item),
            insert: (index, item) => handleSpliceArray(index, 0, item),
            remove: index => handleSpliceArray(index, 1),
            length: array.length
        }),
        [array, handleAddToArray, handleGetFromArray, handleSpliceArray]
    )
}
