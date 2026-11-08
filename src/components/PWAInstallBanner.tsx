import React, { useState, useEffect } from 'react';
import { Download, Share2, PlusSquare, X, Smartphone, Sparkles, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { NewAppBadgeLogo } from './BrandLogo';

const DISMISS_KEY = 'dulcito_pwa_banner_dismissed_v1';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(DISMISS_KEY);
      if (dismissed === 'true') {
        setIsDismissed(true);
      }
    } catch {
      // Storage error ignored
    }
    setHasCheckedStorage(true);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, 'true');
    } catch {
      // Ignore storage errors
    }
  };

  // If already installed as PWA or dismissed for this session, hide
  if (!hasCheckedStorage || isInstalled || isDismissed) {
    return null;
  }

  // Only show if browser supports PWA installation or it's an iOS device
  const shouldShow = isInstallable || isIOS;
  if (!shouldShow) {
    return null;
  }

  return (
    <>
      {/* Floating Bottom Notification Banner */}
      <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-5 sm:max-w-md z-40 animate-in fade-in slide-in-from-bottom-5 duration-500">
        <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#200E06] via-[#2F150B] to-[#200E06] border-2 border-[#D4AF37] ring-1 ring-[#FFF3B3]/60 rounded-2xl shadow-2xl text-white backdrop-blur-md relative overflow-hidden">
          {/* Subtle gold ribbon line at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FDE047] to-transparent" />

          <div className="flex items-start gap-3">
            {/* App Icon */}
            <div className="shrink-0 p-1 bg-[#150702] border border-[#D4AF37]/50 rounded-xl shadow-inner">
              <NewAppBadgeLogo size={42} />
            </div>

            {/* Copy */}
            <div className="flex-1 min-w-0 pr-6">
              <div className="flex items-center gap-1.5 text-[#FDE047] text-[11px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#FDE047]" />
                <span>Aplicación Móvil DULCITO</span>
              </div>
              <h4 className="font-serif font-black text-sm text-[#FFF8EE] leading-snug mt-0.5">
                ¿Deseas descargar la app?
              </h4>
              <p className="text-xs text-[#EBD8C3] leading-tight mt-1">
                Instálala en tu teléfono en 1 toque. Acceso directo, rápida y sin barras de navegador.
              </p>

              {/* Action Buttons */}
              <div className="mt-2.5 flex items-center gap-2">
                {isInstallable && (
                  <button
                    type="button"
                    onClick={install}
                    className="flex-1 py-2 px-3 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] hover:brightness-110 active:scale-95 text-[#241007] font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#241007]" />
                    <span>Instalar App Gratis</span>
                  </button>
                )}

                {isIOS && !isInstallable && (
                  <button
                    type="button"
                    onClick={() => setShowIOSModal(true)}
                    className="flex-1 py-2 px-3 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] hover:brightness-110 active:scale-95 text-[#241007] font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-[#241007]" />
                    <span>Instalar en iPhone</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleDismiss}
                  className="py-2 px-2.5 text-[11px] font-semibold text-[#D5BEA4] hover:text-white transition-colors"
                >
                  Ahora no
                </button>
              </div>
            </div>

            {/* Close Cross */}
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Cerrar aviso de instalación"
              className="absolute top-2.5 right-2.5 text-[#D5BEA4] hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Safari Installation Guide Modal */}
      {showIOSModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowIOSModal(false)}
        >
          <div
            className="bg-[#FAF5EC] rounded-2xl border-2 border-[#D4AF37] shadow-2xl max-w-sm w-full p-6 text-[#3D2214] relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowIOSModal(false)}
              className="absolute top-3 right-3 p-1 text-[#8C6044] hover:text-[#3D2214] rounded-lg"
              aria-label="Cerrar guía"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="inline-flex p-2 bg-[#F3E6D0] rounded-2xl border border-[#D5BEA4] shadow-xs mb-1">
                <NewAppBadgeLogo size={52} />
              </div>
              <h3 className="font-serif font-black text-lg text-[#3D2214]">
                Instalar DULCITO en tu iPhone
              </h3>
              <p className="text-xs text-[#78543E]">
                Sigue estos 3 sencillos pasos desde Safari:
              </p>
            </div>

            <div className="space-y-3 text-xs bg-[#FFFDF9] p-4 rounded-xl border border-[#E3D4C0]">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#B8621B] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-[#3D2214]">
                    Toca el botón Compartir
                  </p>
                  <p className="text-[#78543E] text-[11px] flex items-center gap-1">
                    Es el icono de cuadrito con flecha <Share2 className="w-3.5 h-3.5 text-[#007AFF] inline" /> en la barra inferior de Safari.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#F0E4D4]">
                <div className="w-6 h-6 rounded-full bg-[#B8621B] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-[#3D2214]">
                    Selecciona "Agregar al inicio"
                  </p>
                  <p className="text-[#78543E] text-[11px] flex items-center gap-1">
                    Desliza hacia abajo en el menú y toca <PlusSquare className="w-3.5 h-3.5 text-[#3D2214] inline" /> <strong>"Agregar a pantalla de inicio"</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#F0E4D4]">
                <div className="w-6 h-6 rounded-full bg-[#2E7D32] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-[#3D2214]">
                    Toca "Agregar" arriba a la derecha
                  </p>
                  <p className="text-[#78543E] text-[11px]">
                    ¡Listo! El icono de DULCITO aparecerá junto a tus otras apps en la pantalla principal.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 bg-[#3D2214] hover:bg-[#26150C] text-white text-xs font-bold rounded-xl transition-colors text-center"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};
