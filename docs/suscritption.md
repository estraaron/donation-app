# Flujo para una Donación Recurrente

## 1. Crear el Cliente (`Customer`)
El cliente es el donador. Este paso se realiza igual que en las donaciones de una sola vez.

### Request
**Endpoint:**
```
POST https://api.stripe.com/v1/customers
```
**Body:**
```json
{
  "email": "donador@example.com",
  "name": "Nombre del Donador",
  "metadata": {
    "tipo_donacion": "recurrente"
  }
}
```

---

## 2. Configurar el Producto y Precio (`Price`)
Define un `price` asociado a un producto con recurrencia, especificando el intervalo (por ejemplo, mensual o anual).

### Request
**Endpoint:**
```
POST https://api.stripe.com/v1/prices
```
**Body:**
```json
{
  "unit_amount": 5000,
  "currency": "usd",
  "recurring": {
    "interval": "month"
  },
  "product_data": {
    "name": "Donación Mensual"
  }
}
```

---

## 3. Guardar el Método de Pago (`SetupIntent`) (Opcional)
Permite guardar un método de pago para realizar cobros futuros. Esto puede ser opcional si ya existe un método de pago registrado.

### Request
**Endpoint:**
```
POST https://api.stripe.com/v1/setup_intents
```
**Body:**
```json
{
  "customer": "cus_xxxxx"
}
```
> Asegúrate de capturar el método de pago usando el cliente de Stripe Elements o similar.

---

## 4. Crear la Suscripción (`Subscription`)
Utiliza el cliente y el precio configurados para crear una suscripción recurrente.

### Request
**Endpoint:**
```
POST https://api.stripe.com/v1/subscriptions
```
**Body:**
```json
{
  "customer": "cus_xxxxx",
  "items": [
    {
      "price": "price_xxxxx"
    }
  ]
}
```

---

## 5. Manejo del Estado Inicial de la Suscripción
Cuando se crea una suscripción, esta puede tener diferentes estados:
- **`active`:** El cliente fue cobrado con éxito.
- **`incomplete`:** El cliente necesita completar un pago pendiente.
- **`trialing`:** Si configuraste un período de prueba.

Puedes consultar el estado de la suscripción:

### Request
**Endpoint:**
```
GET https://api.stripe.com/v1/subscriptions/sub_xxxxx
```

---

## Resumen del Flujo
1. **Crear el cliente**: Registro del donador.
2. **Configurar el precio**: Definir la cantidad y el intervalo de recurrencia.
3. **Guardar el método de pago** (opcional): Asegurar un método para futuros cobros.
4. **Crear la suscripción**: Asociar cliente y precio para pagos recurrentes.
5. **Validar el estado inicial**: Verificar que la suscripción esté activa.

Este flujo asegura que las donaciones recurrentes se configuren y procesen correctamente. 🚀

## subscription and stripe setUp details

**1\. Guardar el método de pago asociado al cliente (SetupIntent + PaymentMethod)**
-----------------------------------------------------------------------------------

Stripe vincula el método de pago automáticamente al cliente una vez que confirmas el **SetupIntent** en el frontend usando el `client_secret`. Esto lo haces con **Stripe.js**.

### **Código en el frontend para confirmar el SetupIntent y obtener el PaymentMethod:**

typescript

Copy code

`async confirmSetupIntent(clientSecret: string) {
  const stripe = await loadStripe('tu-clave-publica');

  const result = await stripe?.confirmCardSetup(clientSecret);
  if (result?.setupIntent?.status === 'succeeded') {
    // El método de pago está listo y vinculado al cliente
    console.log('SetupIntent confirmado:', result.setupIntent);
    return result.setupIntent.payment_method; // Retorna el PaymentMethod ID
  } else {
    throw new Error('Error confirmando el SetupIntent: ' + result?.error?.message);
  }
}`

-   El método de pago (`payment_method`) se vincula automáticamente al `customer` en Stripe después de confirmar el `SetupIntent`. No necesitas hacerlo manualmente.

* * * * *

**2\. Crear la suscripción con el cliente, el precio y el método de pago**
--------------------------------------------------------------------------

Ahora que tienes el **PaymentMethod ID** vinculado al cliente, puedes crear la suscripción usando el endpoint `/subscriptions` de Stripe.

### **Petición HTTP para crear la suscripción:**

typescript

Copy code

`createSubscription(customerId: string, priceId: string, paymentMethodId: string) {
  return this.http.post('/v1/subscriptions', {
    customer: customerId,
    items: [{ price: priceId }], // Usa el ID del precio creado previamente
    default_payment_method: paymentMethodId, // Vincula el PaymentMethod a la suscripción
    expand: ['latest_invoice.payment_intent'], // Expande el PaymentIntent para verificar el estado
  });
}`

#### **Nota sobre parámetros importantes:**

-   `customer`: Es el ID del cliente (`cus_...`).
-   `items`: Aquí defines el plan recurrente mediante el ID del `price` que tiene la propiedad `recurring.interval`.
-   `default_payment_method`: Establece el método de pago predeterminado para esta suscripción.
-   `expand`: Expande el `payment_intent` para que puedas confirmar y manejar errores fácilmente si es necesario.

* * * * *

**3\. Manejar la respuesta de Stripe (suscripción creada):**
------------------------------------------------------------

Cuando Stripe crea la suscripción, puede incluir un `payment_intent` en su última factura (`latest_invoice.payment_intent`). Esto es importante para manejar pagos fallidos o pendientes.

### **Respuesta esperada:**

json

Copy code

`{
  "id": "sub_12345",
  "status": "active",
  "latest_invoice": {
    "payment_intent": {
      "id": "pi_12345",
      "status": "succeeded"
    }
  }
}`

-   Si `payment_intent.status` es `succeeded`, la suscripción está activa.
-   Si no, debes manejar el estado (`requires_action`, `requires_payment_method`, etc.) para resolver problemas de pago.

* * * * *

**4\. Código completo del flujo**
---------------------------------

### **Efecto para confirmar el SetupIntent y crear la suscripción:**

typescript

Copy code

`confirmSetupAndCreateSubscription$ = createEffect(() =>
  this.actions$.pipe(
    ofType(confirmSetupIntentAndCreateSubscription),
    mergeMap(({ clientSecret, customerId, priceId }) =>
      from(this.confirmSetupIntent(clientSecret)).pipe(
        mergeMap((paymentMethodId) =>
          this.paymentService.createSubscription(customerId, priceId, paymentMethodId).pipe(
            map((subscription) =>
              createSubscriptionSuccess({ subscription })
            ),
            catchError((error) => of(createSubscriptionFailure({ error })))
          )
        ),
        catchError((error) => of(confirmSetupIntentFailure({ error })))
      )
    )
  )
);`

### **Acción:**

typescript

Copy code

`export const confirmSetupIntentAndCreateSubscription = createAction(
  '[Payment] Confirm SetupIntent and Create Subscription',
  props<{ clientSecret: string; customerId: string; priceId: string }>()
);`

* * * * *

**5\. Resumen de pasos clave:**
-------------------------------

1.  **Confirma el SetupIntent** con el `client_secret` en el frontend usando `stripe.confirmCardSetup`. Esto vincula el método de pago al cliente automáticamente.
2.  **Obtén el PaymentMethod ID** del SetupIntent confirmado.
3.  **Crea la suscripción** en Stripe vinculando:
    -   El cliente (`customerId`).
    -   El precio (`priceId`).
    -   El método de pago (`payment_method`).
4.  **Maneja la respuesta** de Stripe para verificar el estado de la suscripción.
