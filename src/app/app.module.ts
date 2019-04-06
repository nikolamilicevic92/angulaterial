import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatSelectModule,
  MatInputModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatCardModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTabsModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatListModule
} from '@angular/material';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersIndexComponent } from './content/pages/users/users-index/users-index.component';
import { UsersCreateComponent } from './content/pages/users/users-create/users-create.component';
import { UsersEditComponent } from './content/pages/users/users-edit/users-edit.component';
import { UsersShowComponent } from './content/pages/users/users-show/users-show.component';
import { LoginComponent } from './content/pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './content/widgets/navigation/navigation.component';
import { HomeComponent } from './content/pages/home/home.component';
import { DeleteUserDialogComponent } from './content/widgets/delete-user-dialog/delete-user-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersIndexComponent,
    UsersCreateComponent,
    UsersEditComponent,
    UsersShowComponent,
    LoginComponent,
    NavigationComponent,
    HomeComponent,
    DeleteUserDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // Angular Material Modules
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  /**
   * When creating components through MatDialog we need to register them in entryComponents
   * array as well.
   */
  entryComponents: [
    DeleteUserDialogComponent,
  ]
})
export class AppModule { }
