'use client';

import { Facebook, Twitter, Linkedin, Link as LinkIcon, Mail } from 'lucide-react';

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
      icon: <Facebook className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      action: shareOnFacebook,
    },
    {
      label: 'Twitter',
      icon: <Twitter className="w-5 h-5 text-blue-400 dark:text-blue-300" />,
      action: shareOnTwitter,
    },
    {
      label: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5 text-blue-700 dark:text-blue-500" />,
      action: shareOnLinkedIn,
    },
    {
      label: 'WhatsApp',
      icon: (
        <svg className="w-5 h-5 text-green-500 dark:text-green-400 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.135.215-1.002 3.661 3.755-.985.201.119z"/>
        </svg>
      ),
      action: shareOnWhatsApp,
    },
    {
      label: 'Email',
      icon: <Mail className="w-5 h-5 text-gray-600 dark:text-gray-300" />,
      action: shareByEmail,
    },
    {
      label: 'Copy link',
      icon: <LinkIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />,
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
