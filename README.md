# market-inventory-app
An application to interface with the EVE SDE via a postgres database, designed to help manage inventory and cost analysis.

# Configuration
Must manually download the latest sde from fuzzworks. Uses the postgres dump, NOT the schema version. It must be placed inside the pgdb folder and unzipped (so it ends with `.dmp`), and the file `setup.sh` must point at the dump.

# Planning
Lets establish some key components to get in place before setting major goals for the application.
1. COMPLETE - Using Docker, spin up a postgres database which generates from the compressed Eve Static Data Extract (SDE).
2. Initially, lets keep away from the EVE API, which we could use to acquire real-time market prices. Instead, 
we can generate text nicely formatted for use with Janice. Lets do this with a locally-hosted Express web application.
  - Given the name of a first-tier industrial product (meaning all of its components are raw materials), generate text to copy to Janice for a single run of the product.
  - Reading station values from a file, be able to generate the data for single-run, X-runs, or X-hours of runs.
  - Do the same but for higher-tier industrial product.