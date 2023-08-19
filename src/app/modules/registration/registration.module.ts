import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { RegistrationRoutingModule } from './registration-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../shared/shared.module';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [RegistrationFormComponent],
  imports: [
    RegistrationRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    SharedModule,
    CardModule,
    TabViewModule,
    PasswordModule,
    ButtonModule,
    CalendarModule,
    InputTextareaModule,
  ],
})
export class RegistrationModule {}
