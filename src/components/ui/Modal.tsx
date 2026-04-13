import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ open, title, description, onClose, children }: ModalProps) => (
  <AnimatePresence>
    {open ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          className="w-full max-w-lg rounded-3xl border border-stake-border bg-stake-card p-6"
          onClick={(event) => event.stopPropagation()}
        >
          <h3 className="text-xl font-semibold text-stake-textPrimary">{title}</h3>
          {description ? <p className="mt-2 text-sm text-stake-textSecondary">{description}</p> : null}
          <div className="mt-6">{children}</div>
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
);
