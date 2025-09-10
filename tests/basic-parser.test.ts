import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z, ZodType } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const TEST_ONE_PATH = path.join(__dirname, "./data/testone.csv");
const TEST_TWO_PATH = path.join(__dirname, "./data/testtwo.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

const RowSchema = z.tuple([z.string().min(1), z.string().regex(/^\d+$/)]);

test("parseCSV trims whitespace and preserves extra columns when no schema is provided", async () => {
  const results = await parseCSV(TEST_TWO_PATH);

  // file has 6 lines (see fixture below)
  expect(results).toHaveLength(6);

  // Line 1 in the file has spaces around both fields; they should be trimmed
  expect(results[0]).toEqual(["Dana", "19"]);

  // Line 4 has an extra column; without a schema, we keep all columns
  expect(results[3]).toEqual(["Frank", "27", "Extra"]);

  // Line 2 is just a comma -> two empty strings after split+trim
  expect(results[1]).toEqual(["", ""]);

  // Line 6 is an empty line -> [""] after split
  expect(results[5]).toEqual([""]);
});

test("parseCSV with schema: all rows valid -> returns data and no errors", async () => {
  const results = await parseCSV(TEST_ONE_PATH, RowSchema);

  // With a schema, the return shape is { data, errors }
  expect(Array.isArray(results)).toBe(false);

  const { data, errors } = results as { data: [string, string][], errors: any[] };

  // testone.csv has exactly 3 valid rows (see fixture below)
  expect(data).toHaveLength(3);
  expect(errors).toHaveLength(0);

  // the parsed data should match the trimmed, two-column rows
  expect(data[0]).toEqual(["Alice", "23"]);
  expect(data[1]).toEqual(["Bob", "30"]);
  expect(data[2]).toEqual(["Charlie", "25"]);
});

test("parseCSV with schema: mixed valid/invalid rows -> returns both data and errors with correct row numbers", async () => {
  const results = await parseCSV(TEST_TWO_PATH, RowSchema);
  const { data, errors } = results as {
    data: [string, string][],
    errors: { row: number; raw: string[]; issues: string[] }[]
  };

  // Valid rows in testtwo.csv are lines 1 and 5 (Dana,19) and (Grace,27)
  // (1-based row numbers in the test fixture below)
  expect(data).toEqual([
    ["Dana", "19"],
    ["Grace", "27"],
  ]);

  // Invalid rows should be: 2 (","),
  // 3 ("Eve, notanumber"), 4 ("Frank,27,Extra"), 6 (empty line)
  expect(errors.map(e => e.row)).toEqual([2, 3, 4, 6]);

  // Each error should include at least one issue message and the raw row
  for (const err of errors) {
    expect(Array.isArray(err.raw)).toBe(true);
    expect(err.issues.length).toBeGreaterThan(0);
  }
});