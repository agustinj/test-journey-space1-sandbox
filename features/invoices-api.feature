@api
Feature: Invoices vía API

    Scenario: No se puede crear una orden sin autenticación
    When se intenta crear una orden sin header de autorización
    Then el status code de la respuesta es 401
    And la respuesta incluye el mensaje "Unauthorized"

Scenario: No se puede crear una orden con autorización incorrecta
    When se intenta crear una orden con autorización incorrecta
    Then el status code de la respuesta es 401
    And la respuesta incluye el mensaje "Unauthorized"

# BUG conocido: la API debería rechazar esto con un status 4xx (carrito vacío),
# pero actualmente devuelve 201 y persiste una orden con total 0.
# Reportado a Dave — este escenario debe seguir fallando hasta que se corrija.
Scenario: Crear una orden con el carrito vacío debe ser rechazado
    When se intenta crear una orden con el carrito vacío
    Then el status code de la respuesta es 422