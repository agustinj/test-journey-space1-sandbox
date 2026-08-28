@api
Feature: Autenticación vía API

  Scenario: Login exitoso devuelve un token válido
    When se hace login con email "customer@practicesoftwaretesting.com" y password "welcome01"
    Then el status code de la respuesta es 200
    And la respuesta incluye un "access_token" no vacío
    And el "token_type" es "bearer"
    And "expires_in" es un valor numérico