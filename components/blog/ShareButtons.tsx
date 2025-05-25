'use client';

import { FaFacebook, FaTwitter, FaLinkedin, FaLink, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

interface ShareButtonsProps {
  url: string;
  title: string;
  variant?: 'horizontal' | 'vertical';
  className?: string;
}

export default function ShareButtons({ 
  url, 
  title, 
  variant = 'horizontal',
  className = '' 
}: ShareButtonsProps) {
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  const shareByEmail = () => {
    const subject = `Check out this article: ${title}`;
    const body = `I thought you might find this article interesting: ${title}\n\n${url}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const shareButtonClasses = `p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center ${
    variant === 'vertical' ? 'w-12 h-12' : 'w-10 h-10'
  }`;

  const shareButtons = [
    {
      label: 'Facebook',
      icon: <FaFacebook className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      action: shareOnFacebook,
    },
    {
      label: 'Twitter',
      icon: <FaTwitter className="w-5 h-5 text-blue-400 dark:text-blue-300" />,
      action: shareOnTwitter,
    },
    {
      label: 'LinkedIn',
      icon: <FaLinkedin className="w-5 h-5 text-blue-700 dark:text-blue-500" />,
      action: shareOnLinkedIn,
    },
    {
      label: 'WhatsApp',
      icon: <FaWhatsapp className="w-5 h-5 text-green-500 dark:text-green-400" />,
      action: shareOnWhatsApp,
    },
    {
      label: 'Email',
      icon: <FaEnvelope className="w-5 h-5 text-gray-600 dark:text-gray-300" />,
      action: shareByEmail,
    },
    {
      label: 'Copy link',
      icon: <FaLink className="w-5 h-5 text-gray-600 dark:text-gray-300" />,
      action: copyLink,
    },
  ];

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center space-y-4 ${className}`}>
        {shareButtons.map((button, index) => (
          <button
            key={button.label}
            onClick={button.action}
            className={shareButtonClasses}
            aria-label={`Share on ${button.label}`}
            title={`Share on ${button.label}`}
          >
            {button.icon}
          </button>
        ))}
      </div>
    );
  }

  // Default horizontal layout
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Share this article:</span>
      <div className="flex flex-wrap gap-2">
        {shareButtons.map((button) => (
          <button
            key={button.label}
            onClick={button.action}
            className={`${shareButtonClasses} bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700`}
            aria-label={`Share on ${button.label}`}
            title={`Share on ${button.label}`}
          >
            {button.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
