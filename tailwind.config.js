/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'mobile': '320px',
      'tablet': '560px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    extend: {
       colors: {
        'bdr-primary': 'var(--primary-border)',
        'bdr-secondary': 'var(--secondary-border)',
        'primary-bg': 'var(--primary-bg)',
        'color-bg-2': 'var(--bg-2)',
        'color-1': 'var(--text-color-1)',
        'color-2': 'var(--text-color-2)',
        'color-3': 'var(--text-color-3)',
        'color-4': 'var(--text-color-4)',
        'color-5': 'var(--text-color-5)',
        'color-6': 'var(--text-color-6)',
        'color-7': 'var(--text-color-7)',
        'color-8': 'var(--text-color-8)',
        'color-9': 'var(--text-color-9)',
        'color-10': 'var(--text-color-10)',
        'error': 'var(--text-error)',
      },
       height: {
        'nav': 'var(--nav-bar-height)',
      },
      width: {
        'sidenav-full': 'var(--side-nav-width-full)',
        'sidenav-collapse': 'var(--side-nav-width-collapse)',
      },
       spacing: {
        'sidenav-full': 'var(--side-nav-width-full)',
        'sidenav-collapse': 'var(--side-nav-width-collapse)',
      }
    },
  },
  plugins: [],
}
