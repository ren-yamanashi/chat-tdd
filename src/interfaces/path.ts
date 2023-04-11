export interface Path {
  extname(path: string): string;
  resolve(...paths: string[]): string;
  basename(path: string, suffix?: string): string;
  join(...paths: string[]): string;
}
