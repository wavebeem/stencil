import { getCompilerSystem } from '../state/stencil-cli-config';

interface TerminalInfo {
  /**
   * Whether this is in CI or not.
   */
  readonly ci: boolean;
  /**
   * Whether the terminal is an interactive TTY or not.
   */
  readonly tty: boolean;
}

export declare const TERMINAL_INFO: TerminalInfo;

export const tryFn = async <T extends (...args: any[]) => Promise<R>, R>(fn: T, ...args: any[]): Promise<R | null> => {
  try {
    return await fn(...args);
  } catch {
    // ignore
  }

  return null;
};

export const isInteractive = (object?: TerminalInfo): boolean => {
  const terminalInfo =
    object ||
    Object.freeze({
      tty: process.stdout.isTTY ? true : false,
      ci:
        ['CI', 'BUILD_ID', 'BUILD_NUMBER', 'BITBUCKET_COMMIT', 'CODEBUILD_BUILD_ARN'].filter(v => !!process.env[v])
          .length > 0 || process.argv.includes('--ci'),
    });

  return terminalInfo.tty && !terminalInfo.ci;
};
// Plucked from https://github.com/ionic-team/capacitor/blob/b893a57aaaf3a16e13db9c33037a12f1a5ac92e0/cli/src/util/uuid.ts
export function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c == 'x' ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
}

export async function readJson(path: string) {
  const file = await getCompilerSystem().readFile(path);
  return !!file && JSON.parse(file);
}
