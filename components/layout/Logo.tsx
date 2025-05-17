import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" rx="8" fill="currentColor" fillOpacity="0.1" />
      <path
        d="M10 20C10 14.4772 14.4772 10 20 10V10C25.5228 10 30 14.4772 30 20V26C30 28.2091 28.2091 30 26 30H14C11.7909 30 10 28.2091 10 26V20Z"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path
        d="M15 19.9998C15 17.2384 17.2386 14.9998 20 14.9998C22.7614 14.9998 25 17.2384 25 19.9998C25 22.7613 22.7614 24.9998 20 24.9998C17.2386 24.9998 15 22.7613 15 19.9998Z"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path
        d="M13 17.9998C13 16.3429 14.3431 14.9998 16 14.9998V14.9998C17.6569 14.9998 19 16.3429 19 17.9998V22.9998C19 24.6567 17.6569 25.9998 16 25.9998V25.9998C14.3431 25.9998 13 24.6567 13 22.9998V17.9998Z"
        fill="currentColor"
      />
      <path
        d="M22 17.9998C22 16.3429 23.3431 14.9998 25 14.9998V14.9998C26.6569 14.9998 28 16.3429 28 17.9998V22.9998C28 24.6567 26.6569 25.9998 25 25.9998V25.9998C23.3431 25.9998 22 24.6567 22 22.9998V17.9998Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Logo; 