'use client';

import { Facebook, Linkedin, Link as LinkIcon, Mail } from 'lucide-react';
import WhatsAppIcon from '@/components/common/WhatsAppIcon';

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

  const shareOnX = () => {
    window.open(`https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
  };

  const shareOnPinterest = () => {
    window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`, '_blank');
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
      label: 'X',
      icon: (
        <svg className="w-4 h-4 fill-current text-gray-800 dark:text-gray-200" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      action: shareOnX,
    },
    {
      label: 'Pinterest',
      icon: (
        <svg className="w-4 h-4 fill-current text-red-600 dark:text-red-400" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
        </svg>
      ),
      action: shareOnPinterest,
    },
    {
      label: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5 text-blue-700 dark:text-blue-500" />,
      action: shareOnLinkedIn,
    },
    {
      label: 'WhatsApp',
      icon: <WhatsAppIcon className="w-5 h-5 text-green-500 dark:text-green-400 fill-current" />,
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
