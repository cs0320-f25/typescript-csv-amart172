import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");

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

const TEST_CSV = `Name,Age,Major,GPA
Alice,20,Computer Science,3.8
Bob,21,Economics,3.6
Charlie,22,English,3.9`;

test("parseCSV treats the first line as data by default", async () => {
  const results = await parseCSV(TEST_CSV);

  expect(results).toHaveLength(4); // header row + 3 data rows
  expect(results[0]).toEqual(["Name", "Age", "Major", "GPA"]);
  expect(results[1]).toEqual(["Alice", "20", "Computer Science", "3.8"]);
});

// Quoted commas should remain single field
test("parseCSV keeps fields with commas intact", async () => {
  const ROW_WITH_QUOTED = `Caesar,Julius,"veni, vidi, vici"`;
  const results = await parseCSV(ROW_WITH_QUOTED);

  expect(results).toHaveLength(1);
  expect(results[0]).toEqual(["Caesar", "Julius", "veni, vidi, vici"]);
  expect(results[0]).toHaveLength(3); // not 5
});
