import { ProxyItem } from 'dprx-types';
import { searchVideo } from './lib/search';

export function search({ searchQuery, proxy }: { searchQuery: string; proxy?: ProxyItem }) {
  return searchVideo({ searchQuery, proxy });
}
