import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, CircleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

type ToastTone = 'success' | 'error';

export interface ToastPayload {
  title: string;
  description: string;
  tone: ToastTone;
}

const TOAST_EVENT = 'stakezone-toast';

export const showToast = (payload: ToastPayload) => {
  window.dispatchEvent(new CustomEvent<ToastPayload>(TOAST_EVENT, { detail: payload }));
};

export const ToastViewport = () => {
  const [toasts, setToasts] = useState<Array<ToastPayload & { id: string }>>([]);

  useEffect(() => {
    const listener = (event: Event) => {
      const customEvent = event as CustomEvent<ToastPayload>;
      const toast = { ...customEvent.detail, id: crypto.randomUUID() };
      setToasts((current) => [...current, toast]);
      window.setTimeout(() => {
        setToasts((current) => current.filter((item) => item.id !== toast.id));
      }, 3500);
    };

    window.addEventListener(TOAST_EVENT, listener);
    return () => window.removeEventListener(TOAST_EVENT, listener);
  }, []);

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className={cn(
              'pointer-events-auto rounded-2xl border p-4 shadow-2xl backdrop-blur',
              toast.tone === 'success'
                ? 'border-stake-green/30 bg-stake-card/95'
                : 'border-stake-red/30 bg-stake-card/95',
            )}
          >
            <div className="flex items-start gap-3">
              {toast.tone === 'success' ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-stake-green" />
              ) : (
                <CircleAlert className="mt-0.5 h-5 w-5 text-stake-red" />
              )}
              <div>
                <p className="font-semibold text-stake-textPrimary">{toast.title}</p>
                <p className="mt-1 text-sm text-stake-textSecondary">{toast.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
