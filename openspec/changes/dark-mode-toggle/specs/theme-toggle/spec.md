# Theme Toggle Specification

## Purpose

Allow users to switch between dark and light themes. The preference persists in localStorage and respects the OS preference on first visit.

## Requirements

### Requirement: Theme Detection

The system MUST detect the user's preferred theme on initial load using `prefers-color-scheme`, unless a saved preference exists in localStorage.

#### Scenario: First visit with OS dark preference

- GIVEN no saved theme in localStorage
- AND the OS reports `prefers-color-scheme: dark`
- WHEN the page loads
- THEN the system MUST set `data-theme="dark"` on the `<html>` element

#### Scenario: First visit with OS light preference

- GIVEN no saved theme in localStorage
- AND the OS reports `prefers-color-scheme: light`
- WHEN the page loads
- THEN the system MUST set `data-theme="light"` on the `<html>` element

#### Scenario: Returning user with saved dark theme

- GIVEN localStorage contains `theme: "dark"`
- WHEN the page loads
- THEN the system MUST set `data-theme="dark"` regardless of OS preference

### Requirement: Theme Toggle

The system MUST provide a button in the header to toggle between dark and light themes.

#### Scenario: Toggle from dark to light

- GIVEN `data-theme="dark"` is set
- WHEN the user clicks the toggle button
- THEN the system MUST change `data-theme` to `light`
- AND update the toggle button icon to indicate dark mode is available

#### Scenario: Toggle from light to dark

- GIVEN `data-theme="light"` is set
- WHEN the user clicks the toggle button
- THEN the system MUST change `data-theme` to `dark`
- AND update the toggle button icon to indicate light mode is available

### Requirement: Theme Persistence

The system MUST persist the user's theme choice in localStorage.

#### Scenario: Persist theme after toggle

- GIVEN the user toggles to light mode
- WHEN the toggle completes
- THEN the system MUST store `theme: "light"` in localStorage

#### Scenario: Theme survives refresh

- GIVEN the user selected dark mode and refreshed the page
- WHEN the page loads
- THEN the system MUST apply dark mode from localStorage

### Requirement: Smooth Transition

The system MUST apply a smooth color transition when switching themes.

#### Scenario: Transition on toggle

- GIVEN the user clicks the theme toggle
- WHEN the theme changes
- THEN the background-color and color properties MUST transition over 0.3s
- AND NOT flash instantly

### Requirement: Anti-Flash

The system MUST set the theme before CSS renders to prevent a flash of the wrong theme.

#### Scenario: No flash on load

- GIVEN a user with `theme: "light"` in localStorage
- WHEN the page loads
- THEN the `<html>` element MUST have `data-theme="light"` before the first paint
- AND the user MUST NOT see a flash of dark theme