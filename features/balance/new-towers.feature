Feature: Nouvelles tours et mécaniques

  Scenario: Tour de Glace cible sol et air
    Given une tour "ice_tower" qui cible "both"
    And un "griffon" ennemi volant
    Then la tour devrait pouvoir cibler l'unité

  Scenario: Tour Anti-air ne cible que les volants
    Given une tour "antiair" qui cible "air"
    And un "militia" ennemi au sol
    Then la tour ne devrait pas pouvoir cibler l'unité

  Scenario: Tour Anti-air cible les volants
    Given une tour "antiair" qui cible "air"
    And un "griffon" ennemi volant
    Then la tour devrait pouvoir cibler l'unité

  Scenario: Canon ne cible pas les volants
    Given une tour "cannon_tow" qui cible "ground"
    And un "dragon" ennemi volant
    Then la tour ne devrait pas pouvoir cibler l'unité

  Scenario: Tour Archer tue un milicien en 7 tirs
    Given une tour "archer_tower" sans bonus de forge
    And un "militia" ennemi sans bonus de forge
    When la tour tire sur l'unité
    Then l'unité devrait mourir en 7 tirs

  Scenario: Tour Tesla tue un milicien en 3 tirs
    Given une tour "tesla" sans bonus de forge
    And un "militia" ennemi sans bonus de forge
    When la tour tire sur l'unité
    Then l'unité devrait mourir en 3 tirs

  Scenario: Tour de Glace tue un milicien en 12 tirs
    Given une tour "ice_tower" sans bonus de forge
    And un "militia" ennemi sans bonus de forge
    When la tour tire sur l'unité
    Then l'unité devrait mourir en 12 tirs
