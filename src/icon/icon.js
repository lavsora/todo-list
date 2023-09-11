import React from 'react'

function IconPlay() {
  return (
    <div className="icon">
      <svg width="11px" height="14px" viewBox="0 0 11 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-753.000000, -955.000000)">
            <g transform="translate(100.000000, 852.000000)">
              <g transform="translate(646.000000, 98.000000)">
                <g>
                  <rect x="0" y="0" width="24" height="24" />
                  <path
                    id="icon-color"
                    d="M7,6.82 L7,17.18 C7,17.97 7.87,18.45 8.54,18.02 L16.68,12.84 C17.3,12.45 17.3,11.55 16.68,11.15 L8.54,5.98 C7.87,5.55 7,6.03 7,6.82 Z"
                    fill="#cc9a9a"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

function IconPause() {
  return (
    <div className="icon">
      <svg width="10px" height="12px" viewBox="0 0 6 8" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-227.000000, -3765.000000)" fill="#000000">
            <g transform="translate(56.000000, 160.000000)">
              <path
                id="icon-color"
                d="M172,3605 C171.448,3605 171,3605.448 171,3606 L171,3612 C171,3612.552 171.448,3613 172,3613 C172.552,3613 173,3612.552 173,3612 L173,3606 C173,3605.448 172.552,3605 172,3605 M177,3606 L177,3612 C177,3612.552 176.552,3613 176,3613 C175.448,3613 175,3612.552 175,3612 L175,3606 C175,3605.448 175.448,3605 176,3605 C176.552,3605 177,3605.448 177,3606"
                fill="#cc9a9a"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

function Icon({ playTimer }) {
  if (playTimer) {
    return <IconPause />
  }

  return <IconPlay />
}

export default Icon
