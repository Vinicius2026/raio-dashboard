import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen bg-vda-black flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        {/* 404 */}
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-vda-white">404</h1>
          <h2 className="text-2xl font-bold text-vda-white">
            Página não encontrada
          </h2>
          <p className="text-vda-light-gray">
            Desculpe, não conseguimos encontrar a página que você está procurando.
          </p>
        </div>
        
        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-vda-white text-vda-black font-semibold rounded-xl hover:bg-gray-200 transition-colors"
        >
          Voltar para o Início
        </Link>
      </div>
    </div>
  )
}
