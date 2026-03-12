Feature: Équilibrage tours vs unités

  Scenario: Le canon tue un archer en un coup
    Given une tour "cannon_tow" sans bonus de forge
    And un "archer" ennemi sans bonus de forge
    When la tour tire sur l'unité
    Then l'unité devrait mourir en 1 tir

  Scenario: Le canon tue un milicien en deux coups
    Given une tour "cannon_tow" sans bonus de forge
    And un "militia" ennemi sans bonus de forge
    When la tour tire sur l'unité
    Then l'unité devrait mourir en 2 tirs

  Scenario: Le canon ne cible pas les unités volantes
    Given une tour "cannon_tow" qui cible "ground"
    And un "griffon" ennemi volant
    Then la tour ne devrait pas pouvoir cibler l'unité

  Scenario: La tour archer cible les unités volantes
    Given une tour "archer_tower" qui cible "both"
    And un "griffon" ennemi volant
    Then la tour devrait pouvoir cibler l'unité

  Scenario: La tour archer cible les unités au sol
    Given une tour "archer_tower" qui cible "both"
    And un "militia" ennemi au sol
    Then la tour devrait pouvoir cibler l'unité
