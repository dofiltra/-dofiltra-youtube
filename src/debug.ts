/* tslint:disable:no-console */
/* tslint:disable:no-debugger */

import type { TResultError } from '@dofiltra/types'
import { Dodecorator } from '@dofiltra/helpers'
import { searchVideo } from './lib/search'
;(async () => {
  //
})()

class AibackDebug {
  @Dodecorator.doretry({ tryLimit: 100, pauseMs: 1e3 })
  static async start({}: any): TResultError<any> {
    const res = await searchVideo({ searchQuery: 'catnap' })
    debugger

    return { result: {} }
  }
}

AibackDebug.start({})
