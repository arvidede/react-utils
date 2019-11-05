import { useState, useMemo, useCallback } from 'react'

export function useNumber(initValue) {
    const [number, setNumber] = useState(
        isValidNumber(initValue) ? initValue : 0
    )

    function isValidNumber(value) {
        return !isNaN(Number(value))
    }

    const handleUpdateValue = useCallback(function(value) {
        if (isValidNumber(value)) setNumber(Number(value))
    }, [])

    const handleChangeValue = useCallback(
        function(step, shouldIncrease) {
            if (isValidNumber(step))
                setNumber(
                    number + (shouldIncrease ? Math.abs(step) : -Math.abs(step))
                )
            else if (typeof step === 'object')
                setNumber(number + (shouldIncrease ? 1 : -1))
        },
        [number]
    )

    return useMemo(
        () => ({
            value: number,
            increase: (step = 1) => handleChangeValue(step, true),
            decrease: (step = 1) => handleChangeValue(step, false),
            positive: () => setNumber(Math.abs(number)),
            setNumber: handleUpdateValue
        }),
        [number, handleChangeValue, handleUpdateValue]
    )
}
