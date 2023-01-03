import { searchVideo } from './lib/search';


export function search(searchQuery: string) {
  return searchVideo(searchQuery);
}
