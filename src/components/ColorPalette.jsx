import { useState } from 'react'

export default function ColorPalette() {
    // Default white
    const [selectedColor, setSelectedColor] = useState('#ffffff')

    // Color selector
    return (
        <div
            className="tooltip tooltip-bottom"
            data-tip="Select a color for the bounding box"
        >
            {/* Tooltip for the color selector */}
            <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="input w-10 h-10 p-0 cursor-pointer"
            />
        </div>
    )
}
