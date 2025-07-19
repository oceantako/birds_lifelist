import { Hono } from 'hono'
import birds from './data/birds.json' assert { type: 'json' }

//野鳥リスト取得エンドポイント
const get_birdslist = new Hono()
get_birdslist.get('', (c) => {
  return c.json(birds)
})

// honoメイン
export const app = new Hono().basePath("/api")
app.route('/get_birdslist', get_birdslist)

app.fire()
