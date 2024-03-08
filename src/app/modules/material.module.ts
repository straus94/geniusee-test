import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

const MAT_MODULES = [CommonModule, MatFormFieldModule, MatCheckboxModule, MatSelectModule, MatButtonModule, MatInputModule, MatToolbarModule, MatIconModule];

@NgModule({
  declarations: [],
  imports: MAT_MODULES,
  exports: MAT_MODULES,
})
export class MaterialModule {}
