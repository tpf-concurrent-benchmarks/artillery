# HTTP Load Testing with Artillery

## Objective

The project contains a set of load tests for the HTTP polls API. The tests are written using the Artillery load testing toolkit.

## Requirements

- [Docker](https://www.docker.com/)

## Commands

### Startup

- `make setup`: Sets up everything needed for the application to run.
- `make build`: Builds the Docker image.

### Run

- `make test_load_prod`: Runs the load test