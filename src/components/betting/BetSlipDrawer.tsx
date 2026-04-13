import { AnimatePresence, motion } from 'framer-motion';
import { ScrollText } from 'lucide-react';
import { useBetSlip } from '../../contexts/BetSlipContext';
import { EmptyState } from '../ui/EmptyState';
import { Badge } from '../ui/Badge';
import { BetSelectionCard } from './BetSelectionCard';
import { PlaceBetButton } from './PlaceBetButton';

export const BetSlipDrawer = ({ desktop = false }: { desktop?: boolean }) => {
  const { selections, isOpen, toggleSlip } = useBetSlip();
  const shouldShow = desktop ? true : isOpen;

  return (
    <>
      {!desktop ? (
        <button
          onClick={toggleSlip}
          className="fixed bottom-20 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-stake-green px-4 py-3 text-sm font-semibold text-black shadow-xl lg:hidden"
        >
          <ScrollText className="h-4 w-4" />
          Slip ({selections.length})
        </button>
      ) : null}
      <AnimatePresence>
        {shouldShow && (
          <motion.aside
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            className={`z-30 flex w-full max-w-sm flex-col border-l border-stake-border bg-stake-card/95 p-5 backdrop-blur ${desktop ? 'sticky top-0 h-screen' : 'fixed inset-y-0 right-0'}`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-stake-textPrimary">Bet Slip</h2>
              <Badge tone="success">{selections.length} picks</Badge>
            </div>
            <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-1">
              {selections.length ? (
                selections.map((selection) => (
                  <BetSelectionCard
                    key={`${selection.matchId}-${selection.marketName}`}
                    selection={selection}
                  />
                ))
              ) : (
                <EmptyState
                  title="Your bet slip is empty"
                  description="Select odds from any match card to get started."
                />
              )}
            </div>
            <div className="mt-5">
              <PlaceBetButton />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
