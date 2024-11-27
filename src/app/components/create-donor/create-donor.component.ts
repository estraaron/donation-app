import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { createCustomer, updateCustomer } from '../../state/donor/donor.actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-donor',
  standalone: true,
  templateUrl: './create-donor.component.html',
  imports: [FormsModule]
})
export class CreateDonorComponent implements OnInit, OnChanges {
  @Input() customerId: string | null = null;
  @Input() name: string = '';
  @Input() email: string = '';
  @Output() customerSaved = new EventEmitter<void>(); // Notifica al padre cuando se guarda/actualiza

  constructor(private store: Store) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'] || changes['email']) {
      // Asegurarse de que los inputs se asignen al formulario correctamente
      this.name = this.name || '';
      this.email = this.email || '';
    }
  }

  ngOnInit(): void {
    // Si el componente recibe datos por `@Input`, los asignará automáticamente al formulario.
  }

  onSubmit(): void {
    if (this.name && this.email) {
      console.log('datos para el submit', {
        name: this.name,
        email: this.email
      })
      if (this.customerId) {
        // Actualizar cliente
        this.store.dispatch(
          updateCustomer({
            customerId: this.customerId,
            name: this.name,
            email: this.email,
          })
        );
      } else {
        // Crear cliente
        this.store.dispatch(createCustomer({ name: this.name, email: this.email }));
      }
      // Emitir evento indicando que se guardó/actualizó el cliente
      this.customerSaved.emit();
    }
  }
}
