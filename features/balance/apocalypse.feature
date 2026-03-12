Feature: Apocalypse

  Scenario: L'apocalypse coûte 300 or
    Given les constantes du jeu sont chargées
    Then le coût de l'apocalypse est 300

  Scenario: L'apocalypse réduit l'income de 30%
    Given les constantes du jeu sont chargées
    Then la pénalité d'income de l'apocalypse est 0.30

  Scenario: Un joueur avec 10/s d'income perd 30% après apocalypse
    Given un joueur avec un income de 10
    When il déclenche l'apocalypse
    Then son income est de 7
