# Favorite Profiles Specification

## Purpose

Allow users to save GitHub profiles to localStorage and view/manage their saved favorites across page refreshes.

## Requirements

### Requirement: Save Favorite

The system MUST allow the user to save the currently displayed profile as a favorite.

#### Scenario: Save a profile

- GIVEN a profile is displayed on screen
- WHEN the user clicks the "Save to Favorites" button
- THEN the system MUST store the username in localStorage under a favorites array
- AND update the button to show "Saved" state

#### Scenario: Save duplicate profile

- GIVEN "torvalds" is already in favorites
- WHEN the user tries to save "torvalds" again
- THEN the system MUST NOT add a duplicate entry
- AND show the "Saved" state without changes

### Requirement: View Favorites

The system MUST display a list of saved favorite profiles.

#### Scenario: Load favorites on page refresh

- GIVEN the user has saved favorites: ["torvalds", "gaearon"]
- WHEN the page loads
- THEN the system MUST read from localStorage and display a favorites list with both usernames

#### Scenario: No favorites saved

- GIVEN localStorage has no favorites entry
- WHEN the page loads
- THEN the system MUST display "No favorites yet" in the favorites section

### Requirement: Remove Favorite

The system MUST allow the user to remove a profile from favorites.

#### Scenario: Remove from favorites

- GIVEN "torvalds" is in favorites
- WHEN the user clicks the remove button next to "torvalds"
- THEN the system MUST remove "torvalds" from localStorage
- AND update the favorites list display

### Requirement: Click Favorite to Search

The system MUST allow the user to click a favorite and immediately search that profile.

#### Scenario: Click favorite

- GIVEN "torvalds" is displayed in the favorites list
- WHEN the user clicks "torvalds"
- THEN the system MUST trigger a profile search for "torvalds"
- AND display the profile card