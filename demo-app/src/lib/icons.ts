import { addCollection } from "@iconify/react";
import solar from "@/data/solar-icons.json";

/**
 * Register the handful of Solar icons this app uses, offline.
 *
 * Bookmi loads icons from the Iconify API at runtime. A codelab runs on
 * conference wifi, so we ship the icon data instead — same glyphs, no network.
 */
export function registerIcons() {
  addCollection(solar as Parameters<typeof addCollection>[0]);
}
