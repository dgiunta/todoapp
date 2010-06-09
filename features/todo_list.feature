Feature: To-Do List
  In order to know what I have to do in the near future
  As a user
  I want to see all todos sortable within a single list

  Scenario: Viewing the list of todos
    Given the following todos:
      | Clean the kitty litter |
      | Wash the dishes        |
      | Take a shower          |
    When I go to the todos page
    Then I should see the following:
      | Clean the kitty litter |
      | Wash the dishes        |
      | Take a shower          |
  
  
