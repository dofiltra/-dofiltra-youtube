import { Dodecorator } from '@dofiltra/helpers';
import { TResultError } from '@dofiltra/types';
import { searchVideo } from './lib/search';

(async () => {
  //
})();

class AibackDebug {
  @Dodecorator.doretry({ tryLimit: 100, pauseMs: 1e3 })
  static async start({}: any): TResultError<any> {
    const res = await searchVideo({ searchQuery: 'top 10 music' });

    return { result: {} };
  }
}

AibackDebug.start({});
