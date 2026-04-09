import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Carregando...',
}
 
export default function Loading() {
  return (
    <div className="fixed inset-0 bg-vda-black flex items-center justify-center z-50">
      <div className="text-center space-y-4">
        {/* Logo pulsante */}
        <div className="text-6xl font-bold text-vda-white animate-pulse">
          VDA
        </div>
        
        {/* Spinner */}
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-vda-gray border-t-vda-white rounded-full animate-spin" />
        </div>
      </div>
    </div>
  )
}
