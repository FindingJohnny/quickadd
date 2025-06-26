import { Notice } from "obsidian";
import type { App, TFile } from "obsidian";
import type { QuickAddError } from "./quickAddError";
import { log } from "../logger/logManager";

// Use imported types in a private noop to avoid unused warnings
type _App = App; // eslint-disable-line @typescript-eslint/no-unused-vars
type _TFile = TFile; // eslint-disable-line @typescript-eslint/no-unused-vars

export class ErrorDisplay {
  /**
   * Presents the error to the user in Obsidian and logs diagnostic details to the console & logging system.
   *
   * @param error - The error to display.
   */
  static show(error: QuickAddError): void {
    // Immediate user-facing notice.
    new Notice(`❌ ${error.userMessage}`, 5000);

    // Offer a recovery hint if we have one.
    if (error.recoveryHint) {
      new Notice(`💡 ${error.recoveryHint}`, 8000);
    }

    // Structured console output for easier debugging.
    console.error("QuickAdd Error:", {
      code: error.code,
      message: error.message,
      details: error.details,
      stack: error.stack,
    });

    // Also pipe the original error into the plugin's logger if available.
    try {
      log.logError(error);
    } catch {
      // If logging fails for some reason we don't want to crash the error handler.
    }
  }
}