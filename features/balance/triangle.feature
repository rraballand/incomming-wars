Feature: Triangle tactique (pierre-feuille-ciseaux)

  Scenario Outline: Bonus x1.5 sur matchup favorable
    Given un "<strong>" attaquant sans forge
    And un "<weak>" défenseur sans forge
    When l'attaquant frappe le défenseur
    Then les dégâts sont multipliés par 1.5

    Examples:
      | strong  | weak    |
      | militia | knight  |
      | archer  | militia |
      | knight  | archer  |

  Scenario: Pas de bonus triangle militia vs archer
    Given un "militia" attaquant sans forge
    And un "archer" défenseur sans forge
    When l'attaquant frappe le défenseur
    Then les dégâts ne sont PAS multipliés

  Scenario: Pas de bonus triangle archer vs knight
    Given un "archer" attaquant sans forge
    And un "knight" défenseur sans forge
    When l'attaquant frappe le défenseur
    Then les dégâts ne sont PAS multipliés
