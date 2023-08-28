import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Componente1Component } from './componente1/componente1.component';
//cosa del carrito:
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
//
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [Componente1Component],
    exports: [Componente1Component],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [MatBadgeModule, MatButtonModule, MatIconModule, RouterModule, IonicModule, FormsModule, CommonModule]
})

export class ComponentsModule {
    hidden = false;
    toggleBadgeVisibility() {
        this.hidden = !this.hidden;
    }
}