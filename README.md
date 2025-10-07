# market-inventory-app
An application to interface with the EVE SDE via a postgres database, designed to help manage inventory and cost analysis.

# Configuration
Must manually download the latest sde from fuzzworks. Uses the postgres dump, NOT the schema version. It must be placed inside the pgdb folder and unzipped (so it ends with `.dmp`), and the file `setup.sh` must point at the dump.

# Planning
Lets establish some key components to get in place before setting major goals for the application.
1. COMPLETE - Using Docker, spin up a postgres database which generates from the compressed Eve Static Data Extract (SDE).
2. Initially, lets keep away from the EVE API, which we could use to acquire real-time market prices. Instead, 
we can generate text nicely formatted for use with Janice. Lets do this with a locally-hosted Express web application.
  - (a) DONE Given the name of a first-tier industrial product (meaning all of its components are raw materials), generate text to copy to Janice for a single run of the product.
  - (b) Reading station values from a file, be able to generate the data for single-run, X-runs, or X-hours of runs.
  - (c) Do the same but for higher-tier industrial product.

## Planning in more detail: What do we need to test using it?
Lets assemble an unordered collection.
- I am imagining inputting an array of blueprints which I have acquired. Then the output would be all on the page, multiple divs stacked vertically, one per blueprint, to allow me to quickly evaluate them in janice.
  - I would want these to account for ME, station attributes, etc
- I also would like a feature which converts raw materials (eg. Tritanium) into compressed ore amounts, which would make for a much more convenient shopping list. Perhaps this could be its own endpoint, a shopping list combined with number of runs
  - So the endpoints would be something like `/industry/evaluator` and `/industry/shoppinglist`
---
So then, what I need to make that a reality is:
1. The ability to read and utilize blueprint/station attributes from a file. This will probably take some refactoring of the query functions
2. A first-pass function that takes raw materials and converts them into compressed ore. This will require me to develop an algorithm. First idea is do it all at once, but I imagine something more granular would work too.
