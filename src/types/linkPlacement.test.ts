import { describe, expect, it } from "vitest";
import {
	type LinkPlacement,
	type AppendLinkOptions,
	isAppendLinkOptions,
	normalizeAppendLinkOptions,
	isAppendLinkEnabled,
} from "./linkPlacement";

describe("LinkPlacement", () => {
	describe("isAppendLinkOptions", () => {
		it("should return true for AppendLinkOptions object", () => {
			const options: AppendLinkOptions = {
				enabled: true,
				placement: "newLine",
				requireActiveFile: true,
			};
			expect(isAppendLinkOptions(options)).toBe(true);
		});

		it("should return false for boolean values", () => {
			expect(isAppendLinkOptions(true)).toBe(false);
			expect(isAppendLinkOptions(false)).toBe(false);
		});

		it("should return false for null or undefined", () => {
			expect(isAppendLinkOptions(null as any)).toBe(false);
			expect(isAppendLinkOptions(undefined as any)).toBe(false);
		});
	});

	describe("normalizeAppendLinkOptions", () => {
		it("should normalize AppendLinkOptions and preserve values", () => {
			const options: AppendLinkOptions = {
				enabled: true,
				placement: "afterSelection",
				requireActiveFile: false,
			};
			expect(normalizeAppendLinkOptions(options)).toEqual(options);
		});

		it("should convert true to enabled with default placement", () => {
			const result = normalizeAppendLinkOptions(true);
			expect(result).toEqual({
				enabled: true,
				placement: "replaceSelection",
				requireActiveFile: true,
			});
		});

		it("should convert false to disabled with default placement", () => {
			const result = normalizeAppendLinkOptions(false);
			expect(result).toEqual({
				enabled: false,
				placement: "replaceSelection",
				requireActiveFile: false,
			});
		});
	});

	describe("isAppendLinkEnabled", () => {
		it("should return enabled value from AppendLinkOptions", () => {
			const enabledOptions: AppendLinkOptions = {
				enabled: true,
				placement: "endOfLine",
				requireActiveFile: true,
			};
			const disabledOptions: AppendLinkOptions = {
				enabled: false,
				placement: "replaceSelection",
				requireActiveFile: true,
			};

			expect(isAppendLinkEnabled(enabledOptions)).toBe(true);
			expect(isAppendLinkEnabled(disabledOptions)).toBe(false);
		});

		it("should return boolean value directly", () => {
			expect(isAppendLinkEnabled(true)).toBe(true);
			expect(isAppendLinkEnabled(false)).toBe(false);
		});
	});

	describe("LinkPlacement type", () => {
		it("should accept all valid placement values", () => {
			const placements: LinkPlacement[] = [
				"replaceSelection",
				"afterSelection",
				"endOfLine",
				"newLine",
			];

			for (const placement of placements) {
				const options: AppendLinkOptions = {
					enabled: true,
					placement,
					requireActiveFile: true,
				};
				expect(options.placement).toBe(placement);
			}
		});
	});
});
