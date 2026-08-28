Feature: Smoke test del framework

  Scenario: Cucumber está conectado
    Given tengo el framework configurado
    When ejecuto un paso de prueba
    Then debería ver que todo funciona