# Search Debounce Specification

## Purpose

Trigger search automatically as the user types, with a configurable debounce delay to avoid excessive API calls.

## Requirements

### Requirement: Debounce Trigger

The system MUST trigger search automatically 500ms after the user stops typing in the search input.

#### Scenario: Search after typing stops

- GIVEN the user types "torvalds" in the search input
- WHEN 500ms pass without further keystrokes
- THEN the system MUST trigger a search for "torvalds"

#### Scenario: Rapid typing does not trigger multiple searches

- GIVEN the user types "t", "o", "r", "v" in quick succession
- WHEN each keystroke arrives within 500ms of the previous
- THEN the system MUST NOT trigger any search until 500ms after the last keystroke
- AND only one search for "torvalds" MUST be triggered

#### Scenario: Empty input does not trigger search

- GIVEN the user clears the search input
- WHEN 500ms pass
- THEN the system MUST NOT make an API call
- AND show the empty state message

### Requirement: Manual Submit Still Works

The system MUST keep the Search button as a manual trigger that bypasses the debounce.

#### Scenario: Submit bypasses debounce

- GIVEN the user types "torvalds" and immediately presses Search
- WHEN the submit event fires
- THEN the system MUST trigger search immediately
- AND cancel any pending debounced search

### Requirement: Debounce Cancellation

The system MUST cancel a pending debounced search if a new keystroke arrives.

#### Scenario: New keystroke cancels pending search

- GIVEN the user types "tor" and 300ms pass
- WHEN the user types "v"
- THEN the system MUST cancel the pending search for "tor"
- AND start a new debounce timer for "torv"