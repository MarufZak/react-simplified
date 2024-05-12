/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        "neutral-1000": "var(--neutral-1000)",
        "neutral-900": "var(--neutral-900)",
        "neutral-800": "var(--neutral-800)",
        "neutral-700": "var(--neutral-700)",
        "neutral-600": "var(--neutral-600)",
        "neutral-500": "var(--neutral-500)",
        "neutral-400": "var(--neutral-400)",
        "neutral-300": "var(--neutral-300)",
        "neutral-200": "var(--neutral-200)",
        "neutral-150": "var(--neutral-150)",
        "neutral-100": "var(--neutral-100)",
        "neutral-0": "var(--neutral-0)",

        "primary-700": "var(--primary-700)",
        "primary-600": "var(--primary-600)",
        "primary-500": "var(--primary-500)",
        "primary-200": "var(--primary-200)",
        "primary-100": "var(--primary-100)",

        "secondary-700": "var(--secondary-700)",
        "secondary-600": "var(--secondary-600)",
        "secondary-500": "var(--secondary-500)",
        "secondary-200": "var(--secondary-200)",
        "secondary-100": "var(--secondary-100)",

        "success-700": "var(--success-700)",
        "success-600": "var(--success-600)",
        "success-500": "var(--success-500)",
        "success-200": "var(--success-200)",
        "success-100": "var(--success-100)",

        "danger-700": "var(--danger-700)",
        "danger-600": "var(--danger-600)",
        "danger-500": "var(--danger-500)",
        "danger-200": "var(--danger-200)",
        "danger-100": "var(--danger-100)",

        "alternative-700": "var(--alternative-700)",
        "alternative-600": "var(--alternative-600)",
        "alternative-500": "var(--alternative-500)",
        "alternative-200": "var(--alternative-200)",
        "alternative-100": "var(--alternative-100)",

        "warning-700": "var(--warning-700)",
        "warning-600": "var(--warning-600)",
        "warning-500": "var(--warning-500)",
        "warning-200": "var(--warning-200)",
        "warning-100": "var(--warning-100)",
      },
    },
  },
};
