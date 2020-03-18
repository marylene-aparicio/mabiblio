import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }
  
  // Initiation du formulaire
  ngOnInit() {
    this.initForm();
  }

  // Creation du formulaire avec des champs requis
  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  // Gestion de la soumission du formulaire
  onSubmit() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    // Si tout se passe bien redirection
    this.authService.signInUser(email, password).then(
      () => {
        this.router.navigate(['/books']);
      },
      // Sinon affichage du message d'erreur retourné par Firebase
      (error) => {
        this.errorMessage = error;
      }
    )
  }
}
