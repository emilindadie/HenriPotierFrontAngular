Feature: Go to the home
  Display the title

  Scenario: Home Page
    Given I am on the home page
    When I do nothing
    Then I should see home page title

  Scenario: Load Article
    Given I am on the home page
    When I do nothing
    Then I should see articles loaded

  Scenario: Navigate to panier
    Given I am on the home page
    When I click on panier menu button
    Then I should see panier page title