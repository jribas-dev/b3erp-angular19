import { Injectable } from '@angular/core';
import { environment } from '../mocks/enviroment';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, map, throwError } from 'rxjs';

export interface LoginResponse {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  success: boolean;
  message?: string;
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  async loginUser(
    email: string,
    password: string
  ): Promise<ApiResponse<LoginResponse>> {
    const url = `${this.apiUrl}/auth/login`;

    try {
      const response = await firstValueFrom(
        this.http.post<LoginResponse>(url, { email, password }).pipe(
          map((data) => ({
            success: true,
            status: 200,
            message: 'Login realizado com sucesso',
            data,
          })),
          catchError((error) => {
            const status = error.status || 500;
            const message = error.error?.message || 'Erro ao fazer login';
            return throwError(() => ({
              success: false,
              status,
              message,
            }));
          })
        )
      );
      return response;
    } catch (error: any) {
      console.log('Erro ao fazer login:', error);
      return {
        success: false,
        status: error.status || 500,
        message: error.message || 'Erro de conexão ao fazer login',
      };
    }
  }
}
