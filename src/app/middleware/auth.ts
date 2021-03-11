import { Context, EggLoaderOptions } from 'egg';

export default function(options: EggLoaderOptions) {
  return async function auth(ctx: Context, next: any) {
    console.log('get in')
    try {
      await next();
    } catch(err) {
    }
    
    
    // 后续中间件执行完成后将响应体转换成 gzip
    
  }
}