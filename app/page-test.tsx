export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="text-center text-white p-8">
        <h1 className="text-4xl font-bold mb-4">Test Page</h1>
        <p className="text-xl">If you can see this, the app is working!</p>
        <div className="mt-8 p-4 bg-green-500 rounded">
          <p>Page rendered successfully at {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  )
}
