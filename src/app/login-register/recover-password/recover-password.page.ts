import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Tokens } from 'src/interfaces/users';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage {
  datos: Tokens = {
    email: '',
    token: '',
    isValid: true,
  };

  constructor(private authService: AuthService) {}

  sesendRecoveryEmail() {
    console.log("Datos que se enviarán:", this.datos);
  
    this.authService.sendRecoveryEmail(this.datos).subscribe(
      (response) => {
        console.log("Respuesta del servidor:", response);
  
        this.datos.token = response.token; // Almacenar el token recibido
  
        this.authService.guardarToken(this.datos).subscribe(
          () => {
            alert("¡Correo de recuperación enviado y token guardado!");
          },
          (error) => {
            console.error("Error al guardar el token:", error);
          }
        );
      },
      (error) => {
        console.error("Error al enviar el correo:", error);
        alert("Error al enviar el correo.");
      }
    );
  }

  // Método para verificar tokens guardados (opcional)
  verificarTokens() {
    this.authService.gg().subscribe(
      (tokens) => {
        console.log('Tokens guardados:', tokens);
      },
      (error) => {
        console.error('Error al obtener tokens:', error);
      }
    );
  }
}