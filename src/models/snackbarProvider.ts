export interface SnackbarProvider {
  Error: (text: string) => void,
  Info: (text: string) => void,
  Success: (text: string) => void,
  Warning: (text: string) => void,
  Hide: (text: string) => void,
}
