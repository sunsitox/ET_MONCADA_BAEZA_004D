import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/interfaces/users';

@Component({
  selector: 'app-mod-pass',
  templateUrl: './mod-pass.page.html',
  styleUrls: ['./mod-pass.page.scss'],
})
export class ModPassPage implements OnInit {

  newPassword: string = "";
  confirmPassword: string = '';
  email: string = ''; // Variable para almacenar el correo extraído

  userId: string = ''; // ID del usuario actual
  user: Partial<Users> = {}; // Almacena los datos actuales y modificados del usuario
  isLoading: boolean = true; // Indicador de carga
  isUpdating: boolean = false; // Indicador de actualización

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Extraer el email desde la URL
    this.email = this.route.snapshot.paramMap.get('email') || ''; // Obtener el parámetro 'email'

    console.log('Correo obtenido de la URL:', this.email);

    if (this.email) {
      this.authService.GetUserByEmail(this.email).subscribe(
        (data: any) => {
          this.userId = data[0].id; // Obtén el ID del usuario
          console.log('ID del usuario obtenido:', data[0].id);
          this.loadUserData(); // Llama al método ahora que tenemos el ID
        },
        (error) => {
          console.error('Error al obtener el usuario por email:', error);
        }
      );
    } else {
      console.error('El email no está presente en la URL.');
    }
  }

  loadUserData() {
    console.log(this.newPassword)

    this.authService.GetUsuarioById(this.userId).subscribe(
      (data: Users) => {
        this.user = {
          username: data.username,
          password: this.newPassword,
          email: data.email,
          rut: data.rut,
          img: data.img,
        };
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar los datos del usuario:', error);
        this.isLoading = false;
      }
    );
  }

  // Guardar los cambios en el perfil
  saveChanges() {
    this.isUpdating = true;
  
    // Asegúrate de que el valor de `newPassword` sea el asignado
    if (this.newPassword.trim() !== '') {
      this.user.password = this.newPassword; // Actualiza la propiedad `password`
    } else {
      console.error('La nueva contraseña está vacía. Asegúrate de ingresar una contraseña válida.');
      alert('Por favor, ingrese una nueva contraseña.');
      this.isUpdating = false;
      return; // No continuar si `newPassword` está vacía
    }
  
    console.log('Datos del usuario actualizados:', this.user);
  
    this.authService.UpdateUsuarioPerfil(this.userId, this.user).subscribe(
      (response) => {
        console.log('Perfil actualizado correctamente:', response);
        this.isUpdating = false;
        alert('Perfil actualizado correctamente.');
        // Navegar de vuelta al perfil o a otra página, según la lógica
        this.router.navigate(['/menu-inicio']);
      },
      (error) => {
        console.error('Error al actualizar el perfil:', error);
        this.isUpdating = false;
        alert('Error al actualizar el perfil. Intenta de nuevo más tarde.');
      }
    );
  }


}
