import { useState, useMemo, useCallback } from 'react'

export function useBoolean(initValue) {
    const [state, setState] = useState(
        isValidBoolean(initValue) ? initValue : false
    )

    function isValidBoolean(value) {
        return typeof value === 'boolean'
    }

    const handleSetValue = useCallback(
        function(value) {
            if (isValidBoolean(value)) setState(value)
        },
        []
    )

    return useMemo(
        () => ({
            value: state,
            toggle: () => setState(!state),
            setTrue: () => setState(true),
            setFalse: () => setState(false),
            setValue: handleSetValue
        }),
        [state, handleSetValue]
    )
}
