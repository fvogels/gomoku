export type Square = 'empty' | 'white' | 'black';

export function opponent(color: 'white' | 'black'): 'white' | 'black' {
    return color === 'white' ? 'black' : 'white';
}
