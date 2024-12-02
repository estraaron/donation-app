1\. Crear un Price sin un Producto Preexistente
-----------------------------------------------

### Ruta

http

```
`POST https://api.stripe.com/v1/prices`
```

### Campos Básicos

| Campo | Tipo | Obligatorio | Descripción |
| --- | --- | --- | --- |
| `unit_amount` | entero | Sí | Cantidad en la menor unidad de la moneda (p. ej., centavos para USD). |
| `currency` | string | Sí | Código de moneda (ej., `usd`, `eur`). |
| `recurring[interval]` | string | No (para one-time) / Sí (para recurring) | Intervalo para pagos recurrentes (`day`, `week`, `month`, `year`). |
| `product_data[name]` | string | Sí | Nombre del producto asociado al precio (puede ser algo genérico). |
| `nickname` | string | No | Un nombre opcional para identificar el precio (ej., "Donación Mensual"). |
| `metadata` | objeto | No | Datos adicionales personalizados (ej., `{ "tipo_donacion": "recurring" }`). |

* * * * *

### Ejemplo: Donación Única (One-Time)

```
`POST https://api.stripe.com/v1/prices
Authorization: Bearer sk_test_...
Content-Type: application/x-www-form-urlencoded

unit_amount=1000
currency=usd
product_data[name]=Donacion
nickname=Donacion Unica`
```

### Ejemplo: Donación Recurrente

```

`POST https://api.stripe.com/v1/prices
Authorization: Bearer sk_test_...
Content-Type: application/x-www-form-urlencoded

unit_amount=5000
currency=usd
product_data[name]=Donacion Recurrente
recurring[interval]=month
nickname=Donacion Mensual`

```
* * * * *

2\. Retrieve (Obtener un Price)
-------------------------------

### Ruta

http

```
`GET https://api.stripe.com/v1/prices/{price_id}`
```

### Parámetros

| Campo | Tipo | Obligatorio | Descripción |
| --- | --- | --- | --- |
| `price_id` | string | Sí | El ID del precio que deseas consultar. |

### Ejemplo

```
`GET https://api.stripe.com/v1/prices/price_12345
Authorization: Bearer sk_test_...`
```

* * * * *

3\. Update (Actualizar un Price)
--------------------------------

> Nota: Stripe no permite actualizar `unit_amount`, `currency` ni `recurring[interval]` en un `Price` ya creado. Solo puedes actualizar información descriptiva como `nickname` o `metadata`.

### Ruta

http

```
`POST https://api.stripe.com/v1/prices/{price_id}`
```

### Campos Actualizables

| Campo | Tipo | Obligatorio | Descripción |
| --- | --- | --- | --- |
| `nickname` | string | No | Un nuevo nombre descriptivo para el precio (ej., "Donación Anual"). |
| `metadata` | objeto | No | Datos adicionales personalizados (p. ej., `{ "updated_by": "admin" }`). |

### Ejemplo

```
`POST https://api.stripe.com/v1/prices/price_12345
Authorization: Bearer sk_test_...
Content-Type: application/x-www-form-urlencoded

nickname=Nueva Donacion Mensual
metadata[updated_by]=admin`
```

* * * * *

Notas Adicionales
-----------------

1.  Donación Única (One-Time):

    -   No incluye el campo `recurring`.
    -   Se puede usar el mismo `product_data[name]` genérico para todas las donaciones únicas.
2.  Donación Recurrente:

    -   Se debe incluir el campo `recurring[interval]`.
    -   Cambiar el valor de `interval` según la frecuencia deseada (`day`, `week`, `month`, `year`).
3.  Para probar en Postman:

    -   Configurar `Authorization` como `Bearer {API_KEY}`.
    -   Establecer `Content-Type` como `application/x-www-form-urlencoded`.
    -   Probar primero con una donación única, luego con una recurrente, y verifica las respuestas.
