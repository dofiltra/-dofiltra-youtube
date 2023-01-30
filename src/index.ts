import { ProxyItem } from 'dprx-types';
import { searchVideo } from './lib/search';

export async function search({ searchQuery, proxy }: { searchQuery: string; proxy?: ProxyItem }) {
  return await searchVideo({ searchQuery, proxy });
}
