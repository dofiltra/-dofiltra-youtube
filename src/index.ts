import { ProxyItem } from '@dofiltra/helpers';
import { searchVideo } from './lib/search';

export function search({ searchQuery, proxy }: { searchQuery: string; proxy?: ProxyItem }) {
  return searchVideo({ searchQuery, proxy });
}
