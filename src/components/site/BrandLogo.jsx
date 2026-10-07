import { BRAND_LOGO } from '../../data/assets.js';

export default function BrandLogo({ className = '' }) {
  return (
    <img
      className={className ? `logo-img ${className}` : 'logo-img'}
      src={BRAND_LOGO.url}
      alt={BRAND_LOGO.alt}
      width={200}
      height={56}
      decoding="async"
    />
  );
}
