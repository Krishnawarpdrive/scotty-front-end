
import { useCallback } from 'react';
import { 
  useToast,
  createUploadToast,
  createDownloadToast,
  createSaveToast,
  createDeleteToast,
  createUserActionToast,
  createSystemToast
} from '../../enhanced-toast';

export const useSpecializedToasts = () => {
  const { showToast } = useToast();

  // Specialized action toasts
  const upload = useCallback((filename: string, progress?: number) => {
    return showToast(createUploadToast(filename, { data: { progress } }));
  }, [showToast]);

  const download = useCallback((filename: string) => {
    return showToast(createDownloadToast(filename));
  }, [showToast]);

  const save = useCallback((itemName: string, onUndo?: () => void) => {
    const toastOptions = createSaveToast(itemName);
    if (onUndo) {
      toastOptions.actions = [{
        label: 'Undo',
        onClick: onUndo,
        variant: 'outline'
      }];
    }
    return showToast(toastOptions);
  }, [showToast]);

  const remove = useCallback((itemName: string, onUndo?: () => void) => {
    const toastOptions = createDeleteToast(itemName);
    if (onUndo) {
      toastOptions.actions = [{
        label: 'Undo',
        onClick: onUndo,
        variant: 'outline'
      }];
    }
    return showToast(toastOptions);
  }, [showToast]);

  const userAction = useCallback((action: string, userName: string) => {
    return showToast(createUserActionToast(action, userName));
  }, [showToast]);

  const system = useCallback((message: string, isError = false) => {
    return showToast(createSystemToast(message, { type: isError ? 'error' : 'info' }));
  }, [showToast]);

  return {
    upload,
    download,
    save,
    remove,
    userAction,
    system
  };
};
