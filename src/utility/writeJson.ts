"use server";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

export async function writeJson(obj: Record<string, unknown>) {
  const jsonString = JSON.stringify(obj, null, 2);
  const filePath = path.join(__dirname, "..", "..", "..", "..", "output.json");
  console.log(filePath);
  writeFileSync(filePath, jsonString);
}

export async function readJson() {
  const filePath = path.join(__dirname, "..", "..", "..", "..", "output.json");
  const data = readFileSync(filePath, { encoding: "utf8" });
  const obj = JSON.parse(data);
  return obj;
}
