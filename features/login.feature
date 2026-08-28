Feature: Login de usuario

  @critical
  Scenario: Login exitoso con credenciales válidas
    Given el usuario está en la página de login
    When ingresa credenciales válidas
    Then accede a su cuenta