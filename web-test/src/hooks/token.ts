import { atom } from 'jotai';
import Cookies from 'js-cookie';

// Define um átomo com um valor inicial do token obtido dos cookies
export const tokenAtom = atom<string | null>(Cookies.get('token') || null);

// Define um átomo que irá gerenciar a escrita do token nos cookies
export const tokenWithPersistenceAtom = atom(
  (get) => get(tokenAtom),
  (_get, set, newToken: string | null) => {
    set(tokenAtom, newToken);
    if (newToken) {
      Cookies.set('token', newToken, { expires: 1 });
    } else {
      Cookies.remove('token');
    }
  }
);
