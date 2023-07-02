export const noteColors: NoteColor[] = [
  { name: 'red', valueLightTheme: '#F28B82', valueDarkTheme: '#5C2B29' },
  { name: 'green', valueLightTheme: '#CCFF90', valueDarkTheme: '#345920' },
  { name: 'yellow', valueLightTheme: '#FFF475', valueDarkTheme: '#635D19' },
  { name: 'teal', valueLightTheme: '#A7FFEB', valueDarkTheme: '#16504B' },
  { name: 'blue', valueLightTheme: '#AECBFA', valueDarkTheme: '#1E3A5F' },
  { name: 'purple', valueLightTheme: '#D7AEFB', valueDarkTheme: '#42275E' },
];

export interface NoteColor {
  name: string;
  valueLightTheme: string;
  valueDarkTheme: string;
}
