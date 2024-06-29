export interface QuoteApi {
  text: string;
  author: string;
  category: string;
}

export interface Quote extends QuoteApi {
  id: string;
}

export interface QuotesList {
  [id: string]: Quote;
}

export interface Categories {
  id: string;
  title: string;
}