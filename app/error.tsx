'use client'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-vda-black flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        {/* Logo */}
        <div className="text-5xl font-bold text-vda-white mb-4">
          VDA
        </div>
        
        {/* Error Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-vda-white">
            Algo deu errado!
          </h2>
          <p className="text-vda-light-gray">
            Desculpe, encontramos um problema ao processar sua solicitação.
          </p>
        </div>
        
        {/* Retry Button */}
        <button
          onClick={reset}
          className="px-6 py-3 bg-vda-white text-vda-black font-semibold rounded-xl hover:bg-gray-200 transition-colors"
        >
          Tentar Novamente
        </button>
        
        {/* Back to Home */}
        <div>
          <a
            href="/"
            className="text-sm text-vda-light-gray hover:text-vda-white transition-colors"
          >
            Voltar para o início
          </a>
        </div>
      </div>
    </div>
  )
}
