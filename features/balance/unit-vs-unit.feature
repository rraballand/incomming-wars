Feature: Équilibrage combat unité vs unité

  Scenario Outline: Dégâts de base sans forge
    Given un "<attacker>" attaquant sans forge
    And un "<defender>" défenseur sans forge
    When l'attaquant frappe le défenseur
    Then le défenseur perd <damage> HP

    Examples:
      | attacker | defender | damage |
      | militia  | archer   |      4 |
      | archer   | militia  |      9 |
      | knight   | militia  |     10 |
      | dragon   | militia  |     38 |
      | titan    | militia  |     65 |

  Scenario: La charge du chevalier inflige 28 dégâts
    Given un "knight" avec chargeDmg 28
    When le chevalier charge
    Then les dégâts de charge sont 28

  Scenario: La charge du dragon inflige 55 dégâts
    Given un "dragon" avec chargeDmg 55
    When le chevalier charge
    Then les dégâts de charge sont 55

  Scenario: Le titan a les plus gros dégâts de charge
    Given un "titan" avec chargeDmg 85
    When le chevalier charge
    Then les dégâts de charge sont 85
