Feature: Économie et income

  Scenario: Income de base est 2/s
    Given les constantes du jeu sont chargées
    Then l'income de base est 2.0

  Scenario Outline: Bounty = 20% du coût de l'unité tuée
    Given un "<unit>" ennemi avec un coût de <cost>
    Then le bounty pour l'avoir tué est <bounty>

    Examples:
      | unit     | cost | bounty |
      | militia  |   10 |      2 |
      | archer   |   20 |      4 |
      | knight   |   50 |     10 |
      | catapult |  100 |     20 |
      | dragon   |  250 |     50 |
      | titan    |  500 |    100 |

  Scenario: La forge armes niveau 0 coûte 60
    Given les constantes du jeu sont chargées
    Then la forge "weapon" au niveau 0 coûte 60

  Scenario: La forge armes niveau 1 coûte 96
    Given les constantes du jeu sont chargées
    Then la forge "weapon" au niveau 1 coûte 96

  Scenario: La forge armes niveau 2 coûte 153
    Given les constantes du jeu sont chargées
    Then la forge "weapon" au niveau 2 coûte 153
