import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm!: FormGroup;
  hidePassword=true;
  constructor(private fb: FormBuilder,
    private authService:AuthService,
    private snackbar:MatSnackBar,
    private router:Router
  ) { 
    this.signUpForm = this.fb.group({
      name: [null,[Validators.required]],
      email: [null,[Validators.required, Validators.email]],
      password: [null,[Validators.required]],
      confirmPassword: [null,[Validators.required]],
    })
  }

  togglePasswordVisibilty(){
    this.hidePassword = !this.hidePassword;
  }
  onSubmit(){
    console.log(this.signUpForm.value);
   const password =this.signUpForm.get("password")?.value;
   const confirmPassword =this.signUpForm.get("confirmPassword")?.value;
   if(password !==confirmPassword){
    this.snackbar.open("Password do not match","Close",{duration:5000,panelClass:"error-snackbar"});
    return;
   }

   this.authService.signup(this.signUpForm.value).subscribe((res)=>{
    console.log(res);
    if(res.id != null){
      this.snackbar.open("Signup successfully","Close",{duration: 5000});
      this.router.navigateByUrl("/login");
    }
    else{
      this.snackbar.open("Sign up failed. Try again","Close",{duration:5000,panelClass:"error-snackbar"});
    }
   })

  }
}
