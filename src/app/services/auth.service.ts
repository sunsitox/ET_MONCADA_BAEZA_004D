import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Users, UserNuevo, Iclase, Tokens } from '../../interfaces/users';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  GetUsuarios(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(`${environment.apiUrl}/usuarios`)
  }

  PostUsuario(newUsuario: UserNuevo): Observable<Users> {
    return this.httpClient.post<Users>(`${environment.apiUrl}/usuarios`, newUsuario);
  }


  GetUserByEmail(email: string): Observable<Users> {
    return this.httpClient.get<Users>(`${environment.apiUrl}/usuarios?email=${email}`);
  }

  GetUserByUsername(username: any): Observable<Users> {
    return this.httpClient.get<Users>(`${environment.apiUrl}/usuarios?username=${username}`);
  }

  // Obtener un usuario por ID
  GetUsuarioById(userId: any): Observable<Users> {
    return this.httpClient.get<Users>(`${environment.apiUrl}/usuarios/${userId}`);
  }

  // Actualizar un usuario por ID
  UpdateUsuario(userId: string, updatedUser: Users): Observable<Users> {
    return this.httpClient.put<Users>(`${environment.apiUrl}/usuarios/${userId}`, updatedUser);
  }

  UpdateUsuarioPerfil(userId: string, updatedFields: Partial<Users>): Observable<any> {
    return this.httpClient.patch(`${environment.apiUrl}/usuarios/${userId}`, updatedFields);
  }

  UpdateUsuarioClases(addClase: Iclase, userId: any): Observable<Users> {
    // Obtenemos el usuario actual para modificar su lista de clases
    return this.httpClient.get<Users>(`${environment.apiUrl}/usuarios/${userId}`).pipe(
      switchMap((usuario) => {
        // Verificamos si el usuario tiene clases, si no, inicializamos el array
        if (!usuario.clases) {
          usuario.clases = [];
        }

        // Añadimos la nueva clase al array de clases
        usuario.clases.push(addClase);

        // Actualizamos solo las clases del usuario
        const payload = { clases: usuario.clases };

        // Usamos PATCH para actualizar únicamente el campo 'clases'
        return this.httpClient.patch<Users>(`${environment.apiUrl}/usuarios/${userId}`, payload);
      })
    );
  }

  login(identifier: string, password: string, isEmail: boolean): Observable<any> {
    const loginEndpoint = isEmail ? `usuarios?email=${identifier}` : `usuarios?username=${identifier}`;
    return this.httpClient.get<any>(`${environment.apiUrl}/${loginEndpoint}&password=${password}`);
  }

  
  
  saveImageToDatabase(userId: any, base64Image: string): Observable<any> {
    const imageData = { img: base64Image };
  
    return this.httpClient.patch(`${environment.apiUrl}/usuarios/${userId}`, imageData);
  }
  
  
  // sendRecoveryEmail(datos: Tokens): Observable<any> {
  //   return this.httpClient.post(`${environment.apiUrl}/passwordResetRequest`, datos);
  // }
  sendRecoveryEmail(datos: Tokens): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/passwordResetRequest`, datos, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Método para guardar el token en el archivo JSON
  // guardarToken(tokenData: Tokens): Observable<Tokens> {
  //   return this.httpClient.post<Tokens>(`${environment.apiUrl}/passwordResetRequest`, tokenData);
  // }
  guardarToken(datos: Tokens): Observable<any> {
    return this.httpClient.post<Tokens>(`${environment.apiUrl}/password-reset`, datos);
  }


  // Método opcional para verificar tokens existentes
  gg(): Observable<Tokens[]> {
    return this.httpClient.get<Tokens[]>(`${environment.apiUrl}/passwordResetRequest`);
  }

  changePassword(email: string, newPassword: string): Observable<any> {
    const body = { email, password: newPassword }; // Datos enviados al servidor
    return this.httpClient.put(`${environment.apiUrl}/usuarios`, body);
  }


  cambiarPassword(email: string, newPassword: string): Observable<any> {
    const body = { email, password: newPassword }; // Datos enviados al servidor
    return this.httpClient.put(`${environment.apiUrl}/usuarios`, body);
  }
}
