import { useState, useMemo } from 'react'

export function useText(initValue) {
    const [text, setText] = useState(initValue)
    return useMemo(
        () => ({
            value: text,
            setText: e => setText(e.target.value)
        }),
        [text]
    )
}
