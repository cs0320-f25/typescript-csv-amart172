# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

1. We should allow the caller to specify whether or not their first row is headers or part of the data.
2. We should ensure that we properly handle fields with commas within.
3. We should have some functionality that can associate fields with the proper header/column to deal with empty columns.
4. We could consider adding fields to our arrays so information can be handles with ease. 

- #### Step 2: Use an LLM to help expand your perspective.

Best LLM suggestions were:
1. Add custom delimiters
2. Type conversion options
3. Error reporting
4. Handle files with different encoding (UTF-8, UTF-16) although I am still not super clear on what that means.
5. As I was thinking, lots of support for quotes/commas/delimiters within fields.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    Functionality
    1. Definitely adding in handling for headers. This could feed into extensibility aspects of field handling as well.
    2. Support for double quotes/empty fields/extra commas or anything else which could be confusing.

    Extensibility
    1. Error handling could be better, with specific error messages that make fixes on the caller's end easy.
    2. Allow for types by fields and custom delimiters so that different csvs can be input. This could also feed into supporting different encoding types. 

    User Story:

    User Story 1/2: Handling headers and double quotes
    As a user of the CSV parser, I am able to indicate whether the first row contains headers so that I can easily map values to field names without writing extra logic. I also am able to parse files containing double quotes, empty fields or extra commas without data loss. 

    Acceptance Criteria:
        The user can specify that the first row should be treated as headers.
        Parsed results use header values as field keys when headers are enabled.
        If headers are disabled, the first row is returned as normal data.
        Quoted fields are preserved correctly, even when they contain commas.
        Empty fields are parsed as empty strings, not dropped.
        Rows with extra commas are parsed consistently without breaking column alignment.

    User Story 3/4: Configurable and reliable parsing

        As a user of the CSV parser, I am able to configure parsing options such as field types, delimiters, and encoding, and receive clear error messages when parsing fails, so that I can work with a wide variety of CSV formats and quickly fix issues when they occur.

    Acceptance Criteria:

        The parser accepts configuration for custom delimiters like these (., ,, ;, |).
        The parser supports different file encodings.
        The parser allows field type validation.
        Parsing errors include descriptive messages that specify things like row number and cause (e.g., mismatched column count, invalid quoting).
        The parser does not silently fail or produce incorrect results when errors occur.

    My initial ideas were solid, and I think at the base helped with functionality aspects. A lot of this came from carefully reading the documentation as well, to understand at the lowest level what CSV parsers are supposed to do. I also used an LLM to supplement that basic knowledge, asking basic questions like "What is a CSV parsers typical inputs and outputs. I first essentially copied the prompt from the documentation, which worked decently well. Then, I wanted more specific extensibility, so I asked along the lines of "What functions would a great csv parser have". That is where I got ideas that could make it very useful, like custom delimiters, enhanced error reporting, and supporting different encoding types. Error reporting resonated with me specifically, because when I code I tend to get a lot of errors, and helpful messages are huge for me.

### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project:
#### Link to GitHub Repo:  
