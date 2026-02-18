export interface IElectronAPI {
    ipcRenderer: {
        sendMessage(channel: string, args: unknown[]): void;
        on(channel: string, func: (...args: unknown[]) => void): () => void;
        once(channel: string, func: (...args: unknown[]) => void): void;
        invoke(channel: string, ...args: unknown[]): Promise<any>;
    };
}

declare global {
    interface Window {
        electron: IElectronAPI;
    }
}
