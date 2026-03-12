Feature: Économie et income

  Scenario: Income de base est 2/s
    Given les constantes du jeu sont chargées
    Then l'income de base est 2.0

  Scenario Outline: Bounty = 20% du coût de l'unité tuée
    Given un "<unit>" ennemi avec un coût de <cost>
    Then le bounty pour l'avoir tué est <bounty>

    Examples:
      | unit     | cost | bounty |
      | militia  |   20 |      4 |
      | archer   |   40 |      8 |
      | knight   |  100 |     20 |
      | catapult |  200 |     40 |
      | dragon   |  500 |    100 |
      | titan    | 1000 |    200 |

  Scenario: La forge armes niveau 0 coûte 60
    Given les constantes du jeu sont chargées
    Then la forge "weapon" au niveau 0 coûte 60

  Scenario: La forge armes niveau 1 coûte 96
    Given les constantes du jeu sont chargées
    Then la forge "weapon" au niveau 1 coûte 96

  Scenario: La forge armes niveau 2 coûte 153
    Given les constantes du jeu sont chargées
    Then la forge "weapon" au niveau 2 coûte 153
