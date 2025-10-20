import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get token from auth service
    const token = this.authService.getToken();

    // Clone request and add authorization header if token exists
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Always add Accept and Content-Type headers
    request = request.clone({
      setHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized errors
        if (error.status === 401) {
          // Token expired or invalid, logout and redirect to login
          this.authService.logout().subscribe({
            complete: () => {
              this.router.navigate(['/login']);
            }
          });
        }

        // Handle other errors
        let errorMessage = 'An error occurred';
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }

        return throwError(() => ({
          message: errorMessage,
          status: error.status,
          error: error.error
        }));
      })
    );
  }
}
