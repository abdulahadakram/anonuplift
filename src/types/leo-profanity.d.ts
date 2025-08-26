declare module 'leo-profanity' {
  export class Filter {
    constructor();
    addWords(...words: string[]): void;
    removeWords(...words: string[]): void;
    check(text: string): boolean;
    clean(text: string): string;
    list(): string[];
  }
}
