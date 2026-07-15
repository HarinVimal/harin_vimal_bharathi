export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  description?: string;
  skills: string[];
}
