
interface PortfolioData {
  name: string;
  bio: string;
  profileImage: string;
  degree: string;
  college: string;
  batch: string;
  school: string;
  skills: string[];
}

export const encodePortfolioData = (data: PortfolioData): string => {
  try {
    const compressed = btoa(JSON.stringify(data));
    return compressed;
  } catch (error) {
    console.error('Error encoding portfolio data:', error);
    return '';
  }
};

export const decodePortfolioData = (encoded: string): PortfolioData | null => {
  try {
    if (!encoded) return null;
    const decoded = JSON.parse(atob(encoded));
    return decoded;
  } catch (error) {
    console.error('Error decoding portfolio data:', error);
    return null;
  }
};

export const updateURL = (data: PortfolioData) => {
  const encoded = encodePortfolioData(data);
  const url = new URL(window.location.href);
  url.searchParams.set('portfolio', encoded);
  window.history.replaceState({}, '', url.toString());
};

export const getDataFromURL = (): PortfolioData | null => {
  const url = new URL(window.location.href);
  const encoded = url.searchParams.get('portfolio');
  if (encoded) {
    return decodePortfolioData(encoded);
  }
  return null;
};
