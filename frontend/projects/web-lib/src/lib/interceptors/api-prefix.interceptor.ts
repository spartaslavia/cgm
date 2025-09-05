import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

export const apiPrefixInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.url.startsWith('/api')
    ? req.clone({ url: `http://localhost:5000${req.url}` })
    : req;
  const started = performance.now();
  return next(apiReq).pipe(
    finalize(() => {
      const time = Math.round(performance.now() - started);
      console.debug(`${req.method} ${req.url} took ${time}ms`);
    })
  );
};
