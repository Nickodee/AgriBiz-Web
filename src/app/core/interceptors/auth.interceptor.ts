import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  console.log('Auth Interceptor - Request URL:', req.url);
  console.log('Auth Interceptor - Token:', token ? 'Present' : 'Missing');

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Auth Interceptor - Added Authorization header');
    return next(clonedRequest);
  }

  console.log('Auth Interceptor - No token, proceeding without auth');
  return next(req);
};
