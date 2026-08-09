# Profile Search Specification

## Purpose

Fetch and display GitHub user profile data via the public GitHub REST API. Users can search any public GitHub username and view profile information and top repositories.

## Requirements

### Requirement: User Search

The system MUST allow the user to enter a GitHub username and trigger a search.

#### Scenario: Search valid user

- GIVEN a user is on the app homepage
- WHEN the user enters "torvalds" in the search input and submits
- THEN the system MUST fetch `https://api.github.com/users/torvalds`
- AND display the profile card with the returned data

#### Scenario: Search with empty input

- GIVEN the search input is empty
- WHEN the user attempts to submit
- THEN the system MUST NOT make an API call
- AND display a message asking to enter a username

### Requirement: Profile Display

The system MUST display the following fields from the GitHub user response: avatar, name, bio, location, company, blog URL, followers count, following count, and public repos count.

#### Scenario: User with all fields populated

- GIVEN the API returns a user with all fields filled
- WHEN the profile card renders
- THEN the system MUST display avatar, name, bio, location, company, blog, followers, following, and public_repos

#### Scenario: User with null fields

- GIVEN the API returns a user with `bio: null` and `location: null`
- WHEN the profile card renders
- THEN the system MUST display placeholder text (e.g., "No bio available") for null fields
- AND NOT display the literal string "null"

### Requirement: Top Repositories Display

The system MUST fetch and display the top 5 repositories for the searched user, sorted by stars descending.

#### Scenario: User with public repos

- GIVEN the API returns repos for the user
- WHEN the repo list renders
- THEN the system MUST display up to 5 repos with name, description, stars count, and primary language

#### Scenario: User with zero repos

- GIVEN the API returns an empty repos array
- WHEN the repo list renders
- THEN the system MUST display a message: "No public repositories"

### Requirement: Error Handling

The system MUST handle API errors with user-friendly messages.

#### Scenario: User not found

- GIVEN the API returns 404 for a username
- WHEN the response is processed
- THEN the system MUST display: "User '{username}' not found on GitHub"

#### Scenario: Rate limit exceeded

- GIVEN the API returns 403 with rate limit headers
- WHEN the response is processed
- THEN the system MUST display: "GitHub API rate limit reached. Try again later."

#### Scenario: Network error

- GIVEN the fetch request fails due to a network error
- WHEN the error is caught
- THEN the system MUST display: "Network error. Check your connection and try again."

### Requirement: Loading State

The system MUST show a loading indicator while API requests are in flight.

#### Scenario: Loading indicator on search

- GIVEN the user submits a search
- WHEN the fetch is in progress
- THEN the system MUST display a loading spinner or skeleton
- AND hide it when the response arrives