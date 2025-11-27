
// FIX: Moved the AIStudio interface into the declare global block to ensure it's in the global scope,
// preventing type conflicts when augmenting the global Window interface from within a module.
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}

// FIX: Add an empty export to ensure this file is treated as a module, resolving the global scope augmentation error.
export {};