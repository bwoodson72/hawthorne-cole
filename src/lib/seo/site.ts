export const SITE_ORIGIN = 'https://hawthornecole.example';
export const SITE_NAME = 'Hawthorne & Cole';
export const DEFAULT_SOCIAL_IMAGE = '/favicon.svg';

export function absoluteUrl(path: string | URL): string {
  return new URL(path, SITE_ORIGIN).href;
}
