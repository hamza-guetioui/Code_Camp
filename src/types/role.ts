export interface IRole {
    id: string;
    role: string; // Fixed typo: usename -> username
    permissions: string[];
    accessLevel: string | null;
  }
  
