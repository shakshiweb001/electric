// PLACEHOLDER mark: a pole with two conductors on an amber tile.
// REPLACE with the firm's real logo when the client provides one
// (also replace public/favicon.svg and public/apple-touch-icon.png).
export default function Logo({ size = 40, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="40" height="40" rx="4" fill="#f0a818" />
      <g fill="none" stroke="#0f1b26" strokeLinecap="round">
        <path d="M20 9v23M12 14.5h16M14 32h12" strokeWidth="2.6" />
        <path d="M13.5 14.5v-4M26.5 14.5v-4" strokeWidth="2.2" />
        <path d="M3 13.5c4 3.5 7.5 2.5 10.5-3M26.5 10.5c3 5.5 6.5 6.5 10.5 3" strokeWidth="1.6" />
      </g>
    </svg>
  );
}
