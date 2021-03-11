import { Context } from 'egg';

export async function  add (ctx: Context) {
  ctx.body = {
    message: 'ok'
  }
  try {
    // Page为webpack打包的chunkName，项目默认的entry为Page
  } catch (error) {
  }
}