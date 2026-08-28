Feature: Carrito de compras

  Background:
    Given el usuario está en la página de inicio

  Scenario: Agregar un producto al carrito con su precio correcto
    When agrega "Combination Pliers" al carrito
    And visita el carrito
    Then el carrito muestra "Combination Pliers" con su precio unitario correcto

  Scenario: Subir la cantidad de un producto actualiza el subtotal
    When agrega "Combination Pliers" al carrito
    And visita el carrito
    And aumenta la cantidad a 2
    Then el subtotal de "Combination Pliers" es el precio unitario multiplicado por 2

  Scenario: El total del carrito es la suma de los subtotales
    When agrega "Flat-Head Wood Screws" al carrito
    And agrega "Sheet Sander" al carrito
    And visita el carrito
    Then el total del carrito es la suma de los precios de ambos productos

  Scenario: El total del carrito se recalcula al eliminar un producto
    When agrega "Flat-Head Wood Screws" al carrito
    And agrega "Sheet Sander" al carrito
    And visita el carrito
    And elimina "Sheet Sander" del carrito
    Then el total del carrito es el precio del producto restante

  Scenario: No se puede acceder al checkout sin productos en el carrito
    Given el usuario está en la página de inicio
    Then no debería ver el ícono del carrito en la navegación

  Scenario: No se puede avanzar al checkout si el carrito queda vacío
    When agrega "Flat-Head Wood Screws" al carrito
    And visita el carrito
    And elimina "Flat-Head Wood Screws" del carrito
    Then debería ver el mensaje "The cart is empty. Nothing to display."
    And no debería poder avanzar al checkout