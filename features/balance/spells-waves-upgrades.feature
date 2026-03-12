Feature: Sorts, vagues et améliorations

  Scenario: 3 sorts disponibles
    Given les constantes du jeu sont chargées
    Then il y a 3 sorts disponibles

  Scenario: Le sort boule de feu coûte 80
    Given les constantes du jeu sont chargées
    Then le sort "fireball" coûte 80

  Scenario: Le sort soin coûte 50
    Given les constantes du jeu sont chargées
    Then le sort "heal" coûte 50

  Scenario: Le sort hâte coûte 60
    Given les constantes du jeu sont chargées
    Then le sort "haste" coûte 60

  Scenario: 8 types de tours disponibles
    Given les constantes du jeu sont chargées
    Then il y a 8 tours disponibles

  Scenario: La banque génère du revenu passif
    Given les constantes du jeu sont chargées
    Then la tour "bank" a un revenu de 0.8

  Scenario Outline: Bounty territorial = 20% du coût
    Given un "<unit>" ennemi avec un coût de <cost>
    Then le bounty pour l'avoir tué est <bounty>

    Examples:
      | unit     | cost | bounty |
      | griffon  |  240 |     48 |
      | dragon   |  500 |    100 |
