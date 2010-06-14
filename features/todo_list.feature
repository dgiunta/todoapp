Feature: To-Do List
  In order to know what I have to do in the near future
  As a user
  I want to see all todos sortable within a single list

  Scenario: Viewing the list of todos
    Given the following todos:
      | Clean the kitty litter | finished |
      | Wash the dishes        | pending  |
      | Take a shower          | pending  |
    When I go to the todos page
    Then I should see the following content and elements:
      | Clean the kitty litter | ul.todos li:nth-child(1) |
      | Wash the dishes        | ul.todos li:nth-child(2) |
      | Take a shower          | ul.todos li:nth-child(3) |
    And I should see the following elements:
      | ul.todos li:nth-child(1) input[checked]         |
      | ul.todos li:nth-child(2) input:not( [checked] ) |
      | ul.todos li:nth-child(3) input:not( [checked] ) |
  
  
