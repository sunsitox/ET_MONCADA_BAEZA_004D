import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importamos ActivatedRoute
import { AuthService } from 'src/app/services/auth.service';
import { Tokens } from 'src/interfaces/users';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  token: string = '';
  email: string = '';
  isValid: boolean = false;
  newPassword: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute, // Inyectamos ActivatedRoute
    private router: Router
  ) { }

  datos: Tokens = {
    email: '',
    token: '',
    isValid: true,
  };

  ngOnInit() {
    // Recuperar parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'] || ''; // Recupera el token
      this.email = params['email'] || ''; // Recupera el correo electrónico
      this.isValid = params['isValid'] === 'true'; // Recupera isValid (como booleano)

      // Debug: Muestra los parámetros recuperados
      console.log('Token:', this.token);
      console.log('Email:', this.email);
      console.log('isValid:', this.isValid);

      this.datos.email = this.email;
      this.datos.token = this.token;
      this.datos.isValid = this.isValid;

      this.guardar()

      this.authService.GetUserByEmail(this.email).subscribe(response =>{
        console.log(response)
      })
    });
  }

  resetPassword() {
    let token
    this.route.queryParams.subscribe((params) => {
      token = params['token'] || '';
    })

    if (token === this.token && this.isValid){
      this.isValid = true
      console.log(this.isValid)
      console.log(this.email)
      this.authService.changePassword(this.email, this.newPassword).subscribe(response => {
        console.log(response)
      })
    }else{
      this.isValid = false
      console.log(this.isValid)
    }

  }
 

  modifPassword(){
    this.router.navigate([`/mod-pass/${this.email}`]);
  }

  guardar() {
    this.authService.guardarToken(this.datos).subscribe(
      (response) => {
        console.log("Respuesta del servidor:", response);

        this.datos.token = response.token; // Almacenar el token recibido
      }
    );
  }


}