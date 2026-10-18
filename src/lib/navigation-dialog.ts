type NavigationDialog = Pick<HTMLDialogElement, "open" | "showModal" | "close">;

/** Close the native top layer only after Motion finishes, unless it reopened meanwhile. */
export function closeNavigationDialogAfterExit(
  dialog: Pick<NavigationDialog, "open" | "close">,
  reopened: boolean,
) {
  if (reopened) return false;
  if (dialog.open) dialog.close();
  return true;
}
