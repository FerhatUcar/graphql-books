import { ReactNode } from "react";

export interface BookDetailsType {
  data: {
    book: {
      name: string;
      genre: string;
      author: {
        name: string;
        books: string[];
      };
    };
  };
  change: boolean;
}

export interface AuthorType {
  id: number;
  name: string;
}

export interface BookType {
  id: number | null;
  name: ReactNode;
  selected?: number | undefined | null;
}
