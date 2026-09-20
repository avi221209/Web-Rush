import React from 'react';
import { X, Download, RefreshCw, Trash2, Database, ShieldCheck } from 'lucide-react';

import { useArchive } from '../../hooks/useArchive';
import { useKeyDown } from '../../hooks/useKeyDown';
import { generateArchiveExport, triggerJSONDownload } from '../../utils/exportUtils';

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetSampleData?: () => void;
  onClearData?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onResetSampleData,
  onClearData
}) => {
  const { receipts, restoreSampleArchive, clearArchive } = useArchive();

  // Close on Escape
  useKeyDown('Escape', onClose, isOpen);

  if (!isOpen) return null;

  const handleExportJSON = () => {
    const jsonStr = generateArchiveExport(receipts);
    triggerJSONDownload(jsonStr);
  };

  const handleRestore = () => {
    restoreSampleArchive();
    onResetSampleData?.();
    onClose();
  };

  const handleClear = () => {
    clearArchive();
    onClearData?.();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#171717]/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      role="presentation"
      onClick={onClose}
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-modal-title"
        className="w-full max-w-xl bg-[#F7F4EE] border border-[#E2DDD3] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E2DDD3] bg-[#EFEAE0]/60 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#171717] text-[#F7F4EE] flex items-center justify-center">
              <Database className="w-4 h-4 text-[#F7F4EE]" />
            </div>
            <div>
              <h2 id="settings-modal-title" className="font-mono text-xs font-bold text-[#171717] uppercase tracking-wider">
                ARCHIVE SETTINGS &amp; DATA MANAGEMENT
              </h2>
              <p className="text-xs text-[#77736C]">Client-side data controls &amp; export options</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close settings"
            className="p-1.5 rounded-md text-[#77736C] hover:text-[#171717] hover:bg-[#EFEAE0]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Storage Metrics */}
          <div className="p-4 rounded-xl bg-[#EFEAE0]/50 border border-[#E2DDD3] space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between font-bold text-[#171717]">
              <span>ACTIVE DATASET METRICS</span>
              <span className="text-[#059669]">Client Memory Mode</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[#77736C] pt-1">
              <div>Total Receipts: <strong className="text-[#171717]">{receipts.length}</strong></div>
              <div>Categories: <strong className="text-[#171717]">9 Types</strong></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-[#171717] uppercase block">
              DATA ACTIONS
            </span>

            <button
              onClick={handleExportJSON}
              data-testid="export-json-button"
              className="w-full p-3.5 rounded-xl border border-[#E2DDD3] bg-[#F7F4EE] hover:bg-[#EFEAE0] transition-colors flex items-center justify-between text-xs font-mono font-bold text-[#171717] group"
            >
              <span className="flex items-center space-x-2">
                <Download className="w-4 h-4 text-[#2563EB]" />
                <span>Export Dataset (.JSON)</span>
              </span>
              <span className="text-[10px] text-[#77736C]">Download local copy</span>
            </button>

            <button
              onClick={handleRestore}
              className="w-full p-3.5 rounded-xl border border-[#E2DDD3] bg-[#F7F4EE] hover:bg-[#EFEAE0] transition-colors flex items-center justify-between text-xs font-mono font-bold text-[#171717] group"
            >
              <span className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 text-[#059669]" />
                <span>Restore Sample Archive (200+ traces)</span>
              </span>
              <span className="text-[10px] text-[#77736C]">Reset demo dataset</span>
            </button>

            <button
              onClick={handleClear}
              className="w-full p-3.5 rounded-xl border border-[#E11D48]/30 bg-[#E11D48]/5 hover:bg-[#E11D48]/10 transition-colors flex items-center justify-between text-xs font-mono font-bold text-[#E11D48]"
            >
              <span className="flex items-center space-x-2">
                <Trash2 className="w-4 h-4" />
                <span>Clear Archive (Test Empty State)</span>
              </span>
              <span className="text-[10px] opacity-70">Simulate first-time user</span>
            </button>
          </div>

          {/* Privacy Note */}
          <div className="p-3 rounded-lg bg-[#059669]/10 text-[11px] font-mono text-[#059669] flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>100% Client-Side: No telemetry or server storage used.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
