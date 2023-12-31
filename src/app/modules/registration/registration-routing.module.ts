import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'register',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: RegistrationFormComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}
