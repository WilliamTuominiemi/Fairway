
"use client"

import Square from "./Square"
 
export default function Calendar() {
    const numberOfSquares = 7

    return (
    <div className="flex gap-4 m-5">
      {Array.from({ length: numberOfSquares }).map((_, index) => (
        <Square key={index} />
      ))}
    </div>
  )
}
