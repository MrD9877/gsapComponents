"use client";

import MorphRobort from "@/components/MorphRobort";

export default function TestPage() {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
        <g id="mid-display">
          <rect width="320.3" height="207" x="248.8" y="116.3" fill="#282e39" stroke="#0ff" strokeMiterlimit="10" strokeWidth="5" opacity=".8" rx="18.4" />
          <g id="graph-btm">
            <path id="graph-left" fill="#0ff" d="M439.7 292.1s4.5-19.4 8.7-19c3.6.3 4.6 9.2 7.3 9 3.4-.2 4-14 7.3-14.3 3-.2 4.7 10 8.3 10 4 0 5.1-12.6 8.8-12.8 4.1-.2 7.2 27.1 7.2 27.1z" />
            <path id="graph-morph1" fill="none" d="M439.7 292.1s2.2-10.8 6.5-10.4c3.5.3 8.3-18.9 11-19 3.4-.3 5.6 9 9 8.7 3-.3 3.5-3.2 7-3.2 4 0 5.9 10.6 9.5 10.4 4.2-.2 4.7 13.5 4.7 13.5z" />
            <path id="graph-right" fill="#34496a" d="M502.6 292.1s4.5-19.4 8.8-19c3.5.3 4.6 9.2 7.3 9 3.4-.2 3.9-14 7.3-14.3 3-.2 4.7 10 8.3 10 4 0 5-12.6 8.7-12.8 4.2-.2 7.3 27.1 7.3 27.1z" />
            <path id="graph-morph2" fill="none" d="M502.6 292.1s4.5-9.8 8.8-9.4c3.5.3 4.6-6.8 7.3-7 3.4-.2 3.9 6.6 7.3 6.4 3-.3 4.7-17.9 8.3-17.9 4 0 5 16.5 8.7 16.3 4.2-.2 7.3 11.6 7.3 11.6z" />
          </g>
          <g id="planet">
            <circle id="planet-base" cx="332.2" cy="207.8" r="37.3" fill="#34496a" />
            <ellipse id="planet-circle" cx="331.5" cy="207.8" fill="none" stroke="#0ff" strokeMiterlimit="10" strokeWidth="5" rx="61.8" ry="12.7" />
            <path id="planet-top" fill="#34496a" d="M294.9 207.8a37.3 37.3 0 0174.6 0z" />
          </g>
          <g className="graph-circle-lb" id="graph-cir-left">
            <circle cx="290.4" cy="287.5" r="20.8" fill="#34496a" />
            <path fill="#0ff" d="M290.4 287.5l5.3-20.1a20.8 20.8 0 0115.5 20z" />
          </g>
          <g className="graph-circle-lb" id="graph-cir-mid">
            <circle cx="345.4" cy="287.5" r="20.8" fill="#34496a" />
            <path fill="#0ff" d="M345.4 287.5l5.2-20.1a20.8 20.8 0 0115.5 20z" />
          </g>
          <g id="graph-cir">
            <circle cx="396.4" cy="292.1" r="16.4" fill="none" stroke="#34496a" strokeMiterlimit="10" strokeWidth="2" />
            <circle cx="396.4" cy="292.1" r="20.8" fill="none" stroke="#34496a" strokeMiterlimit="10" strokeWidth="2" />
            <circle cx="396.4" cy="292.1" r="11.6" fill="none" stroke="#34496a" strokeMiterlimit="10" strokeWidth="2" />
            <circle id="graph-cir-1" cx="408" cy="292.1" r="2.3" fill="#0ff" />
            <circle id="graph-cir-2" cx="396.4" cy="275.7" r="2.3" fill="#0ff" />
            <circle id="graph-cir-3" cx="417.2" cy="292.1" r="2.3" fill="#0ff" />
            <circle id="graph-cir-mid-2" cx="396.4" cy="292.1" r="2.3" fill="#0ff" data-name="graph-cir-mid" />
          </g>
          <g id="graph-big" clipPath="url(#clipPath)">
            <path id="graph-line" fill="none" stroke="#0ff" strokeMiterlimit="10" strokeWidth="5" d="M439.7 206.4c26.3 0 26.3 34.2 52.6 34.2s26.3-34.2 52.6-34.2 26.3 34.2 52.6 34.2 26.3-34.2 52.6-34.2" />
          </g>
          <circle cx="275.7" cy="139.7" r="11.8" fill="#34496a" />
          <circle id="left-top-circle" cx="275.7" cy="139.7" r="11.8" fill="#0ff" />
          <line x1="300.8" x2="387.1" y1="134.3" y2="134.9" fill="none" stroke="#34496a" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5" />
          <line x1="300.8" x2="338.5" y1="143.7" y2="143.9" fill="none" stroke="#34496a" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="5" />
          {/* circle to animmate  */}
          <circle cx="448.1" cy="161.4" r="13.3" fill="none" stroke="#34496a" strokeMiterlimit="10" strokeWidth="5" />
          <path className="circles-top" id="circle-l" fill="none" stroke="#0ff" strokeMiterlimit="10" strokeWidth="5" d="M448 148.2a13.3 13.3 0 11-13.2 13.3 13.3 13.3 0 0113.3-13.3" />
          {/* circle to animmate  */}
          <circle cx="491.2" cy="161.4" r="13.3" fill="none" stroke="#34496a" strokeMiterlimit="10" strokeWidth="5" />
          <path className="circles-top" id="circle-m" fill="none" stroke="#0ff" strokeMiterlimit="10" strokeWidth="5" d="M491.2 148.2a13.3 13.3 0 11-13.3 13.3 13.3 13.3 0 0113.3-13.3" />
          {/* circle to animmate  */}
          <circle cx="534.4" cy="161.4" r="13.3" fill="none" stroke="#34496a" strokeMiterlimit="10" strokeWidth="5" />
          <path className="circles-top" id="circle-r" fill="none" stroke="#0ff" strokeMiterlimit="10" strokeWidth="5" d="M534.4 148.2a13.3 13.3 0 11-13.3 13.3 13.3 13.3 0 0113.3-13.3" />
        </g>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="400 340 800 600" className="w-[200px] h-[200px]">
        <g id="right-display">
          <g id="right-display-display">
            <path fill="#282e39" stroke="#0ff" strokeMiterlimit="10" strokeWidth="5" d="M654.7 461H508.6c-10.5 0-15.8-8.5-12-19l26.2-72a29.9 29.9 0 0125.8-18.9h146c10.5 0 15.8 8.5 12 19l-26.2 72a29.9 29.9 0 01-25.7 18.8z" opacity=".8" />
            <g id="bars">
              <polygon id="bar-3-btm" fill="#34496a" points="656.9 441.2 642.4 441.2 667.6 371.7 682.2 371.7 656.9 441.2" />
              <polygon id="bar-3-top" fill="#0ff" points="656.9 441.2 642.4 441.2 653 412 667.5 412 656.9 441.2" />
              <polygon id="bar-2-btm" fill="#34496a" points="633.7 441.2 619.2 441.2 644.5 371.7 659 371.7 633.7 441.2" />
              <polygon id="bar-2-top" fill="#0ff" points="633.7 441.2 619.2 441.2 636 395.1 650.5 395.1 633.7 441.2" />
              <polygon id="bar-1-btm" fill="#34496a" points="610.6 441.2 596.1 441.2 621.4 371.7 635.9 371.7 610.6 441.2" />
              <polygon id="bar-1-top" fill="#0ff" points="610.6 441.2 596.1 441.2 604 419.5 618.5 419.5 610.6 441.2" />
            </g>
            <g id="btns" fill="#0ff">
              <ellipse cx="546.8" cy="379.3" rx="6.5" ry="4.6" transform="rotate(-39.8 546.8 379.3)" />
              <ellipse cx="562.7" cy="379.3" rx="6.5" ry="4.6" transform="rotate(-39.8 562.7 379.3)" />
              <ellipse cx="578.6" cy="379.3" rx="6.5" ry="4.6" transform="rotate(-39.8 578.6 379.3)" />
              <ellipse cx="594.5" cy="379.3" rx="6.5" ry="4.6" transform="rotate(-39.8 594.5 379.3)" />
              <ellipse cx="540.6" cy="396.3" rx="6.5" ry="4.6" transform="rotate(-39.8 540.6 396.3)" />
              <ellipse cx="556.5" cy="396.3" rx="6.5" ry="4.6" transform="rotate(-39.8 556.5 396.3)" />
              <ellipse cx="572.4" cy="396.3" rx="6.5" ry="4.6" transform="rotate(-39.8 572.4 396.3)" />
              <ellipse cx="588.3" cy="396.3" rx="6.5" ry="4.6" transform="rotate(-39.8 588.4 396.3)" />
              <ellipse cx="534.4" cy="413.3" rx="6.5" ry="4.6" transform="rotate(-39.8 534.4 413.3)" />
              <ellipse cx="550.3" cy="413.3" rx="6.5" ry="4.6" transform="rotate(-39.8 550.3 413.3)" />
              <ellipse cx="566.2" cy="413.3" rx="6.5" ry="4.6" transform="rotate(-39.8 566.2 413.3)" />
              <ellipse cx="582.1" cy="413.3" rx="6.5" ry="4.6" transform="rotate(-39.8 582.2 413.3)" />
              <ellipse cx="528.2" cy="430.3" rx="6.5" ry="4.6" transform="rotate(-39.8 528.2 430.3)" />
              <ellipse cx="544.1" cy="430.3" rx="6.5" ry="4.6" transform="rotate(-39.8 544.1 430.3)" />
              <ellipse cx="560" cy="430.3" rx="6.5" ry="4.6" transform="rotate(-39.6 562.3 429.7)" />
              <ellipse cx="575.9" cy="430.3" rx="6.5" ry="4.6" transform="rotate(-39.8 576 430.3)" />
            </g>
          </g>
          <ellipse id="right-display-shadow" cx="593.3" cy="508.4" fill="#1e3855" rx="74" ry="10.9" />
        </g>
      </svg>

      <MorphRobort />
    </>
  );
}
